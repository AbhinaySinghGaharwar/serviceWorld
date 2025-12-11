"use server";


import { paytmConfig } from "../../config/paytm.config";
"use strict";

import crypto from "crypto";

class PaytmChecksum {
  static iv = "@@@@&&&&####$$$$";

  static encrypt(input, key) {
    const cipher = crypto.createCipheriv("AES-128-CBC", key, PaytmChecksum.iv);
    let encrypted = cipher.update(input, "binary", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }

  static decrypt(encrypted, key) {
    const decipher = crypto.createDecipheriv("AES-128-CBC", key, PaytmChecksum.iv);
    let decrypted = decipher.update(encrypted, "base64", "binary");
    try {
      decrypted += decipher.final("binary");
    } catch (e) {
      console.log("Decrypt error:", e);
    }
    return decrypted;
  }

  static generateSignature(params, key) {
    if (typeof params !== "object" && typeof params !== "string") {
      return Promise.reject("String or object expected");
    }

    if (typeof params !== "string") {
      params = PaytmChecksum.getStringByParams(params);
    }

    return PaytmChecksum.generateSignatureByString(params, key);
  }

  static verifySignature(params, key, checksum) {
    if (typeof params !== "object" && typeof params !== "string") {
      return Promise.reject("String or object expected");
    }

    if (params.hasOwnProperty("CHECKSUMHASH")) {
      delete params.CHECKSUMHASH;
    }

    if (typeof params !== "string") {
      params = PaytmChecksum.getStringByParams(params);
    }

    return PaytmChecksum.verifySignatureByString(params, key, checksum);
  }

  static async generateSignatureByString(params, key) {
    const salt = await PaytmChecksum.generateRandomString(4);
    return PaytmChecksum.calculateChecksum(params, key, salt);
  }

  static verifySignatureByString(params, key, checksum) {
    const paytm_hash = PaytmChecksum.decrypt(checksum, key);
    const salt = paytm_hash.slice(paytm_hash.length - 4);
    return paytm_hash === PaytmChecksum.calculateHash(params, salt);
  }

  static generateRandomString(length) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes((length * 3) / 4, (err, buf) => {
        if (!err) {
          resolve(buf.toString("base64"));
        } else {
          reject(err);
        }
      });
    });
  }

  static getStringByParams(params) {
    const sorted = {};

    Object.keys(params)
      .sort()
      .forEach((key) => {
        sorted[key] =
          params[key] !== null &&
          params[key].toString().toLowerCase() !== "null"
            ? params[key]
            : "";
      });

    return Object.values(sorted).join("|");
  }

  static calculateHash(params, salt) {
    const finalString = params + "|" + salt;
    return crypto.createHash("sha256").update(finalString).digest("hex") + salt;
  }

  static calculateChecksum(params, key, salt) {
    const hashString = PaytmChecksum.calculateHash(params, salt);
    return PaytmChecksum.encrypt(hashString, key);
  }
}

export default PaytmChecksum;

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
