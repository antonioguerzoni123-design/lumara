import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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

  console.log('CALLBACK: code recebido:', !!code, '| state:', returnedState, '| error:', error);
  console.log('CALLBACK: redirect_uri usado:', redirectUri);

  const storedState = request.cookies.get('oauth_state')?.value;
  const codeVerifier = request.cookies.get('pkce_verifier')?.value;

  console.log('CALLBACK: storedState:', storedState, '| codeVerifier presente:', !!codeVerifier);
  console.log('CALLBACK: state match:', storedState === returnedState);

  if (error || !code) {
    console.error('CALLBACK: Sem código ou erro OAuth:', error);
    return NextResponse.redirect(new URL('/login?error=access_denied', request.url));
  }

  if (!storedState || storedState !== returnedState) {
    console.error('CALLBACK: State inválido — stored:', storedState, '| returned:', returnedState);
    return NextResponse.redirect(new URL('/login?error=invalid_state', request.url));
  }

  try {
    console.log('CALLBACK: A trocar código por token…');
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

    console.log('CALLBACK: token response status:', tokenRes.status);

    if (!tokenRes.ok) {
      const body = await tokenRes.text();
      console.error('CALLBACK: Token exchange falhou:', tokenRes.status, body);
      throw new Error(`Token exchange failed: ${tokenRes.status}`);
    }

    const tokenData = await tokenRes.json();
    console.log('TOKEN FIELDS:', Object.keys(tokenData));
    console.log('ACCESS TOKEN prefix:', tokenData.access_token?.substring(0, 10));
    console.log('ID TOKEN prefix:', tokenData.id_token?.substring(0, 10));

    // Garantir que guardamos o token com prefixo shcat_, independentemente do campo
    const accessToken =
      (typeof tokenData.access_token === 'string' && tokenData.access_token.startsWith('shcat_'))
        ? tokenData.access_token
        : Object.values(tokenData).find(v => typeof v === 'string' && v.startsWith('shcat_'));

    console.log('SHCAT TOKEN encontrado:', !!accessToken, '| prefix:', accessToken?.substring(0, 15));

    if (!accessToken) {
      console.error('CALLBACK: Nenhum token shcat_ encontrado na resposta. Fields:', Object.keys(tokenData));
      return NextResponse.redirect(new URL('/login?error=server_error', request.url));
    }

    const cookieStore = await cookies();

    const cookieOpts = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    };

    cookieStore.set('shopify_customer_token', accessToken, {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set('shopify_token_expires_at', String(Date.now() + (tokenData.expires_in ?? 3600) * 1000), {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 7,
    });
    if (tokenData.refresh_token) {
      cookieStore.set('shopify_customer_refresh_token', tokenData.refresh_token, {
        ...cookieOpts,
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    cookieStore.delete('oauth_state');
    cookieStore.delete('pkce_verifier');
    cookieStore.delete('oauth_nonce');

    console.log('CALLBACK: a redirecionar para /');
    return NextResponse.redirect(`${reqUrl.origin}/`);
  } catch (err) {
    console.error('CALLBACK: Erro:', err);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
