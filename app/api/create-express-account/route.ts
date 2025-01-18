import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const account = await stripe.accounts.create({
      type: "express",
    });

    return NextResponse.json({ account }, { status: 200 });
  } catch (error) {
    console.error("Error creating Stripe account:", error);

    return NextResponse.json(
      { error: "An error occurred while creating a Stripe account." },
      { status: 500 }
    );
  }
}
