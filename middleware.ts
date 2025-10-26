import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { TOKEN_FIELDS } from './lib/config';
import { getRedirectUrlToAuth } from './lib/features/auth/utility';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_FIELDS.REFRESH_TOKEN_KEY);
  const fullUrl = request.nextUrl.href;

  if (!token) {
    // We will have two level of validation.
    // One in the middleware and another in the AuthGuard component.
    return NextResponse.redirect(new URL(getRedirectUrlToAuth(fullUrl), request.url));
  }

  const response = NextResponse.next();
  response.headers.set('x-full-url', fullUrl);

  return response;
}

export const config = {
  matcher: ['/settings/:path*', '/posts/create/:path*', '/posts/:path*/edit'],
};
