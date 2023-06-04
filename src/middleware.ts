import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { mwExtractCookies, mwIsAuthenticated } from './api/apiUtils/auth';

export function middleware(req: NextRequest) {
  mwExtractCookies(req.cookies.getAll());
  const cookies = mwExtractCookies(req.cookies.getAll());

  const response = NextResponse.next();

  if (req.nextUrl.pathname.startsWith('/me')) {
    if (!mwIsAuthenticated(cookies)) {
      return NextResponse.redirect(new URL(`/auth/sign-in?next=${req.nextUrl.pathname}`, req.url));
    }
  }
  return response;
}

export const config = {
  matcher: ['/me']
};
