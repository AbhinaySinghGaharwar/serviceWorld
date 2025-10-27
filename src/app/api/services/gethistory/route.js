// api/services/gethistory/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "smmpanel";
const addFundsCollection = "add_funds";

export async function GET() {
  try {
    // 🔐 Get user token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Unauthorized");

    // 🧩 Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    // 💾 Connect DB
    await client.connect();
    const db = client.db(dbName);
    const addFundsCol = db.collection(addFundsCollection);

    // 📜 Get user's transaction history
    const transactions = await addFundsCol
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();
console.log(transactions)
    // ✅ Send response
    return NextResponse.json({ success: true, transactions });
  } catch (err) {
    console.error("Get history error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } finally {
    await client.close();
  }
}
