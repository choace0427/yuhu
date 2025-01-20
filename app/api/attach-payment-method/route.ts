import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is not defined in the environment variables."
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  try {
    const { paymentMethodId, customerId } = await request.json();

    if (!paymentMethodId || !customerId) {
      return NextResponse.json(
        { error: "Missing required fields: paymentMethodId or customerId" },
        { status: 400 }
      );
    }

    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    return NextResponse.json({ paymentMethod }, { status: 200 });
  } catch (error: any) {
    console.error("Error attaching payment method:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
