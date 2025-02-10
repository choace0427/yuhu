import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { paymentIntent } = body;

    if (!paymentIntent) {
      return NextResponse.json(
        { error: "paymentIntent ID is required" },
        { status: 400 }
      );
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntent,
    });

    return NextResponse.json({ refund }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
