import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { NextResponse, NextRequest } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ORDERS } from "@/lib/routes";
import { auth } from "@/auth";

const defaultLocale = "en";
const locales = ["en", "ar"];

function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  console.log('acceptedLanguage::', acceptedLanguage);
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  const isAuthenticated = !!session?.user;
  const isPublicRoute = !!PUBLIC_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && !isPublicRoute) {
    if (nextUrl.pathname !== LOGIN) {
      return NextResponse.redirect(new URL(LOGIN, nextUrl));
    }
  }

  if (isAuthenticated && pathname === "/") {
    const locale = getLocale(request); // Detect preferred locale (en or ar)
    return NextResponse.redirect(new URL(`/${locale}`, request.url)); // Redirect to /en or /ar
  }

  if (isAuthenticated && isPublicRoute) {
    const pathnameIsMissingLocale = locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);

      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(
        new URL(`/${locale}/${pathname}`, request.url)
      );
    }

    // Redirect if there is no locale
    const locale = getLocale(request);
    nextUrl.pathname = `/${locale}${pathname}`;
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
