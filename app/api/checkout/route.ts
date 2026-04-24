import { createCheckout } from '@/lib/shopify';

export async function POST(request: Request) {
  try {
    const { lines } = await request.json();

    if (!lines || !lines.length) {
      return Response.json({ error: 'No items' }, { status: 400 });
    }

    const url = await createCheckout(lines);
    return Response.json({ url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
