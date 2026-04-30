import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Clerk session verification happens in server components and API routes.
// The proxy just passes every request through — no Edge Runtime Clerk dependency.
export default function proxy(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
