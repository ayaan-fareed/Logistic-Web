import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Server misconfigured: missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { line_items, mode = "payment", success_url, cancel_url } = body;

    if (!line_items || !Array.isArray(line_items)) {
      return NextResponse.json(
        { error: "line_items array is required" },
        { status: 400 }
      );
    }

    if (!success_url || !cancel_url) {
      return NextResponse.json(
        { error: "success_url and cancel_url are required" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
      cancel_url,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
