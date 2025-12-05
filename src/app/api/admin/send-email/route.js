// app/api/admin/send-email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const DB_ADMIN = "smmadmin";

export async function POST(req) {
  try {
  

  

    // ============================
    // 2️⃣ Read body
    // ============================
    const { mode, userIds = [], email, subject, message } = await req.json();

    if (!subject || !message)
      return NextResponse.json({ message: "Subject and message required." }, { status: 400 });

    const client = await clientPromise;
    const userDb = client.db("smmpanel");
    const users = userDb.collection("users");

    // ============================
    // 3️⃣ Load SMTP Config From DB
    // ============================
    const admindb = client.db(DB_ADMIN);
    const smtp = await admindb.collection("smtp_config").findOne({});

    if (!smtp)
      return NextResponse.json({ message: "SMTP not configured in DB" }, { status: 500 });

    if (!smtp.host || !smtp.port || !smtp.user || !smtp.pass || !smtp.fromEmail)
      return NextResponse.json({ message: "Invalid SMTP config in DB" }, { status: 400 });

    // ============================
    // 4️⃣ Build recipient list
    // ============================
    let recipients = [];

    if (mode === "all") {
      const all = await users
        .find({ email: { $exists: true, $ne: "" } }, { projection: { email: 1 } })
        .toArray();

      recipients = all.map(u => u.email);
    }

    else if (mode === "selected") {
      const validIds = userIds.filter(Boolean);

      const mongoIds = validIds
        .filter(v => /^[0-9a-fA-F]{24}$/.test(v))
        .map(id => new ObjectId(id));

      const emailList = validIds.filter(v => !/^[0-9a-fA-F]{24}$/.test(v));

      const query = [];
      if (mongoIds.length) query.push({ _id: { $in: mongoIds } });
      if (emailList.length) query.push({ email: { $in: emailList } });

      const docs = await users
        .find({ $or: query }, { projection: { email: 1 } })
        .toArray();

      recipients = docs.map(d => d.email);
    }

    else if (mode === "single") {
      if (!email)
        return NextResponse.json({ message: "Recipient email required." }, { status: 400 });

      recipients = [String(email).trim()];
    }

    else {
      return NextResponse.json({ message: "Invalid mode." }, { status: 400 });
    }

    recipients = [...new Set(recipients.map(e => e.trim()))];

    if (!recipients.length)
      return NextResponse.json({ message: "No recipient emails found." }, { status: 400 });

    // ============================
    // 5️⃣ CREATE TRANSPORTER
    // ============================
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port),
      secure: Number(smtp.port) === 465,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    const fromAddress = `"${smtp.fromName || smtp.fromEmail}" <${smtp.fromEmail}>`;

    // ============================
    // 6️⃣ SEND EMAILS
    // ============================
    const results = [];

    for (const r of recipients) {
      try {
        const info = await transporter.sendMail({
          from: fromAddress,
          to: r,
          subject,
          html: message,
          text: message.replace(/<\/?[^>]+(>|$)/g, ""),
        });

        results.push({ to: r, success: true, info });
      } catch (err) {
        results.push({ to: r, success: false, error: err.message });
      }
    }

    const sent = results.filter(r => r.success).length;
    const failed = results.length - sent;

    // ============================
    // 7️⃣ LOG ACTIVITY
    // ============================
    await userDb.collection("admin_email_logs").insertOne({
    
      subject,
      message,
      mode,
      recipientsCount: recipients.length,
      sent,
      failed,
      details: results.slice(0, 30),
      createdAt: new Date(),
    });

    // ============================
    // 8️⃣ RETURN RESPONSE
    // ============================
    return NextResponse.json({
      message: "Emails processed successfully",
      recipients: recipients.length,
      sent,
      failed,
    });

  } catch (err) {
    console.error("send-email API error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
