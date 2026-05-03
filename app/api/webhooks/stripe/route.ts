import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { createShopifyOrder } from '@/lib/shopifyCheckout';
import type { ShopifyAddress, ShopifyOrderInput, ValidatedLine } from '@/lib/types/checkout';

export const dynamic = 'force-dynamic';

type CollectedShippingDetails = NonNullable<
  NonNullable<Stripe.Checkout.Session['collected_information']>['shipping_details']
>;

type CustomerDetails = NonNullable<Stripe.Checkout.Session['customer_details']>;

function extractShippingAddress(
  shipping: CollectedShippingDetails | null | undefined,
  customer: CustomerDetails | null | undefined
): ShopifyAddress {
  const name = shipping?.name ?? customer?.name ?? '';
  const parts = name.trim().split(' ');
  const addr = shipping?.address;
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' ') || '',
    address1: addr?.line1 ?? '',
    address2: addr?.line2 ?? undefined,
    city: addr?.city ?? '',
    zip: addr?.postal_code ?? '',
    provinceCode: addr?.state ?? undefined,
    countryCode: addr?.country ?? '',
    phone: customer?.phone ?? undefined,
  };
}

type TaxBreakdown = {
  amount: number;
  tax_rate_details?: { display_name?: string; percentage_decimal?: number };
};

export async function POST(request: Request) {
  const raw = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return Response.json({ error: 'Missing stripe-signature.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed.';
    console.error('[webhook/stripe] signature error:', message);
    return Response.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const alreadyProcessed = await prisma.webhookEvent.findUnique({
        where: { stripeEventId: event.id },
      });
      if (alreadyProcessed) {
        return Response.json({ received: true });
      }

      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== 'paid') {
        await prisma.webhookEvent.create({ data: { stripeEventId: event.id, type: event.type } });
        return Response.json({ received: true });
      }

      const expanded = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['payment_intent', 'customer', 'total_details.breakdown'],
      });

      const customerDetails = expanded.customer_details;
      const shippingDetails = expanded.collected_information?.shipping_details;

      const paymentIntentId =
        typeof expanded.payment_intent === 'string'
          ? expanded.payment_intent
          : (expanded.payment_intent as Stripe.PaymentIntent | null)?.id ?? '';

      const rawTaxes =
        ((expanded.total_details as { breakdown?: { taxes?: TaxBreakdown[] } } | null)
          ?.breakdown?.taxes) ?? [];

      const taxLines = rawTaxes.map((t) => ({
        title: t.tax_rate_details?.display_name ?? 'IVA',
        price: t.amount / 100,
        rate: (t.tax_rate_details?.percentage_decimal ?? 0) / 100,
      }));

      const shippingAmountEur = (expanded.total_details?.amount_shipping ?? 0) / 100;
      const amountTotal = (expanded.amount_total ?? 0) / 100;

      const dbSession = await prisma.checkoutSession.findUnique({
        where: { stripeSessionId: session.id },
      });

      if (!dbSession) {
        console.error(`[webhook/stripe] CheckoutSession not found for stripeSessionId=${session.id}`);
        await prisma.webhookEvent.create({ data: { stripeEventId: event.id, type: event.type } });
        return Response.json({ received: true });
      }

      if (dbSession.shopifyOrderId) {
        await prisma.webhookEvent.create({ data: { stripeEventId: event.id, type: event.type } });
        return Response.json({ received: true });
      }

      const shippingAddr = extractShippingAddress(shippingDetails, customerDetails);
      const billingAddr: ShopifyAddress = {
        firstName: customerDetails?.name?.split(' ')[0] ?? shippingAddr.firstName,
        lastName: customerDetails?.name?.split(' ').slice(1).join(' ') ?? shippingAddr.lastName,
        address1: customerDetails?.address?.line1 ?? shippingAddr.address1,
        address2: customerDetails?.address?.line2 ?? undefined,
        city: customerDetails?.address?.city ?? shippingAddr.city,
        zip: customerDetails?.address?.postal_code ?? shippingAddr.zip,
        provinceCode: customerDetails?.address?.state ?? undefined,
        countryCode: customerDetails?.address?.country ?? shippingAddr.countryCode,
        phone: customerDetails?.phone ?? undefined,
      };

      const lines = dbSession.lineItemsSnapshot as ValidatedLine[];

      const input: ShopifyOrderInput = {
        email: customerDetails?.email ?? '',
        firstName: shippingAddr.firstName,
        lastName: shippingAddr.lastName,
        shippingAddress: shippingAddr,
        billingAddress: billingAddr,
        lines,
        shippingTitle: shippingAmountEur === 0 ? 'Envio Grátis' : 'Envio Standard',
        shippingPrice: shippingAmountEur,
        taxLines,
        taxesIncluded: false,
        currency: 'EUR',
        stripeSessionId: session.id,
        stripePaymentIntentId: paymentIntentId,
        clerkUserId: dbSession.clerkUserId,
        internalCheckoutId: dbSession.id,
        amountTotal,
      };

      try {
        const order = await createShopifyOrder(input);

        await prisma.checkoutSession.update({
          where: { id: dbSession.id },
          data: {
            status: 'PAID',
            shopifyOrderId: order.id,
            shopifyOrderName: order.name,
            stripePaymentIntentId: paymentIntentId,
            taxAmount: expanded.total_details?.amount_tax ?? null,
            discountAmount: expanded.total_details?.amount_discount ?? null,
            amountTotal: expanded.amount_total ?? null,
          },
        });

        console.info(`[webhook/stripe] Order created: ${order.name} for session=${session.id}`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown shopify error';
        console.error(`[webhook/stripe] Shopify order failed for session=${session.id}:`, message);

        await prisma.checkoutSession.update({
          where: { id: dbSession.id },
          data: {
            status: 'PAID_BUT_SHOPIFY_FAILED',
            stripePaymentIntentId: paymentIntentId,
            taxAmount: expanded.total_details?.amount_tax ?? null,
            discountAmount: expanded.total_details?.amount_discount ?? null,
            amountTotal: expanded.amount_total ?? null,
            shopifyError: message,
          },
        });
      }

      await prisma.webhookEvent.create({ data: { stripeEventId: event.id, type: event.type } });
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      await prisma.checkoutSession.updateMany({
        where: { stripeSessionId: session.id, status: 'PENDING' },
        data: { status: 'EXPIRED' },
      });
      await prisma.webhookEvent.upsert({
        where: { stripeEventId: event.id },
        create: { stripeEventId: event.id, type: event.type },
        update: {},
      });
      break;
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.warn(`[webhook/stripe] payment_intent.payment_failed: ${pi.id}`);
      await prisma.webhookEvent.upsert({
        where: { stripeEventId: event.id },
        create: { stripeEventId: event.id, type: event.type },
        update: {},
      });
      break;
    }

    default:
      break;
  }

  return Response.json({ received: true });
}
