"use client";

export default function AdminPage({
  isSuperAdmin,
  visibleAdmins,
  currentUser,
  onEdit,
  deleteAdmin,
}) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {isSuperAdmin ? "Admins" : "My Profile"}
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
            {visibleAdmins.map(admin => {
              const canEdit =
                isSuperAdmin || admin.email === currentUser.email;

              const canDelete = isSuperAdmin;

              return (
                <tr
                  key={admin._id}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1c]"
                >
                  <td className="px-4 py-3">{admin.email}</td>
                  <td className="px-4 py-3 capitalize">{admin.role}</td>
                  <td className="px-4 py-3">{admin.password}</td>

                  <td className="px-4 py-3 text-right space-x-3">
                    {canEdit && (
                      <button
                        onClick={() => onEdit(admin)}
                        className="text-gray-700 dark:text-gray-300 hover:underline"
                      >
                        Edit
                      </button>
                    )}

                    {canDelete && (
                      <form
                        action={deleteAdmin.bind(null, admin._id)}
                        className="inline"
                      >
                        <button className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
