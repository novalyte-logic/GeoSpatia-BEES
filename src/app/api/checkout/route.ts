import { NextResponse, type NextRequest } from "next/server";
import { stripe, PRICING_PACKAGES, type PricingPackageId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Stripe is not configured yet. STRIPE_SECRET_KEY must be set in the server environment.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { packageId } = body as { packageId?: PricingPackageId };

    if (!packageId || !PRICING_PACKAGES[packageId]) {
      return NextResponse.json(
        { ok: false, error: "Invalid or missing package selection." },
        { status: 400 }
      );
    }

    const pkg = PRICING_PACKAGES[packageId];

    // Determine host origin for redirect callbacks
    const origin =
      req.headers.get("origin") ||
      req.headers.get("referer")?.replace(/\/+$/, "") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://geospatialabs.com";

    const isSubscription = pkg.mode === "subscription";

    // Use public logo URL for Stripe Checkout branding
    const logoUrl = origin.startsWith("http://localhost")
      ? "https://geospatialabs.com/geospatia-logo.png"
      : `${origin}/geospatia-logo.png`;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `GeoSpatia Labs — ${pkg.name}`,
              description: pkg.description,
              images: [logoUrl],
            },
            unit_amount: pkg.amountCents,
            ...(isSubscription
              ? { recurring: { interval: "month" } }
              : {}),
          },
          quantity: 1,
        },
      ],
      mode: pkg.mode,
      billing_address_collection: "auto",
      custom_fields: [
        {
          key: "candidate_site_or_apn",
          label: {
            type: "custom",
            custom: "Candidate Site / APN (if known)",
          },
          type: "text",
          optional: true,
        },
      ],
      success_url: `${origin}/pricing?checkout=success&package=${pkg.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      metadata: {
        packageId: pkg.id,
        packageName: pkg.name,
      },
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown checkout error";
    console.error("[stripe] Checkout session creation failed:", msg);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to initiate secure checkout session. Please try again or reach out to admin@geospatialabs.com.",
      },
      { status: 500 }
    );
  }
}
