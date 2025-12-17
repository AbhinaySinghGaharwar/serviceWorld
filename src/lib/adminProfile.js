
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

const DB_ADMIN = "smmadmin";
const SUPER_ADMIN_COLLECTION = "superadmin";
const ADMIN_COLLECTION = "admin";

/* ---------- GENERIC ---------- */
async function getCollection(name) {
  const client = await clientPromise;
  return client.db(DB_ADMIN).collection(name);
}

/* ---------- CREATE ---------- */
export async function createUser(collection, data) {
  if (!data.role) throw new Error("Role is required");

  const col = await getCollection(collection);
  return col.insertOne({
    ...data,
    createdAt: new Date(),
  });
}

/* ---------- READ ---------- */
export async function getUsers(collection) {
  const col = await getCollection(collection);

  return col.find({}).toArray();
}

export async function getUserById(collection, id) {
  const col = await getCollection(collection);
  return col.findOne({ _id: new ObjectId(id) });
}

/* ---------- UPDATE ---------- */
export async function updateUser(collection, id, data) {
  const col = await getCollection(collection);

  return col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  );
}

/* ---------- DELETE ---------- */
export async function deleteUser(collection, id) {
  const col = await getCollection(collection);
  return col.deleteOne({ _id: new ObjectId(id) });
}

/* ---------- HELPERS ---------- */
export const SuperAdmin = {
  create: (data) =>
    createUser(SUPER_ADMIN_COLLECTION, {
      ...data,
      role: "superadmin",
    }),
  getAll: () => getUsers(SUPER_ADMIN_COLLECTION),
  update: (id, data) =>
    updateUser(SUPER_ADMIN_COLLECTION, id, data),
  delete: (id) =>
    deleteUser(SUPER_ADMIN_COLLECTION, id),
};

export const Admin = {
  create: (data) =>
    createUser(ADMIN_COLLECTION, {
      ...data,
      role: "admin",
    }),
  getAll: () => getUsers(ADMIN_COLLECTION),
  update: (id, data) =>
    updateUser(ADMIN_COLLECTION, id, data),
  delete: (id) =>
    deleteUser(ADMIN_COLLECTION, id),
};
