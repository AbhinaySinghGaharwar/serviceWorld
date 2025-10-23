import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const username = user.username;

    const { id } = params;
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Reply message is required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("serviceWorld");

    const result = await db.collection("tickets").findOneAndUpdate(
      { _id: new ObjectId(id), username },
      {
        $push: {
          replies: { message, created_at: new Date().toISOString() },
        },
      },
      { returnDocument: "after" } // return updated document
    );

    // 🔧 Handle both possible response formats
    const updatedTicket = result?.value || result;

    if (!updatedTicket) {
      return new Response(JSON.stringify({ error: "Ticket not found" }), { status: 404 });
    }

    const ticket = { ...updatedTicket, id: updatedTicket._id };
    delete ticket._id;

    return new Response(JSON.stringify(ticket), { status: 200 });
  } catch (err) {
    console.error("Error in reply route:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
