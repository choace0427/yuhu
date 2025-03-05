// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";
// import { createClient } from "./client";

// export async function updateSession(request: NextRequest) {
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return request.cookies.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           request.cookies.set({
//             name,
//             value,
//             ...options,
//           });
//         },
//         remove(name: string, options: CookieOptions) {
//           request.cookies.set({
//             name,
//             value: "",
//             ...options,
//           });
//         },
//       },
//     }
//   );

//   const savedLanguage = localStorage.getItem("language_id") || "en";

//   try {
//     if (
//       !request.nextUrl.pathname.startsWith(`${savedLanguage}/`) ||
//       !request.nextUrl.pathname.startsWith(`${savedLanguage}/contactus`) ||
//       !request.nextUrl.pathname.startsWith(`${savedLanguage}/team`) ||
//       !request.nextUrl.pathname.startsWith(`${savedLanguage}/pricing`) ||
//       !request.nextUrl.pathname.startsWith(`${savedLanguage}/services`) ||
//       !request.nextUrl.pathname.startsWith(`${savedLanguage}/about`)
//     ) {
//       return NextResponse.next();
//     }

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       if (!request.nextUrl.pathname.startsWith(`${savedLanguage}/auth`)) {
//         return NextResponse.redirect(
//           new URL(`${savedLanguage}/auth/login`, request.url)
//         );
//       }
//       return NextResponse.next();
//     }

//     const serverSupabase = createClient();

//     // Check therapist status
//     const { data: therapist, error: therapistError } = await serverSupabase
//       .from("therapist_list")
//       .select()
//       .eq("id", user.id)
//       .single();

//     if (therapistError) {
//       console.error("Therapist query error:", therapistError);
//     }

//     if (therapist) {
//       if (therapist.step === "completed") {
//         if (
//           therapist.status === "pending" &&
//           request.nextUrl.pathname !== `${savedLanguage}/home`
//         ) {
//           const redirectUrl = new URL(
//             `${savedLanguage}/therapist`,
//             request.url
//           );
//           redirectUrl.searchParams.set("pending", "true");
//           const response = NextResponse.redirect(redirectUrl);
//           response.cookies.set({
//             name: "user_pending",
//             value: "true",
//             maxAge: 10,
//             // httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//           });
//           return response;
//           // return NextResponse.redirect(new URL("/", request.url));
//         }
//         if (therapist.status === "block") {
//           const redirectUrl = new URL(
//             `${savedLanguage}/auth/login`,
//             request.url
//           );
//           redirectUrl.searchParams.set("blocked", "true");
//           const response = NextResponse.redirect(redirectUrl);
//           response.cookies.set({
//             name: "user_blocked",
//             value: "true",
//             maxAge: 10,
//             // httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//           });
//           return response;
//         }
//       }
//     } else {
//       // Check customer status
//       const { data: customer, error: customerError } = await serverSupabase
//         .from("customers_list")
//         .select()
//         .eq("id", user.id)
//         .single();

//       if (customerError) {
//         console.error("Customer query error:", customerError);
//       }

//       if (customer) {
//         if (
//           customer.status === "pending" &&
//           request.nextUrl.pathname !== `${savedLanguage}/home`
//         ) {
//           const redirectUrl = new URL(`${savedLanguage}/home`, request.url);
//           redirectUrl.searchParams.set("pending", "true");
//           const response = NextResponse.redirect(redirectUrl);
//           response.cookies.set({
//             name: "user_pending",
//             value: "true",
//             maxAge: 10,
//             // httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//           });
//           return response;
//           // return NextResponse.redirect(new URL("/", request.url));
//         }
//         if (customer.status === "block") {
//           const redirectUrl = new URL(
//             `${savedLanguage}/auth/login`,
//             request.url
//           );
//           redirectUrl.searchParams.set("blocked", "true");
//           const response = NextResponse.redirect(redirectUrl);
//           response.cookies.set({
//             name: "user_blocked",
//             value: "true",
//             maxAge: 10,
//             // httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//           });
//           return response;
//         }
//       }
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.next();
//   }
// }

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./client";

export async function updateSession(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Retrieve the language ID from cookies; default to "en" if not set
  const savedLanguage = request.cookies.get("language_id")?.value || "en";

  try {
    // Check whether the current path starts with the expected language prefix
    if (
      !request.nextUrl.pathname.startsWith(`/${savedLanguage}/`) &&
      !request.nextUrl.pathname.startsWith(`/${savedLanguage}/contactus`) &&
      !request.nextUrl.pathname.startsWith(`/${savedLanguage}/team`) &&
      !request.nextUrl.pathname.startsWith(`/${savedLanguage}/pricing`) &&
      !request.nextUrl.pathname.startsWith(`/${savedLanguage}/services`) &&
      !request.nextUrl.pathname.startsWith(`/${savedLanguage}/about`)
    ) {
      return NextResponse.next();
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (!request.nextUrl.pathname.startsWith(`/${savedLanguage}/auth`)) {
        return NextResponse.redirect(
          new URL(`/${savedLanguage}/auth/login`, request.url)
        );
      }
      return NextResponse.next();
    }

    const serverSupabase = createClient();

    // Check therapist status
    const { data: therapist, error: therapistError } = await serverSupabase
      .from("therapist_list")
      .select()
      .eq("id", user.id)
      .single();

    if (therapistError) {
      console.error("Therapist query error:", therapistError);
    }

    if (therapist) {
      if (therapist.step === "completed") {
        if (
          therapist.status === "pending" &&
          request.nextUrl.pathname !== `/${savedLanguage}/`
        ) {
          const redirectUrl = new URL(
            `/${savedLanguage}/therapist`,
            request.url
          );
          redirectUrl.searchParams.set("pending", "true");
          const response = NextResponse.redirect(redirectUrl);
          response.cookies.set({
            name: "user_pending",
            value: "true",
            maxAge: 10,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          return response;
        }
        if (therapist.status === "block") {
          const redirectUrl = new URL(
            `/${savedLanguage}/auth/login`,
            request.url
          );
          redirectUrl.searchParams.set("blocked", "true");
          const response = NextResponse.redirect(redirectUrl);
          response.cookies.set({
            name: "user_blocked",
            value: "true",
            maxAge: 10,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          return response;
        }
      }
    } else {
      // Check customer status
      const { data: customer, error: customerError } = await serverSupabase
        .from("customers_list")
        .select()
        .eq("id", user.id)
        .single();

      if (customerError) {
        console.error("Customer query error:", customerError);
      }

      if (customer) {
        if (
          customer.status === "pending" &&
          request.nextUrl.pathname !== `/${savedLanguage}/`
        ) {
          const redirectUrl = new URL(`/${savedLanguage}/`, request.url);
          redirectUrl.searchParams.set("pending", "true");
          const response = NextResponse.redirect(redirectUrl);
          response.cookies.set({
            name: "user_pending",
            value: "true",
            maxAge: 10,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          return response;
        }
        if (customer.status === "block") {
          const redirectUrl = new URL(
            `/${savedLanguage}/auth/login`,
            request.url
          );
          redirectUrl.searchParams.set("blocked", "true");
          const response = NextResponse.redirect(redirectUrl);
          response.cookies.set({
            name: "user_blocked",
            value: "true",
            maxAge: 10,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          return response;
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}
