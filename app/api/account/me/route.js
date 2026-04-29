import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';

export const dynamic = 'force-dynamic';

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

function clearAuthCookies(cookieStore) {
  cookieStore.delete('shopify_customer_token');
  cookieStore.delete('shopify_customer_refresh_token');
  cookieStore.delete('shopify_token_expires_at');
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;

  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  if (!token.startsWith('shcat_')) {
    console.error('[me] Cookie inválido — token sem prefixo shcat_:', token.substring(0, 15));
    clearAuthCookies(cookieStore);
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await customerFetch(QUERY, {}, token);
    return Response.json(data.customer);
  } catch (err) {
    if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
      clearAuthCookies(cookieStore);
    }
    return Response.json({ error: err.message }, { status: 401 });
  }
}
