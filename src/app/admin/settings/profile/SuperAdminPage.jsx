"use client";

import { useState, useTransition } from "react";

export default function SuperAdminPage({
  isSuperAdmin,
  superAdmins,
  updateSuperAdmin,   // ✅ server action
  deleteSuperAdmin,   // ✅ server action
}) {
    console.log(superAdmins)
  const [editSA, setEditSA] = useState(null);
  const [isPending, startTransition] = useTransition();

  if (!isSuperAdmin) return null;

  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Super Admins
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-[#1b1b1d]">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Password</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {superAdmins.map(sa => (
              <tr
                key={sa._id}
                className="border-t border-gray-200 dark:border-gray-800"
              >
                <td className="px-4 py-3">{sa.email}</td>
                <td className="px-4 py-3 text-gray-500">superadmin</td>
                <td className="px-4 py-3 text-gray-500">{sa.password}</td>

                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() => {
                        setEditSA(sa)
                        console.log(sa)
                    }}
                    className="text-gray-700 hover:underline"
                  >
                    Edit
                  </button>

                  <form
                    action={deleteSuperAdmin.bind(null, sa._id)}
                    className="inline"
                  >
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}

            {superAdmins.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No super admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editSA && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              startTransition(() =>
                updateSuperAdmin(editSA._id, formData)
              )
            }
            className="w-80 rounded-xl bg-white dark:bg-[#151517] border border-gray-200 dark:border-gray-800 p-5 space-y-4 shadow-lg"
          >
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Edit Super Admin
            </h2>

            <label className="text-sm font-semibold">Email</label>
            <input
              name="email"
              defaultValue={editSA.email}
              disabled={isPending}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />

            <label className="text-sm font-semibold">Password</label>
            <input
              name="password"
              defaultValue={editSA.password}
              disabled={isPending}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditSA(null)}
                disabled={isPending}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                className="text-sm font-medium disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
