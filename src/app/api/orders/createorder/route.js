import { NextResponse } from "next/server";
import { createOrder } from "@/lib/services";

export async function POST(req) {
  try {
    // 1️⃣ Parse request body
    const body = await req.json();
    const { service, link, quantity, charge } = body;

    if (!service || !link || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields: service, link, or quantity" },
        { status: 400 }
      );
    }

    // 2️⃣ Prepare data to send to your SMM API
    const orderData = {
      service,     // ID or code of the service
      link,        // URL provided by user
      quantity,    // quantity
    };

    // 3️⃣ Call your lib function (which uses axios internally)
    const response = await createOrder(orderData);
    console.log(response)

    // 4️⃣ Handle API error
    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }

    // 5️⃣ Return success response
    return NextResponse.json({
      success: true,
      message: "Order created successfully!",
      orderId: response.order,  // depends on your API’s response format
      charge,
      details: response,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
