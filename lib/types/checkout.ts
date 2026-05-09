import { z } from 'zod';

export type CartLineInput = {
  shopifyVariantId: string;
  quantity: number;
};

export const ValidatedLineSchema = z.object({
  shopifyVariantId: z.string(),
  productTitle: z.string(),
  variantTitle: z.string(),
  price: z.number(),
  quantity: z.number(),
  imageUrl: z.string().optional(),
});

export const ValidatedLinesSchema = z.array(ValidatedLineSchema);

export type ValidatedLine = z.infer<typeof ValidatedLineSchema>;

export type ShopifyAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  provinceCode?: string;
  countryCode: string;
  phone?: string;
};

export type ShopifyTaxLine = {
  title: string;
  price: number;
  rate: number;
};

export type ShopifyOrderInput = {
  email: string;
  firstName: string;
  lastName: string;
  shippingAddress: ShopifyAddress;
  billingAddress: ShopifyAddress;
  lines: ValidatedLine[];
  shippingTitle: string;
  shippingPrice: number;
  taxLines: ShopifyTaxLine[];
  taxesIncluded: boolean;
  currency: string;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  clerkUserId: string;
  internalCheckoutId: string;
  amountTotal: number;
};

export type CheckoutStatusResponse = {
  status: string;
  shopifyOrderName: string | null;
};
