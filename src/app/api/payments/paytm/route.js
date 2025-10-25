// app/api/paytm/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

// ENV variables
const MERCHANT_ID = process.env.PAYTM_MERCHANT_ID;
const MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
const CALLBACK_URL = process.env.PAYTM_CALLBACK_URL;

// AES Encryption / Decryption (PHP AES-128-CBC)
function encrypt(text, key) {
  const iv = "@@@@&&&&####$$$$";
  const cipher = crypto.createCipheriv("aes-128-cbc", Buffer.from(key, "utf8"), iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

function decrypt(text, key) {
  const iv = "@@@@&&&&####$$$$";
  const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from(key, "utf8"), iv);
  let decrypted = decipher.update(text, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Generate 4-character salt
function generateSalt(length = 4) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < length; i++) salt += chars[Math.floor(Math.random() * chars.length)];
  return salt;
}

// Convert array/object to string for checksum
function getArrayStr(array) {
  return Object.values(array)
    .filter((v) => v != null && v !== "")
    .join("|");
}

// Generate PayTM checksum from object
function getChecksum(params, key) {
  const str = getArrayStr(params);
  const salt = generateSalt(4);
  const hash = crypto.createHash("sha256").update(str + "|" + salt).digest("hex");
  const hashString = hash + salt;
  return encrypt(hashString, key);
}

// Verify checksum
function verifyChecksum(params, key, checksum) {
  const str = getArrayStr(params);
  const decrypted = decrypt(checksum, key);
  const salt = decrypted.slice(-4);
  const hash = crypto.createHash("sha256").update(str + "|" + salt).digest("hex");
  return decrypted === hash + salt;
}

// Initiate PayTM transaction
async function initiateTransaction(amount, clientId, email) {
  const orderId = crypto.randomUUID(); // unique order ID
  const paramList = {
    MID: MERCHANT_ID,
    ORDER_ID: orderId,
    CUST_ID: clientId,
    EMAIL: email || "user@user.com",
    INDUSTRY_TYPE_ID: "Retail",
    CHANNEL_ID: "WEB",
    TXN_AMOUNT: amount.toFixed(2),
    WEBSITE: "DEFAULT",
    CALLBACK_URL,
  };

  const checksum = getChecksum(paramList, MERCHANT_KEY);
  paramList.CHECKSUMHASH = checksum;

  return {
    paymentUrl: "https://securegw.paytm.in/theia/processTransaction",
    paramList,
  };
}

// Check PayTM transaction status
async function checkTransactionStatus(orderId) {
  const requestParams = {
    MID: MERCHANT_ID,
    ORDERID: orderId,
  };

  const response = await fetch("https://securegw.paytm.in/merchant-status/getTxnStatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ JsonData: JSON.stringify(requestParams) }),
  });

  const data = await response.json();
  return data;
}

// Next.js API route
export async function POST(req) {
  try {
    const { type, amount, clientId, email, orderId } = await req.json();

    if (type === "initiate") {
      const result = await initiateTransaction(amount, clientId, email);
      return NextResponse.json({ success: true, ...result });
    } else if (type === "verify") {
      if (!orderId) return NextResponse.json({ success: false, message: "Order ID required" });
      const result = await checkTransactionStatus(orderId);
      return NextResponse.json({ success: true, status: result });
    } else {
      return NextResponse.json({ success: false, message: "Invalid type" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
