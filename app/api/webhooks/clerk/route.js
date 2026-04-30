import { Webhook } from 'svix';
import { createCustomer, findCustomerByEmail } from '@/lib/shopifyAdmin';

export async function POST(request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return new Response('Webhook secret not configured', { status: 500 });

  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const payload = await request.text();
  const wh = new Webhook(secret);

  let event;
  try {
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'user.created') {
    const { email_addresses, first_name, last_name } = event.data;
    const email = email_addresses?.[0]?.email_address;
    if (email) {
      try {
        const existing = await findCustomerByEmail(email);
        if (!existing) {
          await createCustomer({
            email,
            firstName: first_name ?? '',
            lastName: last_name ?? '',
          });
        }
      } catch (err) {
        console.error('[clerk-webhook] Failed to create Shopify customer:', err);
      }
    }
  }

  return Response.json({ ok: true });
}
