import { currentUser } from '@clerk/nextjs/server';
import { findCustomerByEmail, setDefaultAddress } from '@/lib/shopifyAdmin';

export async function POST(request) {
  const user = await currentUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return Response.json({ error: 'No email on account' }, { status: 400 });

  const { id: addressId } = await request.json();
  const shopifyCustomer = await findCustomerByEmail(email);
  if (!shopifyCustomer) return Response.json({ error: 'Customer not found' }, { status: 404 });

  await setDefaultAddress(shopifyCustomer.id, addressId);
  return Response.json({ ok: true });
}
