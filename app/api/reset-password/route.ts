import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // Generate a password reset link using Supabase and email it to the user
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/forgot-password/reset`,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
