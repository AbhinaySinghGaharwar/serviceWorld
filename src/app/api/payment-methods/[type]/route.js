import { NextResponse } from "next/server";
import { getPaymentDetails, putPaymentDetails } from "@/lib/paymentMethod";

export async function GET(request, { params }) {
  try {
    const method = await getPaymentDetails(params.type);
    if (!method) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (method.qrImage) method.qrImage = method.qrImage.toString("base64");
    return NextResponse.json(method);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { merchantId, token, active } = await request.json();
    const qrBase64 = request.headers.get("qr-base64"); // optional new QR

    const result = await putPaymentDetails(params.type, { merchantId, token, active, qrBase64 });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
