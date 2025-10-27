// api/services/getBalance/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);
const dbName = "smmpanel";
const usersCollection = "users";

let cachedClient = null;
async function getClient() {
  if (cachedClient) return cachedClient;
  await client.connect();
  cachedClient = client;
  return cachedClient;
}

export async function GET() {
  try {
    // 1️⃣ Get and verify JWT from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Unauthorized");

    let userEmail;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userEmail = decoded.email;
    } catch {
      throw new Error("Unauthorized");
    }

    // 2️⃣ Connect to DB
    const client = await getClient();
    const db = client.db(dbName);
    const usersCol = db.collection(usersCollection);

    // 3️⃣ Fetch user balance
    const user = await usersCol.findOne(
      { email: userEmail },
      { projection: { balance: 1 } } // fetch only balance field
    );

    if (!user) throw new Error("User not found");

    // 4️⃣ Return balance
    return NextResponse.json({
      success: true,
      balance: user.balance || 0,
    });
  } catch (err) {
    console.error("Get Balance Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Unable to fetch balance" },
      { status: 400 }
    );
  }
}
