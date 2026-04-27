export async function GET() {
  // Remove this route after debugging
  return Response.json({
    CLIENT_ID: process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID ? '✅ set' : '❌ missing',
    API_URL: process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL ?? '❌ missing',
    REDIRECT_URI: process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_REDIRECT_URI ?? '❌ missing',
    RESEND: process.env.RESEND_API_KEY ? '✅ set' : '❌ missing',
    NODE_ENV: process.env.NODE_ENV,
  });
}
