import { NextResponse, NextRequest } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ORDERS } from "@/lib/routes";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();

  const isAuthenticated = !!session?.user;
  const isPublicRoute = !!PUBLIC_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (!isAuthenticated && !isPublicRoute) {
    if (nextUrl.pathname !== LOGIN) {
      return NextResponse.redirect(new URL(LOGIN, nextUrl));
    }
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(ORDERS, nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
