import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';

const DELETE_MUTATION = `
  mutation DeleteAddress($addressId: ID!) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors { field message }
    }
  }
`;

export async function DELETE(request, { params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const gid = `gid://shopify/MailingAddress/${id}`;

  try {
    const data = await customerFetch(DELETE_MUTATION, { addressId: gid }, token);
    const { userErrors } = data.customerAddressDelete;
    if (userErrors?.length) return Response.json({ error: userErrors[0].message }, { status: 400 });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
