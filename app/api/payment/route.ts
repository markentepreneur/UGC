import { withRoute } from "@/lib/routeWrapper";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = withRoute(async (_, session) => {
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const WFP_MERCHANT_ACCOUNT = process.env.WFP_MERCHANT_ACCOUNT;
  const WFP_SECRET_KEY = process.env.WFP_SECRET_KEY;

  if (
    ![NEXT_PUBLIC_BASE_URL, WFP_MERCHANT_ACCOUNT, WFP_SECRET_KEY].every(Boolean)
  ) {
    return NextResponse.json(
      { error: "Missing required environment variables" },
      { status: 500 }
    );
  }

  const amount = 0.1; //? set real price
  const productName = "instrument"; //? set real value
  const data = {
    merchantAccount: WFP_MERCHANT_ACCOUNT,
    merchantDomainName: NEXT_PUBLIC_BASE_URL,
    orderReference: `${session?.user.id}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    orderDate: Math.floor(Date.now() / 1000),
    amount: amount,
    currency: "USD",
    productName: [productName],
    productPrice: [amount],
    productCount: [1],
    returnUrl: `${NEXT_PUBLIC_BASE_URL}/client/cource?checkPayment=true`,
    serviceUrl: `${NEXT_PUBLIC_BASE_URL}/api/payment/wfp-callback`,
    merchantSignature: "", // this will be set below after signature calculation
  };

  // Generate signature
  const signatureString = [
    data.merchantAccount,
    data.merchantDomainName,
    data.orderReference,
    data.orderDate,
    data.amount,
    data.currency,
    ...data.productName,
    ...data.productCount,
    ...data.productPrice,
  ].join(";");

  const signature = crypto
    .createHmac("md5", WFP_SECRET_KEY as string)
    .update(signatureString)
    .digest("hex");

  data.merchantSignature = signature;

  return NextResponse.json(data, { status: 200 });
}, true);
