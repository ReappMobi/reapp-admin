import { decodeJwt } from 'jose';
import { type NextRequest, NextResponse } from 'next/server';
const publicRoutes = [
  {
    path: '/sign-in',
    whenUnauthenticated: 'redirect',
  },
] as const;
const REDIRECT_WHEN_UNAUTHENTICATED = '/sign-in';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => path.startsWith(route.path));
  const token = request.cookies.get('token')?.value;

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_UNAUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenUnauthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) {
    const data = decodeJwt(token);

    if (data.exp && data.exp < Date.now() / 1000) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_UNAUTHENTICATED;
      return NextResponse.redirect(redirectUrl);
    }

    NextResponse.next().cookies.set('user', JSON.stringify(data.user));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
