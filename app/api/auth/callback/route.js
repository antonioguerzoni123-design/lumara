import { NextResponse } from 'next/server';

const SHOP_ID = '103627391313';
const AUTH_BASE = `https://shopify.com/authentication/${SHOP_ID}`;
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID ?? '03907cc8-9618-4ddf-b424-babe73cf9845';
const REDIRECT_URI = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_REDIRECT_URI ?? 'https://lumarabeauty.com/api/auth/callback';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const error = searchParams.get('error');

  const storedState = request.cookies.get('oauth_state')?.value;
  const codeVerifier = request.cookies.get('pkce_verifier')?.value;

  if (error || !code) {
    return NextResponse.redirect(new URL('/login?error=access_denied', request.url));
  }

  if (!storedState || storedState !== returnedState) {
    return NextResponse.redirect(new URL('/login?error=invalid_state', request.url));
  }

  try {
    const tokenRes = await fetch(`${AUTH_BASE}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code,
        code_verifier: codeVerifier,
      }),
      cache: 'no-store',
    });

    if (!tokenRes.ok) {
      const body = await tokenRes.text();
      console.error('Token exchange failed:', tokenRes.status, body);
      throw new Error(`Token exchange failed: ${tokenRes.status}`);
    }

    const { access_token, refresh_token, expires_in } = await tokenRes.json();

    const response = NextResponse.redirect('https://lumarabeauty.com/conta');

    const secureOpts = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    };

    response.cookies.set('shopify_customer_token', access_token, {
      ...secureOpts,
      maxAge: expires_in ?? 3600,
    });
    if (refresh_token) {
      response.cookies.set('shopify_customer_refresh_token', refresh_token, {
        ...secureOpts,
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    response.cookies.set('shopify_token_expires_at', String(Date.now() + (expires_in ?? 3600) * 1000), {
      ...secureOpts,
      maxAge: expires_in ?? 3600,
    });

    response.cookies.delete('oauth_state');
    response.cookies.delete('pkce_verifier');
    response.cookies.delete('oauth_nonce');

    return response;
  } catch (err) {
    console.error('Auth callback error:', err);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
