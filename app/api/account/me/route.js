import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';

const QUERY = `
  query Me {
    customer {
      id
      firstName
      lastName
      emailAddress { emailAddress }
      phoneNumber { phoneNumber }
      defaultAddress {
        address1 address2 city zoneCode zip countryCode
      }
    }
  }
`;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;

  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await customerFetch(QUERY, {}, token);
    return Response.json(data.customer);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
