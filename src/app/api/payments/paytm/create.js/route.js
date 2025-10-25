import crypto from "crypto";

let tempPayments = {}; // Temporary in-memory storage

export default function handler(req, res) {
  if (req.method === "POST") {
    const { clientId, email, amount } = req.body;

    if (!clientId || !amount) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    // Simulate PayTM order ID
    const orderId = crypto.createHash("md5").update(Math.random().toString() + Date.now()).digest("hex");

    // Create params as PayTM expects
    const paramList = {
      MID: process.env.PAYTM_MID || "YourMerchantID",
      ORDER_ID: orderId,
      CUST_ID: clientId,
      EMAIL: email || "user@user.com",
      INDUSTRY_TYPE_ID: "Retail",
      CHANNEL_ID: "WEB",
      TXN_AMOUNT: parseFloat(amount).toFixed(2),
      WEBSITE: "DEFAULT",
      CALLBACK_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paytm/verify`,
    };

    // Simulate checksum (normally generated using merchant key)
    const checkSum = crypto.createHash("md5").update(JSON.stringify(paramList) + (process.env.PAYTM_MERCHANT_KEY || "key")).digest("hex");

    // Store order in tempPayments
    tempPayments[orderId] = { clientId, amount, status: "PENDING" };

    // Return checkout URL and data
    const checkoutURL = "https://securegw.paytm.in/theia/processTransaction";

    res.status(200).json({
      success: true,
      message: "PayTM payment initiated",
      data: {
        checkoutURL,
        orderId,
        paramList,
        checkSum,
      },
    });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
