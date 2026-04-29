import { cookies } from 'next/headers';
import { customerFetch } from './shopifyCustomer';

export async function getAuthenticatedCustomerId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;
  const expiresAt = cookieStore.get('shopify_token_expires_at')?.value;
  if (!token || !expiresAt || Date.now() >= Number(expiresAt)) return null;
  try {
    const data = await customerFetch('{ customer { id } }', {}, token);
    const gid = data?.customer?.id ?? '';
    return gid.split('/').pop() || null;
  } catch {
    return null;
  }
}
