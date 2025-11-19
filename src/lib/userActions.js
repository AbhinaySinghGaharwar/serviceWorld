'use server'
import clientPromise from "@/lib/mongodb";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { createOrder } from "./services";
import crypto from "crypto";
import { ObjectId } from "mongodb";
const dbName = "smmpanel";
const addFundsCollection = "add_funds";
const JWT_SECRET = process.env.JWT_SECRET;
// ========================= GET USER DETAILS =========================
export async function getUserDetails() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) return { error: "Not authenticated" };

    const decoded = jwt.verify(token.value, JWT_SECRET);

    const client = await clientPromise;
    const db = client.db("smmpanel");

    const user = await db
      .collection("users")
      .findOne({ email: decoded.email }, { projection: { password: 0 } });

    if (!user) return { error: "User not found" };
    return {
  success:true,
    avatar:user.avatar,
    balance:user.balance,
    email:user.email,
    username:user.username,
    frozen:user.frozen,
}
  } catch (err) {
    return { error: err.message };
  }
}
export async function getUserBalance() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) return { error: "Not authenticated" };

    const decoded = jwt.verify(token.value, JWT_SECRET);

    const client = await clientPromise;
    const db = client.db("smmpanel");

    const user = await db
      .collection("users")
      .findOne({ email: decoded.email }, { projection: { password: 0 } });

    if (!user) return { error: "User not found" };
const balance=user?.balance
    return {  balance};
  } catch (err) {
    return { error: err.message };
  }
}


// // -------------------- Upload Profile Picture --------------------
// export async function uploadProfilePicture(formData) {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return { error: "Not authenticated" };
//     }

//     // Verify token
//     let payload;
//     try {
//       payload = jwt.verify(token, JWT_SECRET);
//     } catch {
//       return { error: "Invalid token" };
//     }

//     // Get file from formData
//     const file = formData.get("image");
//     if (!file) {
//       return { error: "No file uploaded" };
//     }

//     // Convert file to buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Save file to public/uploads
//     const uploadDir = path.join(process.cwd(), "/public/uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     const fileName = `${Date.now()}_${file.name}`;
//     const filePath = path.join(uploadDir, fileName);
//     fs.writeFileSync(filePath, buffer);

//     // Save avatar URL in MongoDB
//     const client = await clientPromise;
//     const db = client.db("smmpanel");
//     const imageUrl = "/uploads/" + fileName;

//     await db.collection("users").updateOne(
//       { email: payload.email },
//       { $set: { avatar: imageUrl } }
//     );

//     return { success: true, message: "Image uploaded", avatar: imageUrl };
//   } catch (err) {
//     return { error: err.message };
//   }
// }

// // -------------------- Get Profile Picture / Details --------------------
// export async function getProfilePicture() {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return { error: "Not authenticated" };
//     }

//     // Verify token
//     let payload;
//     try {
//       payload = jwt.verify(token, JWT_SECRET);
//     } catch {
//       return { error: "Invalid token" };
//     }

//     // Fetch user data
//     const client = await clientPromise;
//     const db = client.db("smmpanel");

//     const user = await db.collection("users").findOne(
//       { email: payload.email },
//       { projection: { username: 1, email: 1, balance: 1, avatar: 1 } }
//     );

//     if (!user) return { error: "User not found" };

//     return { success: true, avatar:user.avatar };
//   } catch (err) {
//     return { error: err.message };
//   }
// }






export async function generateApiKey() {
  try {
    const client = await clientPromise;
    const db = client.db("smmpanel");
    const users = db.collection("users");
   const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) return { error: "Not authenticated" };

    const decoded = jwt.verify(token.value, JWT_SECRET);

    // Generate a secure API key
    const apiKey = "sk-" + crypto.randomBytes(24).toString("hex");

    // Update user record using email
    const result = await users.updateOne(
      { email: decoded.email },
      { $set: { apiKey, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return { success: false, error: "User not found with that email." };
    }

    return { success: true, apiKey };
  } catch (err) {
    console.error("❌ API key generation failed:", err);
    return { success: false, error: "Failed to generate API key." };
  }
}


















export async function createOrderAction(service, link, qua, paying ) {
  try {
    // 🧩 1️⃣ Get user token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized — please log in first." };
    }

    // 🧠 2️⃣ Verify JWT token
    let userData;
    try {
      userData = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return { success: false, message: "Invalid or expired token." };
    }

    // 🧱 3️⃣ Connect to DB
    const client = await clientPromise;
    const db = client.db("smmpanel");
    const usersCollection = db.collection("users");

// 👤 4️⃣ Validate user existence
const user = await usersCollection.findOne({ _id: new ObjectId(userData.id) });
    console.log(user)
    if (!user) {
      return { success: false, message: "User not found." };
    }

    // 📦 5️⃣ Extract and validate input
   
    const quantity = Number(qua);
    const charge = Number(paying);

    if (!service || !link || !quantity || quantity <= 0) {
      return {
        success: false,
        message: "Invalid input. Ensure service, link, and quantity are provided.",
      };
    }

    if (isNaN(charge) || charge <= 0) {
      return { success: false, message: "Invalid charge amount." };
    }

    // 💰 6️⃣ Check balance
    if (user.balance < charge) {
      return {
        success: false,
        message: "Insufficient balance. Please add funds to your account.",
      };
    }

    // 🧾 7️⃣ Prepare data for SMM API
    const orderData = { service, link, quantity };

    // 🌐 8️⃣ Call external API
    const response = await createOrder(orderData);
    console.log("📦 SMM API Response:", response);

    if (!response || response.error) {
      return {
        success: false,
        message: "Failed to create order on provider side.",
        providerError: response?.error || "No response from API.",
      };
    }

    // 🧮 9️⃣ Deduct balance securely
    const updatedBalance = user.balance - charge;
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { balance: updatedBalance } }
    );

    // 💾 🔟 Save order in DB
    const ordersCollection = db.collection("orders");
    const newOrder = {
      userId: user.id,
      service,
      link,
      quantity,
      charge,
      status: "confrim",
      startCount: 0,
      remains: 0,
      providerOrderId: response.order,
      createdAt: new Date(),
    };

    await ordersCollection.insertOne(newOrder);

    // 🔁 11️⃣ Revalidate order page
 revalidatePath("/user/dashboard");

    // ✅ 12️⃣ Return success
    return {
      success: true,
      message: "Order created successfully!",
      orderId: response.order,
      balanceAfter: updatedBalance,
      details: newOrder,
    };
  } catch (err) {
    console.error("❌ Error creating order:", err);

    return {
      success: false,
      message: "Internal server error. Please try again later.",
      details: err.message,
    };
  }
}















export async function getUserTransactions() {
  try {
    // 🔐 Read user token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Unauthorized");

    // 🧩 Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    // 💾 Connect DB once via shared promise
    const client = await clientPromise;
    const db = client.db(dbName);
    const addFundsCol = db.collection(addFundsCollection);

    // 📜 Fetch transactions for this user
    const transactions = await addFundsCol
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    // 🧹 Convert ObjectId and Dates for serialization
    const safeTransactions = transactions.map((t) => ({
      ...t,
      _id: t._id.toString(),
      createdAt: t.createdAt?.toISOString?.() || null,
    }));

    return { success: true, transactions: safeTransactions };
  } catch (err) {
    console.error("Get history error:", err);
    return { success: false, error: "Unauthorized" };
  }
}






























export async function uploadProfilePicture(formData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Not authenticated" };

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return { error: "Invalid token" };
    }

    const file = formData.get("image");
    if (!file) return { error: "No file uploaded" };

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Convert to base64
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    // Add MIME type prefix e.g. data:image/png;base64,...
    const mimeType = file.type;
    const imageData = `data:${mimeType};base64,${base64Image}`;

    // Save in DB
    const client = await clientPromise;
    const db = client.db("smmpanel");

    await db.collection("users").updateOne(
      { email: payload.email },
      { $set: { avatar: imageData } }
    );

    return { success: true, avatar: imageData };
  } catch (err) {
    return { error: err.message };
  }
}











export async function getProfilePicture() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Not authenticated" };

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return { error: "Invalid token" };
    }

    const client = await clientPromise;
    const db = client.db("smmpanel");

    const user = await db.collection("users").findOne(
      { email: payload.email },
      { projection: { avatar: 1 } }
    );

    if (!user) return { error: "User not found" };

    return { success: true, avatar: user.avatar };
  } catch (err) {
    return { error: err.message };
  }
}









export async function deleteProfilePicture() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Not authenticated" };

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return { error: "Invalid token" };
    }

    const client = await clientPromise;
    const db = client.db("smmpanel");

    await db.collection("users").updateOne(
      { email: payload.email },
      { $set: { avatar: null } }
    );

    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}
