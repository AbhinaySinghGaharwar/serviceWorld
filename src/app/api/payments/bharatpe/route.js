import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Static merchant credentials
    const merchantId = process.env.MARCHANT_ID;
    const token = "06bc2221af4f426dab9a40a38bff5ac5";

    // Static date range for now (you can later make it dynamic using query params)
    const fromDate = "2025-10-01";
    const toDate = "2025-10-25";

    // BharatPe API URL
    const apiUrl = `https://payments-tesseract.bharatpe.in/api/v1/merchant/transactions?module=PAYMENT_QR&merchantId=${merchantId}&sDate=${fromDate}&eDate=${toDate}`;

    // Fetch request with BharatPe headers
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        token: token,
        "user-agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
      },
    });

    // Handle fetch errors
    if (!res.ok) {
      const errorData = await res.text();
      return NextResponse.json(
        { error: `Failed to fetch BharatPe data: ${errorData}` },
        { status: res.status }
      );
    }

    // Parse JSON response
    const data = await res.json();

    return NextResponse.json({
      success: true,
      transactions: data?.data || data || [],
    });
  } catch (error) {
    console.error("BharatPe Fetch Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching BharatPe transactions" },
      { status: 500 }
    );
  }
}
