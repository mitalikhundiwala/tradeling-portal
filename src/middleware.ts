import { NextResponse, NextRequest } from "next/server";
import { PUBLIC_ROUTES, LOGIN } from "@/lib/routes";
import { cookies } from "next/headers";
import { TL_AUTH_TOKEN } from "@/constant";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get(TL_AUTH_TOKEN)?.value;

  const isPublicRoute = !!PUBLIC_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route),
  );
  const locale = i18nConfig.getLocale(request);
  if (
    !isAuthenticated &&
    !isPublicRoute &&
    nextUrl.pathname !== LOGIN &&
    nextUrl.pathname !== `/${locale}${LOGIN}`
  ) {
    nextUrl.pathname = `/${locale}${LOGIN}`;
    return NextResponse.redirect(new URL(nextUrl.pathname, request.url));
  }

  // if (isAuthenticated && isPublicRoute) {
  //   return NextResponse.redirect(new URL(ORDERS, nextUrl));
  // }

  // return NextResponse.next();

  return i18nRouter(request, i18nConfig);
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
