"use client";

import { useTransition } from "react";

export default function AdminEditModal({
  updateAdmin,
  editAdmin,
  setEditAdmin,
}) {
  const [isPending, startTransition] = useTransition();

  if (!editAdmin) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        action={(formData) =>
          startTransition(() =>
            updateAdmin(editAdmin._id, formData)
          )
        }
        className="w-80 rounded-xl bg-white dark:bg-[#151517] border border-gray-200 dark:border-gray-800 p-5 space-y-4 shadow-lg"
      >
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Edit Admin
        </h2>

        {/* EMAIL */}
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Admin Email
        </label>
        <input
          name="email"
          defaultValue={editAdmin.email}
          disabled={isPending}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-[#0f0f11]"
        />

        {/* PASSWORD */}
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Admin Password
        </label>
        <input
          name="password"
          defaultValue={editAdmin.password}
          disabled={isPending}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-[#0f0f11]"
        />

        {/* ROLE DROPDOWN */}
        {/* <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Role
        </label>
        <select
          name="role"
          defaultValue={editAdmin.role}
          disabled={isPending}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-[#0f0f11]"
        >
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select> */}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setEditAdmin(null)}
            disabled={isPending}
            className="text-sm text-gray-500 hover:underline disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            className="text-sm font-medium text-gray-900 dark:text-gray-100 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
