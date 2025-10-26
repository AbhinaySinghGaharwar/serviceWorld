// api/tickets/[id]/reply/route.js
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  try {
    const { id } = params;

    if (!id) return new Response(JSON.stringify({ error: "Ticket ID required" }), { status: 400 });

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const username = user.username;

    const { message } = await req.json();
    if (!message) return new Response(JSON.stringify({ error: "Message required" }), { status: 400 });

    let ticketId;
    try {
      ticketId = new ObjectId(id);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid ticket ID" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("smmpanel");
    const tickets = db.collection("tickets");

    const reply = {
      type: "user",
      message,
      created_at: new Date().toISOString(),
    };

    const result = await tickets.findOneAndUpdate(
      { _id: ticketId, username },
      {
        $push: { replies: reply },
        $set: { status: "Pending", updatedAt: new Date() },
      },
      { returnDocument: "after" }
    );
console.log(result)
    if (!result&&!result.value) return new Response(JSON.stringify({ error: "Ticket not found" }), { status: 404 });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
