import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/landing', '/auth/signin', '/auth/signup', '/register', '/', '/dashboard'];

export async function middleware(request) {
  const token = await getToken({ req: request }).catch(() => null);
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  // Public routes: Authenticated users are redirected to /dashboard
  if (isPublicRoute) {
    // Prevent infinite loop by not redirecting authenticated users to the same route
    if (token && pathname !== '/manage') {
      return NextResponse.redirect(new URL('/manage', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes: Redirect unauthenticated users to sign-in page
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname); // Preserve the attempted URL
    return NextResponse.redirect(signInUrl);
  }

  // Protected routes: Unauthenticated users are redirected to /auth/signin
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url); // Always set the full URL
    console.log('Redirecting to sign-in:', signInUrl.href);
    return NextResponse.redirect(signInUrl);
  }
  

  // Allow access to authenticated users
  return NextResponse.next();
}

// Configure route matching
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
