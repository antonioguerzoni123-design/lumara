import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const store = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const scopes = 'read_customers,write_customers,read_orders';
  const redirectUri = 'https://lumarabeauty.com/api/shopify-oauth/callback';
  const nonce = Math.random().toString(36).substring(2);

  const authUrl = `https://${store}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${nonce}`;

  return NextResponse.redirect(authUrl);
}
