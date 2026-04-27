import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('shopify_customer_refresh_token')?.value;

  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID;
    const apiUrl = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL;

    const tokenRes = await fetch(`${apiUrl}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        refresh_token: refreshToken,
      }),
      cache: 'no-store',
    });

    if (!tokenRes.ok) throw new Error('Refresh failed');

    const { access_token, refresh_token: newRefresh, expires_in } = await tokenRes.json();
    const expiresAt = Date.now() + expires_in * 1000;

    const secureOpts = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' };
    cookieStore.set('shopify_customer_token', access_token, { ...secureOpts, maxAge: expires_in });
    cookieStore.set('shopify_token_expires_at', String(expiresAt), { ...secureOpts, maxAge: expires_in });
    if (newRefresh) {
      cookieStore.set('shopify_customer_refresh_token', newRefresh, { ...secureOpts, maxAge: 60 * 60 * 24 * 30 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
