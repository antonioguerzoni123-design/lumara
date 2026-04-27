import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';

const SET_DEFAULT_MUTATION = `
  mutation SetDefault($addressId: ID!) {
    customerDefaultAddressUpdate(addressId: $addressId) {
      customer { defaultAddress { id } }
      userErrors { field message }
    }
  }
`;

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_access_token')?.value;
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await request.json();
  const gid = id.startsWith('gid://') ? id : `gid://shopify/MailingAddress/${id}`;

  try {
    const data = await customerFetch(SET_DEFAULT_MUTATION, { addressId: gid }, token);
    const { userErrors } = data.customerDefaultAddressUpdate;
    if (userErrors?.length) return Response.json({ error: userErrors[0].message }, { status: 400 });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
