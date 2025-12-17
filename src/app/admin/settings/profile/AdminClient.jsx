"use client";

import { useState } from "react";
import {
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from "@/lib/adminProfileHelper";
import AdminPage from "./AdminPage";
import SuperAdminPage from "./SuperAdminPage";
import AdminEditModal from "./AdminEditModal";
import { deleteSuperAdmin,updateSuperAdmin } from "@/lib/adminProfileHelper";
export default function AdminClient({
  admins = [],
  superAdmins = [],
  currentUser,
}) {
  
  const isSuperAdmin = currentUser?.role === "superadmin";

  const [search, setSearch] = useState("");
  const [editAdmin, setEditAdmin] = useState(null);

  const filteredAdmins = admins.filter(a =>
    a.email.toLowerCase().includes(search.toLowerCase())
    
  );

  const visibleAdmins = isSuperAdmin
    ? filteredAdmins
    : filteredAdmins.filter(a => a.email === currentUser.email);

  // 🔐 SAFE EDIT HANDLER
  const handleEdit = (admin) => {
    if (isSuperAdmin || admin.email === currentUser.email) {
      setEditAdmin(admin);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0b0c] p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white dark:bg-[#151517] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Admin Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage admins and access control
          </p>
        </div>

        {/* SEARCH */}
        {isSuperAdmin && (
          <input
            placeholder="Search admin by email..."
            className="w-full mb-5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0f0f11] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        )}

        {/* CREATE ADMIN */}
        {isSuperAdmin && (
          <form
            action={createAdmin}
            className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <input
              name="email"
              placeholder="Admin email"
              required
              className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-[#0f0f11]"
            />
            <input
              name="password"
              placeholder="Admin password"
              required
              className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-[#0f0f11]"
            />
            <button className="rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium">
              Add Admin
            </button>
          </form>
        )}

       <AdminPage
  isSuperAdmin={isSuperAdmin}
  visibleAdmins={visibleAdmins}
  currentUser={currentUser}
  onEdit={handleEdit}
  deleteAdmin={isSuperAdmin ? deleteAdmin : null}
/>

    
<SuperAdminPage
  isSuperAdmin={isSuperAdmin}
  superAdmins={superAdmins}
  updateSuperAdmin={updateSuperAdmin}
  deleteSuperAdmin={deleteSuperAdmin}
/>

        {editAdmin && (
          <AdminEditModal
            updateAdmin={updateAdmin}
            editAdmin={editAdmin}
            setEditAdmin={setEditAdmin}
          />
        )}
      </div>
    </div>
  );
}
