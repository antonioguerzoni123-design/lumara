import { NextResponse } from 'next/server';
import { generateCodeVerifier, generateCodeChallenge, generateState, generateNonce } from '@/lib/pkce';

const SHOP_ID = '103627391313';
const AUTH_BASE = `https://shopify.com/authentication/${SHOP_ID}`;
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID ?? '03907cc8-9618-4ddf-b424-babe73cf9845';

export async function GET(request) {
  const origin = new URL(request.url).origin;
  const redirectUri = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_REDIRECT_URI ?? `${origin}/api/auth/callback`;

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateState();
  const nonce = generateNonce();

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'openid email customer-account-api:full',
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const response = NextResponse.redirect(`${AUTH_BASE}/oauth/authorize?${params}`);

  const isLocalhost = origin.startsWith('http://localhost');
  const cookieOpts = {
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  };
  response.cookies.set('pkce_verifier', codeVerifier, cookieOpts);
  response.cookies.set('oauth_state', state, cookieOpts);
  response.cookies.set('oauth_nonce', nonce, cookieOpts);

  return response;
}
