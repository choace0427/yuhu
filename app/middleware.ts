import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  //   const adminPath = "/admin";
  //   const apiAdminPath = "/api/admin";

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("------------", session);

  if (!session) {
    // if (req.nextUrl.pathname.startsWith("/auth/login")) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "authorization failed" }),
    //     { status: 403, headers: { "Content-Type": "application/json" } }
    //   );
    // }
    //  else {
    console.log("======");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    return NextResponse.redirect(redirectUrl);
    // }
  }
}

export const config = {
  matcher: [
    "/customer/:path*",
    "/therapist/:path*",
    "/booking/:path*",
    "/chat/:path*",
    "/notifications/:path*",
    "/about/:path*",
    "/pricing/:path*",
    "/:path*",
    "/services/:path*",
    "/team/:path*",
    "/contactus/:path*",
  ],
};
