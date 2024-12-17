import { NextResponse, NextRequest } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  console.log("session", session);
  const isPublicRoute = !!PUBLIC_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
