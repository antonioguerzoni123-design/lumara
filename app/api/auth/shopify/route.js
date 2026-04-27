import { NextResponse } from 'next/server';
import { generateCodeVerifier, generateCodeChallenge, generateState, generateNonce } from '@/lib/pkce';

export async function GET() {
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID;
  const apiUrl = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL;
  const redirectUri = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_REDIRECT_URI;

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateState();
  const nonce = generateNonce();

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'openid email',
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const response = NextResponse.redirect(`${apiUrl}/oauth/authorize?${params}`);
  const cookieOpts = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 600 };
  response.cookies.set('pkce_verifier', codeVerifier, cookieOpts);
  response.cookies.set('oauth_state', state, cookieOpts);
  response.cookies.set('oauth_nonce', nonce, cookieOpts);

  return response;
}
