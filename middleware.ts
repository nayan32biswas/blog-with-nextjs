import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { TOKEN_FIELDS } from "./lib/config";

const privatePathsPrefix = ["/user/"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_FIELDS.REFRESH_TOKEN_KEY);

  const nextPath = request.nextUrl.pathname;

  const isPrivatePath = privatePathsPrefix.some((path) => nextPath.startsWith(path));

  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
