import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET; // Set your JWT secret in .env

export async function POST(req) {
  try {
    const body = await req.json();
    const { service, link, quantity, charge } = body;

    // Basic validation
    if (!service || !link || !quantity || !charge) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value; // assumes cookie name is "token"

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Verify JWT
    let userData;
    try {
      userData = jwt.verify(token, JWT_SECRET); // decoded payload
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
console.log(userData)
    // userData should contain email/username if your JWT was signed with it
    const userEmail = userData.email || null;
    const username = userData.username || null;

    const client = await clientPromise;
    const db = client.db("serviceWorld");
    const orders = db.collection("orders");

    const result = await orders.insertOne({
      service,
      link,
      quantity: parseInt(quantity, 10),
      charge: parseFloat(charge),
      userEmail,
      username,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Order created", orderId: result.insertedId }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}



export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("serviceWorld");
    const ordersCollection = db.collection("orders");

    // Optional: You can fetch only the logged-in user's orders
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    let query = {};
    if (token) {
      // If token exists, fetch only user's orders
      const jwt = require("jsonwebtoken");
      const JWT_SECRET = process.env.JWT_SECRET;
      try {
        const userData = jwt.verify(token, JWT_SECRET);
        query = { $or: [{ userEmail: userData.email }, { username: userData.username }] };
      } catch (err) {
        // invalid token, ignore user filter
      }
    }

    // Fetch orders, sorted by newest first
    const orders = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Format data for frontend
    const formattedOrders = orders.map((o) => ({
      _id: o._id.toString(),
      createdAt: o.createdAt,
      service: o.service,
      serviceName: o.serviceName || o.service, // fallback if name not stored
      link: o.link,
      quantity: o.quantity,
      charge: o.charge,
      status: o.status || "Pending",
      startCount: o.startCount || 0,
      remains: o.remains || o.quantity,
      username: o.username || null,
      userEmail: o.userEmail || null,
    }));

    return new Response(JSON.stringify(formattedOrders), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
