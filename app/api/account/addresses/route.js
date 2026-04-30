import { currentUser } from '@clerk/nextjs/server';
import {
  getOrCreateShopifyCustomer,
  getCustomerAddresses,
  createAddress,
  mapAddress,
} from '@/lib/shopifyAdmin';

export async function GET() {
  const user = await currentUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return Response.json({ addresses: [], defaultAddressId: null });

  const shopifyCustomer = await getOrCreateShopifyCustomer(
    email,
    user.firstName ?? '',
    user.lastName ?? ''
  );
  if (!shopifyCustomer) return Response.json({ addresses: [], defaultAddressId: null });

  const rawAddresses = await getCustomerAddresses(shopifyCustomer.id);
  const addresses = rawAddresses.map(mapAddress);
  const defaultAddressId = shopifyCustomer.default_address
    ? String(shopifyCustomer.default_address.id)
    : (addresses[0]?.id ?? null);

  return Response.json({ addresses, defaultAddressId });
}

export async function POST(request) {
  const user = await currentUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return Response.json({ error: 'No email on account' }, { status: 400 });

  const body = await request.json();
  const shopifyCustomer = await getOrCreateShopifyCustomer(
    email,
    user.firstName ?? '',
    user.lastName ?? ''
  );
  if (!shopifyCustomer) return Response.json({ error: 'Failed to resolve customer' }, { status: 500 });

  const address = await createAddress(shopifyCustomer.id, body);
  return Response.json({ ok: true, address: mapAddress(address) });
}
