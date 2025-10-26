import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { ticketId, message } = await req.json();

    if (!ticketId || !message)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("smmpanel");
    const tickets = db.collection("tickets");

    const reply = { type: "admin", message, created_at: new Date().toISOString() };

    const result = await tickets.findOneAndUpdate(
      { _id: new ObjectId(ticketId) }, // convert string to ObjectId
      { $push: { replies: reply }, $set: { status: "answered", updatedAt: new Date() } },
      { returnDocument: "after" }
    );
console.log(result)
    if (!result&&!result.value)
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

    return NextResponse.json({ success: true, reply: reply });
  } catch (err) {
    console.error("Admin reply error:", err);
    return NextResponse.json({ error: "Failed to reply" }, { status: 500 });
  }
}
