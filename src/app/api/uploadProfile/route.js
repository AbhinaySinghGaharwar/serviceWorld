import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET;

// -------------------- POST: Upload profile image --------------------
export async function POST(req) {
  try {
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // Get file from formData
    const formData = await req.formData();
    const file = formData.get("image");
    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save file to public/uploads
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    // Save avatar URL in MongoDB
    const client = await clientPromise;
    const db = client.db("mydb");
    const imageUrl = "/uploads/" + fileName;

    await db.collection("users").updateOne(
      { email: payload.email }, // identify user by email from token
      { $set: { avatar: imageUrl } }
    );

    return new Response(JSON.stringify({ message: "Image uploaded", avatar: imageUrl }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// -------------------- GET: Fetch user profile --------------------
export async function GET(req) {
  try {
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // Fetch user from MongoDB
    const client = await clientPromise;
    const db = client.db("mydb");

    const user = await db.collection("users").findOne(
      { email: payload.email },
      { projection: { username: 1, email: 1, balance: 1, avatar: 1 } }
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
