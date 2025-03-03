import { jwtVerify } from 'jose';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('token')?.value;

  if (url.pathname === '/auth/logout') {
    const response = NextResponse.redirect(new URL('/auth/login', url));
    response.cookies.delete('token');
    return response;
  }

  const isProtectedRoute = ['/', '/auth/logout'].includes(url.pathname);
  const isLoginRoute = url.pathname === '/auth/login';

  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/auth/login', url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    if (payload.exp && payload.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }
  } catch (error) {
    const response = NextResponse.redirect(new URL('/auth/login', url));
    response.cookies.delete('token');
    return response;
  }

  if (isLoginRoute) {
    return NextResponse.redirect(new URL('/', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/logout', '/auth/login'],
};
