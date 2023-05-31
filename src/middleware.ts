import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isAuthenticated } from './api/apiUtils/auth';

export function middleware(req: NextRequest) {
  const context = { req, res: NextResponse.next() };
  if (context.req.nextUrl.pathname.startsWith('/me')) {
    if (!isAuthenticated(context)) {
      return NextResponse.redirect(new URL('/auth/sign-in', context.req.url));
    }
  }
  return context.res;
}

export const config = {
  matcher: ['/me']
};
