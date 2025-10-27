import { NextResponse } from "next/server";
import { putPaymentDetails, getAllPaymentMethods } from "@/lib/paymentMethod";

export async function GET() {
  try {
    const methods = await getAllPaymentMethods();

    // Only keep type and qrImage, convert qrImage buffer to base64
    const formatted = methods.map((m) => ({
      type: m.type,
      qrImage: m.qrImage ? m.qrImage.toString("base64") : null,
    }));

    return NextResponse.json({ success: true, methods: formatted });
  } catch (err) {
    console.error("Error fetching payment methods:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { type, merchantId, token, active, qrBase64 } = await request.json();

    if (!qrBase64) return NextResponse.json({ error: "QR image is required" }, { status: 400 });

    const result = await putPaymentDetails(type, { merchantId, token, active, qrBase64 });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
