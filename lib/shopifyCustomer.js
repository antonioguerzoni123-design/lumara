const API_URL = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL;

export async function customerFetch(query, variables = {}, accessToken) {
  const res = await fetch(`${API_URL}/customer/api/2024-10/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Customer API error: ${res.status}`);
  }

  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}
