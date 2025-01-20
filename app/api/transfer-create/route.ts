import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "Stripe secret key is not defined in the environment variables."
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { amount, currency, destination } = body;

    if (!amount || !currency || !destination) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: amount, currency, destination, or transferGroup",
        },
        { status: 400 }
      );
    }

    // Create the transfer
    const transfer = await stripe.transfers.create({
      amount,
      currency,
      destination,
    });

    // Return the successful transfer response
    return NextResponse.json({ transfer }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating transfer:", error);

    // Handle errors and return an appropriate response
    return NextResponse.json(
      {
        error: error.message || "An error occurred while creating the transfer",
      },
      { status: 500 }
    );
  }
}
