import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyCaptcha } from "@/lib/recaptha";
import { cookies } from "next/headers";

// in-memory rate limiter
const rateLimitMap = new Map();
const WINDOW_TIME = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return false;
  }
  const data = rateLimitMap.get(ip);
  if (now - data.startTime > WINDOW_TIME) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return false;
  }
  if (data.count >= MAX_REQUESTS) return true;
  data.count += 1;
  rateLimitMap.set(ip, data);
  return false;
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  if (checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests, try again later." }), { status: 429 });
  }

  const { email, username, password, captcha } = await req.json();

  if (!email || !username || !password || !captcha) {
    return new Response(JSON.stringify({ error: "Missing fields or CAPTCHA" }), { status: 400 });
  }

  const isHuman = await verifyCaptcha(captcha);
  if (!isHuman) return new Response(JSON.stringify({ error: "CAPTCHA verification failed" }), { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db("mydb");

    // Check if user/email exists
    const existingUser = await db.collection("users").findOne({ $or: [{ email }, { username }] });
    if (existingUser) return new Response(JSON.stringify({ error: "User or email already exists" }), { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };
    await db.collection("users").insertOne(user);

    // Generate JWT
    const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set cookie
    const response = new Response(JSON.stringify({ message: "User created" }), { status: 201 });
    (await cookies()).set("token", token, { req, res: response, httpOnly: true, maxAge: 7 * 24 * 60 * 60 });

    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
