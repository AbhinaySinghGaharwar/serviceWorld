import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "smmpanel";
const collectionName = "payment_methods";

export async function getAllPaymentMethods() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const methods = await collection.find({}).toArray();
    return methods;
  } finally {
    await client.close();
  }
}

export async function getPaymentDetails(type) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const method = await collection.findOne({ type: { $regex: `^${type}$`, $options: "i" } });
    return method;
  } finally {
    await client.close();
  }
}

export async function putPaymentDetails(type, { merchantId, token, active = true, qrBase64 }) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const updateData = {
      type,
      merchantId,
      token,
      active,
      updatedAt: new Date(),
    };

    if (qrBase64) {
      updateData.qrImage = Buffer.from(qrBase64, "base64"); 
    }

    const result = await collection.updateOne(
      { type: { $regex: `^${type}$`, $options: "i" } },
      { $set: updateData },
      { upsert: true }
    );

    return { success: true, result };
  } finally {
    await client.close();
  }
}



export async function ValidateTransactionBharatPe(internalUtr, amount) {
  try {
    const merchantId = process.env.MARCHANT_ID;
    const token = "06bc2221af4f426dab9a40a38bff5ac5";

    // ⏱️ Dynamic date range: last 7 days
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 25);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const apiUrl = `https://payments-tesseract.bharatpe.in/api/v1/merchant/transactions?module=PAYMENT_QR&merchantId=${merchantId}&sDate=${formatDate(fromDate)}&eDate=${formatDate(toDate)}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        token,
        "user-agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
      },
    });

    if (!res.ok) {
      console.log("BharatPe API Error:", await res.text());
      return null;
    }

    const data = await res.json();
    const transactions = data?.data?.transactions || [];

    // 🔍 Match UTR + Amount
    const matched = transactions.find(
      (t) =>
        t.internalUtr === internalUtr &&
        Number(t.amount) === Number(amount)
    );

    if (matched) {
      console.log("✅ BharatPe Match Found:", matched);
    } else {
      console.log("❌ No BharatPe match for UTR:", internalUtr);
    }

    return matched || null;
  } catch (error) {
    console.error("BharatPe Validation Error:", error);
    return null;
  }
}
