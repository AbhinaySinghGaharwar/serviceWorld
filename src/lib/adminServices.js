'use server'
import clientPromise from "./mongodb";

export async function getAdminByEmail(email) {
  const client = await clientPromise;
  const db = client.db("smmadmin");
  return await db.collection("admins").findOne({ email });
}

export async function getAllUsers() {
  try {
    const client = await clientPromise;
    const db = client.db("smmpanel");
    const users = await db.collection("users").find().toArray();
    
   const plainUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(), 
    }));
   
    return{
plainUsers,
success:true,
    } 
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return{
        error:error,
        success:false
    };
  }
}
export async function getUserById(id) {
  if (!id) {
    return {
      success: false,
      error: "User ID is required",
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db("smmpanel");
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // convert MongoDB _id to string
    const plainUser = { ...user, _id: user._id.toString() };

    return {
      success: true,
      user: plainUser,
    };
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    return {
      success: false,
      error: "Server error",
    };
  }
}