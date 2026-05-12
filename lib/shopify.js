import { products as localProducts } from './products';

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? '2026-04';

async function shopifyFetch(query, variables = {}, options = {}) {
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  images(first: 10) { edges { node { url altText } } }
  priceRange { minVariantPrice { amount } }
  compareAtPriceRange { minVariantPrice { amount } }
  variants(first: 20) { edges { node { id title availableForSale priceV2 { amount } compareAtPriceV2 { amount } } } }
`;

// Shopify is authoritative for name, images, price, compare-at, and variant IDs.
// Editorial fields (description, headline, hook, benefits, stats) come from local products.ts.
function mapShopifyProduct(node, local) {
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = parseFloat(
    node.compareAtPriceRange?.minVariantPrice?.amount ?? '0'
  );
  const variantEdges = node.variants.edges;

  const shopifyVariantIds = {};
  const shopifyVariantPrices = {};
  variantEdges.forEach((e) => {
    shopifyVariantIds[e.node.title] = e.node.id;
    shopifyVariantPrices[e.node.title] = parseFloat(e.node.priceV2.amount);
  });

  // Use Shopify variant titles; hide selector for single-variant products
  const shopifyVariantTitles = variantEdges.length > 1
    ? variantEdges.filter((e) => e.node.availableForSale).map((e) => e.node.title)
    : undefined;

  const hasCompare = compareAt > price;
  const shopifyImages = node.images?.edges?.map((e) => e.node.url) ?? [];

  return {
    id:            local?.id ?? Math.abs(parseInt(node.id.replace(/\D/g, '').slice(-8)) % 9999999),
    slug:          local?.slug ?? node.handle,
    name:          node.title        ?? local?.name        ?? '',
    headline:      local?.headline    ?? '',
    hook:          local?.hook        ?? '',
    description:   local?.description ?? '',
    benefits:      local?.benefits    ?? [],
    stats:         local?.stats       ?? [],
    images:        shopifyImages.length ? shopifyImages : (local?.images ?? []),
    category:      local?.category    ?? 'cabelo',
    badge:         local?.badge,
    featured:      local?.featured    ?? false,
    rating:        local?.rating,
    reviewCount:   local?.reviewCount,
    variants:      shopifyVariantTitles,
    defaultVariant: local?.defaultVariant,
    includedItems: local?.includedItems,

    price,
    originalPrice: hasCompare ? compareAt : local?.originalPrice,
    discount:      hasCompare ? Math.round((1 - price / compareAt) * 100) : local?.discount,

    _shopifyVariantIds:     shopifyVariantIds,
    _shopifyVariantPrices:  shopifyVariantPrices,
    _defaultVariantId:      variantEdges.find((e) => e.node.availableForSale)?.node.id ?? variantEdges[0]?.node.id ?? null,
  };
}

function localFallback(local) {
  return {
    ...local,
    _shopifyVariantIds:    {},
    _shopifyVariantPrices: {},
    _defaultVariantId:     null,
  };
}

export async function getAllProducts() {
  try {
    const data = await shopifyFetch(
      `query GetAllProducts { products(first: 50) { edges { node { ${PRODUCT_FRAGMENT} } } } }`,
      {},
      { next: { revalidate: 60 } }
    );

    // Build a map of shopifyHandle → shopify node
    const shopifyNodeByHandle = {};
    for (const { node } of data.products.edges) {
      shopifyNodeByHandle[node.handle] = node;
    }

    // Map each local product in order; use Shopify data when handle is configured
    return localProducts.map((local) => {
      if (local.shopifyHandle && shopifyNodeByHandle[local.shopifyHandle]) {
        return mapShopifyProduct(shopifyNodeByHandle[local.shopifyHandle], local);
      }
      return localFallback(local);
    });
  } catch {
    return localProducts.map(localFallback);
  }
}

export async function getProductByHandle(slug) {
  const local = localProducts.find((p) => p.slug === slug);
  if (!local) return null;

  if (!local.shopifyHandle) return localFallback(local);

  try {
    const data = await shopifyFetch(
      `query GetProduct($handle: String!) { product(handle: $handle) { ${PRODUCT_FRAGMENT} } }`,
      { handle: local.shopifyHandle },
      { next: { revalidate: 60 } }
    );
    if (!data.product) return localFallback(local);
    return mapShopifyProduct(data.product, local);
  } catch {
    return localFallback(local);
  }
}

/**
 * Fetches a Shopify product by handle without requiring a local product mapping.
 * Used for bundle products created via the Shopify Bundles app.
 * Returns { id, name, price, images, variants, _shopifyVariantIds, _shopifyVariantPrices, _defaultVariantId }
 * or null if not found.
 */
export async function getShopifyBundleProduct(handle) {
  try {
    const data = await shopifyFetch(
      `query GetBundleProduct($handle: String!) { product(handle: $handle) { ${PRODUCT_FRAGMENT} } }`,
      { handle },
      { next: { revalidate: 60 } }
    );
    if (!data.product) return null;
    const node = data.product;
    const variantEdges = node.variants.edges;
    const shopifyVariantIds = {};
    const shopifyVariantPrices = {};
    variantEdges.forEach((e) => {
      shopifyVariantIds[e.node.title] = e.node.id;
      shopifyVariantPrices[e.node.title] = parseFloat(e.node.priceV2.amount);
    });
    return {
      id:                   node.id,
      name:                 node.title,
      price:                parseFloat(node.priceRange.minVariantPrice.amount),
      images:               node.images?.edges?.map((e) => e.node.url) ?? [],
      variants:             variantEdges.length > 1
                              ? variantEdges.filter((e) => e.node.availableForSale).map((e) => e.node.title)
                              : null,
      _shopifyVariantIds:   shopifyVariantIds,
      _shopifyVariantPrices: shopifyVariantPrices,
      _defaultVariantId:    variantEdges.find((e) => e.node.availableForSale)?.node.id ?? variantEdges[0]?.node.id ?? null,
    };
  } catch {
    return null;
  }
}

export async function createCheckout(lines) {
  const normalised = lines.map((l) =>
    typeof l === 'string'
      ? { merchandiseId: l, quantity: 1 }
      : { merchandiseId: l.merchandiseId, quantity: l.quantity ?? 1 }
  );

  const data = await shopifyFetch(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines: normalised },
    { cache: 'no-store' }
  );

  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return cart.checkoutUrl;
}
