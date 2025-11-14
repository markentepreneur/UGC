import { withRoute } from "@/lib/routeWrapper";
import { User } from "@/models/userModel";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = withRoute(async (req) => {
  if (!process.env.WFP_SECRET_KEY) {
    return NextResponse.json(
      { error: "Missing WFP_SECRET_KEY environment variable" },
      { status: 500 }
    );
  }
  const body = await req.json();

  const {
    merchantAccount,
    orderReference,
    amount,
    currency,
    transactionStatus,
    reasonCode,
    merchantSignature,
    authCode = "",
    cardPan = "",
  } = body;

  // Build signature string in WayForPay order
  const signatureString = [
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode,
  ].join(";");

  const expectedSignature = crypto
    .createHmac("md5", process.env.WFP_SECRET_KEY)
    .update(signatureString)
    .digest("hex");

  if (expectedSignature === merchantSignature) {
    console.log("✅ Payment verified:", orderReference);
    const userId = (orderReference as string).split("-")[0];
    await User.findByIdAndUpdate(userId, { paidAt: Date.now() });
    return NextResponse.json({ orderReference, status: "accept" });
  } else {
    console.warn("❌ Invalid signature from WayForPay:", body);

    return NextResponse.json({ orderReference, status: "decline" });
  }
});
