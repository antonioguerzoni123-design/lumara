const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = '2024-01';
const BASE = `https://${DOMAIN}/admin/api/${API_VERSION}`;

async function adminFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
      ...options.headers,
    },
    cache: 'no-store',
  });

  if (res.status === 204) return null;

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin API error: ${res.status} ${text}`);
  }

  return res.json();
}

export async function findCustomerByEmail(email) {
  const data = await adminFetch(`/customers/search.json?query=email:${encodeURIComponent(email)}&limit=1`);
  return data?.customers?.[0] ?? null;
}

export async function createCustomer({ email, firstName, lastName }) {
  const data = await adminFetch('/customers.json', {
    method: 'POST',
    body: JSON.stringify({
      customer: { email, first_name: firstName ?? '', last_name: lastName ?? '', verified_email: true },
    }),
  });
  return data?.customer;
}

export async function getCustomerOrders(customerId) {
  const data = await adminFetch(`/customers/${customerId}/orders.json?status=any&limit=20`);
  return data?.orders ?? [];
}

export async function getOrder(orderId) {
  const data = await adminFetch(`/orders/${orderId}.json`);
  return data?.order ?? null;
}

export async function getCustomerAddresses(customerId) {
  const data = await adminFetch(`/customers/${customerId}/addresses.json?limit=20`);
  return data?.addresses ?? [];
}

export async function createAddress(customerId, address) {
  const data = await adminFetch(`/customers/${customerId}/addresses.json`, {
    method: 'POST',
    body: JSON.stringify({ address }),
  });
  return data?.customer_address;
}

export async function deleteAddress(customerId, addressId) {
  await adminFetch(`/customers/${customerId}/addresses/${addressId}.json`, { method: 'DELETE' });
}

export async function setDefaultAddress(customerId, addressId) {
  await adminFetch(`/customers/${customerId}/addresses/${addressId}/default.json`, { method: 'PUT' });
}

export async function updateCustomer(customerId, updates) {
  const data = await adminFetch(`/customers/${customerId}.json`, {
    method: 'PUT',
    body: JSON.stringify({ customer: updates }),
  });
  return data?.customer;
}

export function mapAddress(addr) {
  return {
    id: String(addr.id),
    firstName: addr.first_name ?? '',
    lastName: addr.last_name ?? '',
    address1: addr.address1 ?? '',
    address2: addr.address2 ?? '',
    city: addr.city ?? '',
    zip: addr.zip ?? '',
    zoneCode: addr.province_code ?? '',
    countryCode: addr.country_code ?? '',
  };
}

export function mapOrder(order) {
  return {
    id: `gid://shopify/Order/${order.id}`,
    name: order.name,
    processedAt: order.created_at,
    fulfillmentStatus: order.fulfillment_status?.toUpperCase() ?? 'UNFULFILLED',
    totalPrice: { amount: order.total_price, currencyCode: order.currency },
  };
}

export async function getOrCreateShopifyCustomer(email, firstName = '', lastName = '') {
  const existing = await findCustomerByEmail(email);
  if (existing) return existing;
  return createCustomer({ email, firstName, lastName });
}

export function mapOrderDetail(order) {
  return {
    id: `gid://shopify/Order/${order.id}`,
    name: order.name,
    processedAt: order.created_at,
    fulfillmentStatus: order.fulfillment_status?.toUpperCase() ?? 'UNFULFILLED',
    totalPrice: { amount: order.total_price, currencyCode: order.currency },
    subtotalPrice: { amount: order.subtotal_price ?? '0', currencyCode: order.currency },
    totalShippingPrice: {
      amount: order.total_shipping_price_set?.shop_money?.amount ?? '0',
      currencyCode: order.currency,
    },
    totalTax: { amount: order.total_tax ?? '0', currencyCode: order.currency },
    shippingAddress: order.shipping_address
      ? {
          firstName: order.shipping_address.first_name ?? '',
          lastName: order.shipping_address.last_name ?? '',
          address1: order.shipping_address.address1 ?? '',
          address2: order.shipping_address.address2 ?? '',
          city: order.shipping_address.city ?? '',
          zip: order.shipping_address.zip ?? '',
          zoneCode: order.shipping_address.province_code ?? '',
          countryCode: order.shipping_address.country_code ?? '',
        }
      : null,
    lineItems: {
      edges: (order.line_items ?? []).map((item) => ({
        node: {
          title: item.title,
          quantity: item.quantity,
          price: { amount: item.price, currencyCode: order.currency },
          variantTitle: item.variant_title,
          image: null,
        },
      })),
    },
    fulfillments: (order.fulfillments ?? []).map((f) => ({
      status: f.status?.toUpperCase(),
      trackingInfo: (f.tracking_numbers ?? []).map((num, i) => ({
        number: num,
        url: f.tracking_urls?.[i] ?? null,
      })),
    })),
  };
}
