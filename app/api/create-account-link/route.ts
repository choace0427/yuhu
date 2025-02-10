import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { connectedAccountId } = body;

    if (!connectedAccountId) {
      return NextResponse.json(
        { error: "'connectedAccountId' is required in the request body" },
        { status: 400 }
      );
    }

    const accountLink = await stripe.accountLinks.create({
      account: connectedAccountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/therapist/signup/payment`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/therapist/signup/payment?account_id=${connectedAccountId}`,
      type: "account_onboarding",
    });

    // Return the account link as JSON
    return NextResponse.json({ accountLink }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating account link:", error.message);

    // Return error response
    return NextResponse.json(
      { error: "An error occurred while creating the account link" },
      { status: 500 }
    );
  }
}
