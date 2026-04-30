export async function GET() {
  return Response.json({
    CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ set' : '❌ missing',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? '✅ set' : '❌ missing',
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET ? '✅ set' : '❌ missing',
    SHOPIFY_ADMIN_TOKEN: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ? '✅ set' : '❌ missing',
    RESEND: process.env.RESEND_API_KEY ? '✅ set' : '❌ missing',
    NODE_ENV: process.env.NODE_ENV,
  });
}
