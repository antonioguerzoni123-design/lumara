import type { CartLineInput, ValidatedLine, ShopifyAddress, ShopifyOrderInput } from './types/checkout';
import { prisma } from './prisma';
import { stripe } from './stripe';

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;
const STOREFRONT_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? '2026-04';
const ADMIN_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION ?? '2026-04';

async function storefrontFetch(query: string, variables: Record<string, unknown>) {
  const res = await fetch(
    `https://${DOMAIN}/api/${STOREFRONT_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error(`Storefront API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

async function adminGraphQL(query: string, variables: Record<string, unknown>) {
  const res = await fetch(
    `https://${DOMAIN}/admin/api/${ADMIN_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin GraphQL error: ${res.status} ${text}`);
  }
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

// quantityAvailable and quantityRule require the `unauthenticated_read_product_inventory`
// scope on the Storefront token. Enable it in Shopify Admin → Settings → Apps → [storefront app]
// → Storefront API access scopes → "Read inventory" to restore those checks.
const GET_VARIANT_QUERY = `
  query GetVariant($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        id
        title
        availableForSale
        currentlyNotInStock
        priceV2 { amount currencyCode }
        image { url }
        product { title }
      }
    }
  }
`;

export async function validateCartItems(lines: CartLineInput[]): Promise<ValidatedLine[]> {
  const validated: ValidatedLine[] = [];

  for (const line of lines) {
    const data = await storefrontFetch(GET_VARIANT_QUERY, { id: line.shopifyVariantId });
    const variant = data?.node;

    if (!variant) {
      throw Object.assign(new Error(`Produto não encontrado: ${line.shopifyVariantId}`), { code: 'NOT_FOUND' });
    }

    if (!variant.availableForSale) {
      const code = variant.currentlyNotInStock ? 'OUT_OF_STOCK' : 'UNAVAILABLE';
      throw Object.assign(
        new Error(`"${variant.product.title}" não está disponível para venda.`),
        { code }
      );
    }

    validated.push({
      shopifyVariantId: variant.id,
      productTitle: variant.product.title,
      variantTitle: variant.title,
      price: parseFloat(variant.priceV2.amount),
      quantity: line.quantity,
      imageUrl: variant.image?.url,
    });
  }

  return validated;
}

function buildMailingAddress(addr: ShopifyAddress) {
  return {
    firstName: addr.firstName,
    lastName: addr.lastName,
    address1: addr.address1,
    address2: addr.address2 ?? '',
    city: addr.city,
    zip: addr.zip,
    provinceCode: addr.provinceCode ?? '',
    countryCode: addr.countryCode,
    phone: addr.phone ?? '',
  };
}

const ORDER_CREATE_MUTATION = `
  mutation OrderCreate($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
    orderCreate(order: $order, options: $options) {
      order {
        id
        name
        legacyResourceId
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function createShopifyOrder(input: ShopifyOrderInput): Promise<{ id: string; name: string }> {
  const variables = {
    order: {
      email: input.email,
      phone: input.shippingAddress.phone ?? '',
      currency: input.currency,
      financialStatus: 'PAID',
      processedAt: new Date().toISOString(),
      lineItems: input.lines.map((l) => ({
        variantId: l.shopifyVariantId,
        quantity: l.quantity,
        priceSet: {
          shopMoney: { amount: String(l.price.toFixed(2)), currencyCode: input.currency },
        },
        taxable: true,
        requiresShipping: true,
      })),
      shippingAddress: buildMailingAddress(input.shippingAddress),
      billingAddress: buildMailingAddress(input.billingAddress),
      shippingLines: [
        {
          title: input.shippingTitle,
          priceSet: {
            shopMoney: { amount: String(input.shippingPrice.toFixed(2)), currencyCode: input.currency },
          },
          code: 'STRIPE_CHECKOUT',
          source: 'external_nextjs_store',
        },
      ],
      taxLines: input.taxLines.map((t) => ({
        title: t.title,
        rate: String(t.rate),
        priceSet: {
          shopMoney: { amount: String(t.price.toFixed(2)), currencyCode: input.currency },
        },
      })),
      taxesIncluded: input.taxesIncluded,
      transactions: [
        {
          kind: 'SALE',
          status: 'SUCCESS',
          gateway: 'stripe',
          amountSet: {
            shopMoney: { amount: String(input.amountTotal.toFixed(2)), currencyCode: input.currency },
          },
          receiptJson: {
            stripe_session_id: input.stripeSessionId,
            stripe_payment_intent_id: input.stripePaymentIntentId,
          },
        },
      ],
      customAttributes: [
        { key: 'stripe_checkout_session_id', value: input.stripeSessionId },
        { key: 'stripe_payment_intent_id', value: input.stripePaymentIntentId },
        { key: 'clerk_user_id', value: input.clerkUserId },
        { key: 'internal_checkout_id', value: input.internalCheckoutId },
        { key: 'source', value: 'external_nextjs_store' },
      ],
      note: 'Pagamento processado via Stripe Checkout fora do checkout nativo Shopify.',
      tags: ['External Store', 'Stripe Checkout', 'DSers', 'Clerk'],
      sourceIdentifier: input.stripeSessionId,
    },
    options: {
      inventoryBehaviour: 'DECREMENT_OBEYING_POLICY',
      sendReceipt: false,
      sendFulfillmentReceipt: false,
    },
  };

  const data = await adminGraphQL(ORDER_CREATE_MUTATION, variables);
  const { order, userErrors } = data.orderCreate;

  if (userErrors?.length) {
    throw new Error(`Shopify orderCreate userError: ${userErrors[0].message}`);
  }

  return { id: order.id, name: order.name };
}

export async function retryCreateShopifyOrder(checkoutSessionId: string): Promise<{ id: string; name: string }> {
  const session = await prisma.checkoutSession.findUniqueOrThrow({
    where: { id: checkoutSessionId },
  });

  if (session.status !== 'PAID_BUT_SHOPIFY_FAILED') {
    throw new Error(`Cannot retry: status is ${session.status}`);
  }
  if (session.shopifyOrderId) {
    throw new Error('Shopify order already exists');
  }

  const stripeSession = await stripe.checkout.sessions.retrieve(session.stripeSessionId, {
    expand: ['payment_intent', 'customer', 'total_details.breakdown'],
  });

  const paymentIntentId =
    typeof stripeSession.payment_intent === 'string'
      ? stripeSession.payment_intent
      : stripeSession.payment_intent?.id ?? '';

  const customerDetails = stripeSession.customer_details;
  const shippingDetails = stripeSession.collected_information?.shipping_details;

  const rawTaxLines =
    (stripeSession.total_details as { breakdown?: { taxes?: { tax_rate_details?: { display_name?: string; percentage_decimal?: number }; amount: number }[] } } | null)
      ?.breakdown?.taxes ?? [];

  const taxLines = rawTaxLines.map((t) => ({
    title: t.tax_rate_details?.display_name ?? 'IVA',
    price: t.amount / 100,
    rate: (t.tax_rate_details?.percentage_decimal ?? 0) / 100,
  }));

  const shippingName = shippingDetails?.name ?? customerDetails?.name ?? '';
  const shippingNameParts = shippingName.trim().split(' ');
  const shippingAddr: ShopifyAddress = {
    firstName: shippingNameParts[0] ?? '',
    lastName: shippingNameParts.slice(1).join(' ') || '',
    address1: shippingDetails?.address?.line1 ?? '',
    address2: shippingDetails?.address?.line2 ?? undefined,
    city: shippingDetails?.address?.city ?? '',
    zip: shippingDetails?.address?.postal_code ?? '',
    provinceCode: shippingDetails?.address?.state ?? undefined,
    countryCode: shippingDetails?.address?.country ?? '',
    phone: customerDetails?.phone ?? undefined,
  };

  const billingAddr: ShopifyAddress = {
    firstName: customerDetails?.name?.split(' ')[0] ?? '',
    lastName: customerDetails?.name?.split(' ').slice(1).join(' ') ?? '',
    address1: customerDetails?.address?.line1 ?? '',
    address2: customerDetails?.address?.line2 ?? undefined,
    city: customerDetails?.address?.city ?? '',
    zip: customerDetails?.address?.postal_code ?? '',
    provinceCode: customerDetails?.address?.state ?? undefined,
    countryCode: customerDetails?.address?.country ?? '',
    phone: customerDetails?.phone ?? undefined,
  };

  const lines = session.lineItemsSnapshot as ValidatedLine[];
  const shippingPrice = (stripeSession.total_details?.amount_shipping ?? session.shippingAmount) / 100;
  const amountTotal = (stripeSession.amount_total ?? session.amountTotal ?? 0) / 100;

  const input: ShopifyOrderInput = {
    email: customerDetails?.email ?? '',
    firstName: shippingAddr.firstName,
    lastName: shippingAddr.lastName,
    shippingAddress: shippingAddr,
    billingAddress: billingAddr,
    lines,
    shippingTitle: shippingPrice === 0 ? 'Envio Grátis' : 'Envio Standard',
    shippingPrice,
    taxLines,
    taxesIncluded: false,
    currency: 'EUR',
    stripeSessionId: session.stripeSessionId,
    stripePaymentIntentId: paymentIntentId,
    clerkUserId: session.clerkUserId,
    internalCheckoutId: session.id,
    amountTotal,
  };

  const order = await createShopifyOrder(input);

  await prisma.checkoutSession.update({
    where: { id: session.id },
    data: {
      status: 'PAID',
      shopifyOrderId: order.id,
      shopifyOrderName: order.name,
      stripePaymentIntentId: paymentIntentId,
      shopifyError: null,
    },
  });

  return order;
}
