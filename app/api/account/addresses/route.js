import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';

const LIST_QUERY = `
  query GetAddresses {
    customer {
      defaultAddress { id }
      addresses(first: 20) {
        edges {
          node {
            id firstName lastName address1 address2 city zip zoneCode countryCode
          }
        }
      }
    }
  }
`;

const CREATE_MUTATION = `
  mutation CreateAddress($address: CustomerAddressInput!) {
    customerAddressCreate(address: $address) {
      customerAddress { id }
      userErrors { field message }
    }
  }
`;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_access_token')?.value;
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await customerFetch(LIST_QUERY, {}, token);
    const addresses = data.customer.addresses.edges.map((e) => e.node);
    const defaultAddressId = data.customer.defaultAddress?.id ?? null;
    return Response.json({ addresses, defaultAddressId });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_access_token')?.value;
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();

  try {
    const data = await customerFetch(CREATE_MUTATION, { address: body }, token);
    const { userErrors } = data.customerAddressCreate;
    if (userErrors?.length) return Response.json({ error: userErrors[0].message }, { status: 400 });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
