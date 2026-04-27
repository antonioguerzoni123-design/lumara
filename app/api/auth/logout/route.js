import { NextResponse } from 'next/server';

export async function GET(request) {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.delete('shopify_access_token');
  response.cookies.delete('shopify_refresh_token');
  response.cookies.delete('shopify_token_expires_at');
  return response;
}
