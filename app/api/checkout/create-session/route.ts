import { auth, currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { validateCartItems } from '@/lib/shopifyCheckout';

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        shopifyVariantId: z.string().min(1),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? '';
  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Body inválido.' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { items } = parsed.data;

  let validatedLines: Awaited<ReturnType<typeof validateCartItems>>;
  try {
    validatedLines = await validateCartItems(items);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao validar carrinho.';
    return Response.json({ error: message }, { status: 422 });
  }

  const subtotal = validatedLines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const shippingAmountEur = subtotal >= 40 ? 0 : 3.99;
  const shippingAmountCents = Math.round(shippingAmountEur * 100);
  const shippingLabel = shippingAmountCents === 0 ? 'Envio Grátis' : 'Envio Standard';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.create>>;
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: 'eur',
      line_items: validatedLines.map((l) => ({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(l.price * 100),
          product_data: {
            name:
              l.variantTitle && l.variantTitle !== 'Default Title'
                ? `${l.productTitle} — ${l.variantTitle}`
                : l.productTitle,
            images: l.imageUrl ? [l.imageUrl] : [],
          },
        },
        quantity: l.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ['PT', 'ES', 'FR', 'DE', 'IT', 'NL', 'BE', 'GB', 'AT', 'CH'],
      },
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmountCents, currency: 'eur' },
            display_name: shippingLabel,
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      automatic_tax: { enabled: true },
      customer_email: email || undefined,
      metadata: {
        clerkUserId: userId,
        source: 'external_nextjs_store',
        shopifyVariantIds: JSON.stringify(
          validatedLines.map((l) => ({ id: l.shopifyVariantId, qty: l.quantity }))
        ),
      },
      client_reference_id: userId,
      success_url: `${appUrl}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancelado`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao criar sessão de pagamento.';
    console.error('[checkout/create-session] Stripe error:', message);
    return Response.json({ error: message }, { status: 500 });
  }

  await prisma.checkoutSession.create({
    data: {
      clerkUserId: userId,
      stripeSessionId: session.id,
      stripeCustomerId: typeof session.customer === 'string' ? session.customer : (session.customer?.id ?? null),
      status: 'PENDING',
      lineItemsSnapshot: validatedLines,
      shippingAmount: shippingAmountCents,
      currency: 'EUR',
    },
  });

  console.info(`[checkout/create-session] session=${session.id} user=${userId} email=${email} firstName=${firstName} lastName=${lastName}`);

  return Response.json({ url: session.url });
}
