"use server";

import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { verifyCaptcha } from "@/lib/recaptha";

// =========================
// RATE LIMIT CONFIGURATION
// =========================
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

// =========================
// USER SIGNUP
// =========================
export async function registerUser({ email, username, password, captcha, ip = "127.0.0.1" }) {
  try {
    if (checkRateLimit(ip)) {
      return { error: "Too many requests, try again later." };
    }

    if (!email || !username || !password || !captcha) {
      return { error: "Missing fields or CAPTCHA" };
    }

    const isHuman = await verifyCaptcha(captcha);
    if (!isHuman) return { error: "CAPTCHA verification failed" };

    const client = await clientPromise;
    const db = client.db("smmpanel");

    const existingUser = await db.collection("users").findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) return { error: "User or email already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };
    await db.collection("users").insertOne(user);

    // Generate JWT
    const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    });

    return { message: "User registered successfully" };
  } catch (err) {
    return { error: err.message };
  }
}

// =========================
// USER LOGIN
// =========================
export async function loginUser({ email, password, captcha, ip = "127.0.0.1" }) {
  try {
    if (checkRateLimit(ip)) {
      return { error: "Too many requests, try again later." };
    }

    if (!email || !password || !captcha)
      return { error: "Missing fields or CAPTCHA" };

    const isHuman = await verifyCaptcha(captcha);
    if (!isHuman) return { error: "CAPTCHA verification failed" };

    const client = await clientPromise;
    const db = client.db("smmpanel");

    const user = await db.collection("users").findOne({ email });
    if (!user) return { error: "Invalid credentials" };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return { error: "Invalid credentials" };

    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    });

    return { message: "Login successful" };
  } catch (err) {
    return { error: err.message };
  }
}

// =========================
// LOGOUT USER
// =========================
export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { message: "Logged out successfully" };
  } catch (err) {
    return { error: err.message };
  }
}

// =========================
// GET USER DETAILS
// =========================
export async function getUserDetails() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) return { error: "Not authenticated" };

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

    const client = await clientPromise;
    const db = client.db("smmpanel");

    const user = await db
      .collection("users")
      .findOne({ email: decoded.email }, { projection: { password: 0 } });

    if (!user) return { error: "User not found" };

    return { user };
  } catch (err) {
    return { error: err.message };
  }
}

// =========================
// CHECK USERNAME
// =========================
export async function checkUsername(username) {
  try {
    const client = await clientPromise;
    const db = client.db("smmpanel");
    const user = await db.collection("users").findOne({ username });
    return { exists: !!user };
  } catch (err) {
    return { error: err.message };
  }
}

// =========================
// CHECK EMAIL
// =========================
export async function checkEmail(email) {
  try {
    const client = await clientPromise;
    const db = client.db("smmpanel");
    const user = await db.collection("users").findOne({ email });
    return { exists: !!user };
  } catch (err) {
    return { error: err.message };
  }
}
