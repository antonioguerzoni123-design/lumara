import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/criar-conta(.*)',
  '/loja(.*)',
  '/produto(.*)',
  '/promocoes(.*)',
  '/rituais(.*)',
  '/sobre-nos(.*)',
  '/faq(.*)',
  '/apoio(.*)',
  '/api/webhooks/(.*)',
  '/api/admin/(.*)',
  '/api/checkout(.*)',
  '/api/favorites(.*)',
  '/api/preferences(.*)',
  '/api/support(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
