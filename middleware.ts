import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session:", session);
  console.log("Pathname:", req.nextUrl.pathname);

  const protectedPaths = [
    "/customer",
    "/therapist",
    "/booking",
    "/chat",
    "/notifications",
    "/profile",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // if (!session && isProtectedPath) {
  //   console.log("Unauthenticated user, redirecting to /auth/login...");
  //   const redirectUrl = req.nextUrl.clone();
  //   redirectUrl.pathname = "/auth/login";
  //   redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
  //   return NextResponse.redirect(redirectUrl);
  // }

  return res;
}

export const config = {
  matcher: [
    "/customer/:path*",
    "/therapist/:path*",
    "/booking/:path*",
    "/chat/:path*",
    "/notifications/:path*",
    "/profile/:path*",
  ],
};
