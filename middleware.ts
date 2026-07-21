import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isStaffRoute = request.nextUrl.pathname.startsWith('/staff') &&
    request.nextUrl.pathname !== '/staff/login';

  if (isStaffRoute) {
    const authCookie = request.cookies.get('staff_auth');
    if (authCookie?.value !== 'true') {
      return NextResponse.redirect(new URL('/staff/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/staff/:path*',
};
