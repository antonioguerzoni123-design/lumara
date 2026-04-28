import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';

const MUTATION = `
  mutation customerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        firstName
        lastName
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function PATCH(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;

  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { firstName, lastName } = await request.json();

  try {
    const data = await customerFetch(MUTATION, { input: { firstName, lastName } }, token);
    const errors = data?.customerUpdate?.userErrors;
    if (errors?.length) {
      return Response.json({ error: errors[0].message }, { status: 400 });
    }
    return Response.json(data.customerUpdate.customer);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
