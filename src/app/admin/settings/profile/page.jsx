import { Admin, SuperAdmin } from "@/lib/adminProfile";
import AdminClient from "./AdminClient";
import { getCurrentUser } from "@/lib/adminProfileHelper";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  let admins = [];
  let superAdmins = [];

  if (currentUser.role === "superadmin") {
    // 👑 superadmin sees everything
    admins = await Admin.getAll();
    superAdmins = await SuperAdmin.getAll();
    
  } else {
    // 👤 admin sees only himself
    const me = await Admin.getById(currentUser.id);
    admins = me ? [me] : [];
  }

  const safeAdmins = admins.map(a => ({
    ...a,
    _id: a._id.toString(),
  }));

  const safeSuperAdmins = superAdmins.map(a => ({
    ...a,
    _id: a._id.toString(),
  }));
 
console.log(safeSuperAdmins,'parent page')
  return (
    <AdminClient
      admins={safeAdmins}
      superAdmins={safeSuperAdmins}
      currentUser={currentUser}
    />
  );
}
