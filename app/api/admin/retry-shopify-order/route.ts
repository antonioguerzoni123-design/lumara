import { z } from 'zod';
import { retryCreateShopifyOrder } from '@/lib/shopifyCheckout';

const bodySchema = z.object({
  checkoutSessionId: z.string().min(1),
});

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const secret = process.env.ADMIN_RETRY_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

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

  try {
    const order = await retryCreateShopifyOrder(parsed.data.checkoutSessionId);
    return Response.json({ success: true, shopifyOrderId: order.id, shopifyOrderName: order.name });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao criar pedido.';
    console.error('[admin/retry-shopify-order]', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
