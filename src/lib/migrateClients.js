"use server";

import fs from "fs";
import path from "path";
import clientPromise from "@/lib/mongodb";

export async function migrateClients() {
  const filePath = path.join(process.cwd(), "data", "clients.sql");
  const sql = fs.readFileSync(filePath, "utf8");

  // ✅ Match ALL value rows safely
  const rowRegex = /\(([^()]+)\)/g;
  const rows = [...sql.matchAll(rowRegex)];

  const mongo = await clientPromise;
  const db = mongo.db("smmpanel");
  const users = db.collection("users");

  let inserted = 0;
  let skipped = 0;

  for (const match of rows) {
    const cols = match[1]
      .split(/,(?=(?:[^']*'[^']*')*[^']*$)/)
      .map(v =>
        v.trim() === "NULL" ? null : v.replace(/^'|'$/g, "").trim()
      );

    const email = cols[2];
    if (!email) continue;

    const exists = await users.findOne({ email });
    if (exists) {
      skipped++;
      continue;
    }

    await users.insertOne({
      legacyId: Number(cols[0]),
      name: cols[1],
      email,
      username: cols[3],
      password: cols[5],
      mobile: cols[6],

      balance: Number(cols[7] || 0),
      spent: Number(cols[8] || 0),

      apiKey: cols[14],
      role: cols[4] === "1" ? "admin" : "user",

      language: cols[19] || "en",
      timezone: Number(cols[20] || 0),
      currency: cols[21] || "INR",

      discount: Number(cols[28] || 0),

      frozen: false,
      forcePasswordReset: true,

      createdAt: cols[11] ? new Date(cols[11]) : new Date(),
      lastLogin: cols[12] ? new Date(cols[12]) : null,
      lastLoginIp: cols[13],

      migratedFrom: "sql-file",
    });

    inserted++;
  }

  return {
    success: true,
    inserted,
    skipped,
    total: rows.length,
  };
}

export async function deleteAllUsers() {
  const mongo = await clientPromise;
  const db = mongo.db("smmpanel");

  const result = await db.collection("users").deleteMany({});

  return {
    success: true,
    deletedCount: result.deletedCount,
  };
}

