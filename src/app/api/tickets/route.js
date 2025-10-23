//api/tickets/route.js
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Decode JWT
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const username = user.username;

    const client = await clientPromise;
    const db = client.db("serviceWorld");

    const tickets = await db
      .collection("tickets")
      .find({ username })
      .sort({ created_at: -1 })
      .toArray();

    return new Response(JSON.stringify(tickets), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Decode JWT
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const username = user.username;

    const body = await req.json();
    const { subject, message } = body;

    if (!subject || !message) {
      return new Response(JSON.stringify({ error: "Subject and message are required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("serviceWorld");

    const newTicket = {
      subject,
      message,
      username, 
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    const result = await db.collection("tickets").insertOne(newTicket);
    newTicket.id = result.insertedId;

    return new Response(JSON.stringify(newTicket), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
