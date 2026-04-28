const API_URL = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL ?? 'https://shopify.com/103627391313/account';

export async function customerFetch(query, variables = {}, accessToken) {
  const endpoint = `${API_URL}/customer/api/2024-10/graphql`;
  console.log('[customerFetch] endpoint:', endpoint, 'token presente:', !!accessToken);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[customerFetch] Erro HTTP:', res.status, body);
    throw new Error(`Customer API error: ${res.status}`);
  }

  const { data, errors } = await res.json();
  if (errors?.length) {
    console.error('[customerFetch] GraphQL errors:', errors);
    throw new Error(errors[0].message);
  }
  return data;
}
