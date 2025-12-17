"use server";

import { Admin, SuperAdmin } from "./adminProfile";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

/* ---------- AUTH ---------- */
async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

/* ---------- CREATE ADMIN ---------- */
export async function createAdmin(formData) {
  const user = await getAuthUser();
  if (user?.role !== "superadmin") {
    throw new Error("Unauthorized");
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) return;

  await Admin.create({ email, password });
  revalidatePath("/admin");
}

/* ---------- DELETE ADMIN ---------- */
export async function deleteAdmin(id) {
  const user = await getAuthUser();
  if (user?.role !== "superadmin") {
    throw new Error("Unauthorized");
  }

  await Admin.delete(id);
  revalidatePath("/admin");
}

/* ---------- UPDATE ADMIN ---------- */
export async function updateAdmin(id, formData) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  const email = formData.get("email");
  const password = formData.get("password");

  // admin can update ONLY himself
  if (user.role === "admin" && user.id !== id) {
    throw new Error("Admins can only update themselves");
  }

  const updateData = {
    ...(email && { email }),
    ...(password && { password }),
  };

  await Admin.update(id, updateData);
  revalidatePath("/admin");
}

/* ---------- SUPER ADMIN ACTIONS ---------- */
export async function updateSuperAdmin(id, formData) {
  const user = await getAuthUser();
  if (user?.role !== "superadmin") {
    throw new Error("Unauthorized");
  }

  const email = formData.get("email");
  const password = formData.get("password");

  await SuperAdmin.update(id, {
    ...(email && { email }),
    ...(password && { password }),
  });

  revalidatePath("/admin");
}

export async function deleteSuperAdmin(id) {
  const user = await getAuthUser();
  if (user?.role !== "superadmin") {
    throw new Error("Unauthorized");
  }

  // optional: prevent self-delete
  if (user.id === id) {
    throw new Error("You cannot delete yourself");
  }

  await SuperAdmin.delete(id);
  revalidatePath("/admin");
}
/* CURRENT USER */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}