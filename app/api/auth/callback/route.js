import { NextResponse } from 'next/server';

const SHOP_ID = '103627391313';
const AUTH_BASE = `https://shopify.com/authentication/${SHOP_ID}`;
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID ?? '03907cc8-9618-4ddf-b424-babe73cf9845';

export async function GET(request) {
  const reqUrl = new URL(request.url);
  const { searchParams } = reqUrl;
  const redirectUri = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_REDIRECT_URI ?? `${reqUrl.origin}/api/auth/callback`;
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const error = searchParams.get('error');

  console.log('[auth/callback] Recebido — code:', !!code, 'state:', returnedState, 'error:', error);

  const storedState = request.cookies.get('oauth_state')?.value;
  const codeVerifier = request.cookies.get('pkce_verifier')?.value;

  console.log('[auth/callback] storedState:', storedState, 'codeVerifier presente:', !!codeVerifier);

  if (error || !code) {
    console.error('[auth/callback] Sem código ou erro OAuth:', error);
    return NextResponse.redirect(new URL('/login?error=access_denied', request.url));
  }

  if (!storedState || storedState !== returnedState) {
    console.error('[auth/callback] State inválido — stored:', storedState, 'returned:', returnedState);
    return NextResponse.redirect(new URL('/login?error=invalid_state', request.url));
  }

  try {
    console.log('[auth/callback] A trocar código por token…');
    const tokenRes = await fetch(`${AUTH_BASE}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: redirectUri,
        code,
        code_verifier: codeVerifier,
      }),
      cache: 'no-store',
    });

    if (!tokenRes.ok) {
      const body = await tokenRes.text();
      console.error('[auth/callback] Token exchange falhou:', tokenRes.status, body);
      throw new Error(`Token exchange failed: ${tokenRes.status}`);
    }

    const { access_token, refresh_token, expires_in } = await tokenRes.json();
    console.log('[auth/callback] Token obtido — expires_in:', expires_in, 'refresh_token presente:', !!refresh_token);

    const response = NextResponse.redirect(`${reqUrl.origin}/?conta=aberta`);

    const cookieOpts = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    };

    response.cookies.set('shopify_customer_token', access_token, {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 7,
    });
    if (refresh_token) {
      response.cookies.set('shopify_customer_refresh_token', refresh_token, {
        ...cookieOpts,
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    response.cookies.set('shopify_token_expires_at', String(Date.now() + (expires_in ?? 3600) * 1000), {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.delete('oauth_state');
    response.cookies.delete('pkce_verifier');
    response.cookies.delete('oauth_nonce');

    console.log('[auth/callback] Cookie escrito — redirect para /?conta=aberta');
    return response;
  } catch (err) {
    console.error('[auth/callback] Erro:', err);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
