import { currentUser } from '@clerk/nextjs/server';
import { findCustomerByEmail, getCustomerOrders, mapOrder } from '@/lib/shopifyAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await currentUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return Response.json([]);

  const shopifyCustomer = await findCustomerByEmail(email);
  if (!shopifyCustomer) return Response.json([]);

  const orders = await getCustomerOrders(shopifyCustomer.id);
  return Response.json(orders.map(mapOrder));
}
