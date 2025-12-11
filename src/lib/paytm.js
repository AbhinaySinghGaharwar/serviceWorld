"use server";

import PaytmChecksum from "./paytmChecksum";
import { paytmConfig } from "../../config/paytm.config";

export async function createPaytmOrder({ orderId, amount, customerId }) {
  try {
    const body = {
      requestType: "Payment",
      mid: paytmConfig.mid,
      websiteName: paytmConfig.website,
      orderId,
      callbackUrl: paytmConfig.callbackUrl,
      txnAmount: {
        value: amount,
        currency: "INR",
      },
      userInfo: {
        custId: customerId,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(body),
      paytmConfig.key
    );

    return {
      success: true,
      paytmPayload: {
        body,
        head: { signature: checksum },
      },
      transactionURL: paytmConfig.transactionURL,
    };

  } catch (err) {
    console.error("Paytm Order Error:", err);
    return { success: false, error: err.message };
  }
}
