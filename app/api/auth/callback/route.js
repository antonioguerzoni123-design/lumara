import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const error = searchParams.get('error');

  const cookieStore = await cookies();
  const storedState = cookieStore.get('oauth_state')?.value;
  const codeVerifier = cookieStore.get('pkce_verifier')?.value;

  if (error || !code) {
    return NextResponse.redirect(new URL('/login?error=access_denied', request.url));
  }

  if (!storedState || storedState !== returnedState) {
    return NextResponse.redirect(new URL('/login?error=invalid_state', request.url));
  }

  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID;
    const apiUrl = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL ?? 'https://shopify.com/103627391313/account';
    const redirectUri = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_REDIRECT_URI ?? 'https://lumarabeauty.com/api/auth/callback';

    const tokenRes = await fetch(`${apiUrl}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
        code_verifier: codeVerifier,
      }),
      cache: 'no-store',
    });

    if (!tokenRes.ok) {
      throw new Error(`Token exchange failed: ${tokenRes.status}`);
    }

    const { access_token, refresh_token, expires_in } = await tokenRes.json();

    const expiresAt = Date.now() + expires_in * 1000;

    const response = NextResponse.redirect(new URL('/conta', request.url));
    const secureOpts = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' };

    response.cookies.set('shopify_access_token', access_token, { ...secureOpts, maxAge: expires_in });
    response.cookies.set('shopify_refresh_token', refresh_token, { ...secureOpts, maxAge: 60 * 60 * 24 * 30 });
    response.cookies.set('shopify_token_expires_at', String(expiresAt), { ...secureOpts, maxAge: expires_in });

    response.cookies.delete('oauth_state');
    response.cookies.delete('pkce_verifier');
    response.cookies.delete('oauth_nonce');

    return response;
  } catch (err) {
    console.error('Auth callback error:', err);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
