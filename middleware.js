import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('shopify_access_token')?.value;
  const expiresAt = request.cookies.get('shopify_token_expires_at')?.value;
  const { pathname } = request.nextUrl;

  const isTokenValid = token && expiresAt && Date.now() < Number(expiresAt);

  if (pathname.startsWith('/conta') && !isTokenValid) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/conta/:path*'],
};
