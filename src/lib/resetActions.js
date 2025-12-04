"use server";

import jwt from "jsonwebtoken";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

// 1️⃣ Verify token from reset link
export async function verifyTokenAction(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, userId: decoded.userId };
  } catch {
    return { valid: false };
  }
}

// 2️⃣ Update password
export async function updatePasswordAction(token, newPassword) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const client = await clientPromise;
    const db = client.db("smmpanel");

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.collection("users").updateOne(
      { _id: new ObjectId(decoded.userId) },
      { $set: { password: hashed } }
    );

    return { success: true, message: "Password updated successfully!" };
  } catch {
    return { success: false, message: "Invalid or expired link" };
  }
}
