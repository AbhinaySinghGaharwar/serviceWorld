import clientPromise from "@/lib/mongodb"; // your existing MongoDB connection file
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // connect to MongoDB
    const client = await clientPromise;
    const db = client.db("smmpanel"); // your database name
    const tickets = await db.collection("tickets").find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
