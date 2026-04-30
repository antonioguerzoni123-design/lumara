import { currentUser } from '@clerk/nextjs/server';
import { findCustomerByEmail, deleteAddress } from '@/lib/shopifyAdmin';

export async function DELETE(request, { params }) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return Response.json({ error: 'No email on account' }, { status: 400 });

  const shopifyCustomer = await findCustomerByEmail(email);
  if (!shopifyCustomer) return Response.json({ error: 'Customer not found' }, { status: 404 });

  await deleteAddress(shopifyCustomer.id, id);
  return Response.json({ ok: true });
}
