export const dynamic = "force-dynamic";

import Link from "next/link";
import { getChildPanels } from "@/lib/adminServices";
import { FaCog } from "react-icons/fa";

export default async function Page() {
  const res = await getChildPanels();

  if (res.error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:text-red-400 text-lg">
        ❌ {res.error}
      </div>
    );
  }

  const panels = res.requests || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0e0e0f] p-6 text-gray-900 dark:text-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Child Panel Requests
          </h1>

          <Link
            href="/admin/settings/child-panel-settings"
            className="inline-flex items-center gap-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          >
            <FaCog /> Go to Child Panel Settings
          </Link>
        </div>

        {/* No Requests */}
        {panels.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No requests found.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#151517] shadow">
            <table className="w-full text-left border-collapse text-gray-800 dark:text-gray-300">

              {/* Table Header */}
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200">
                  <th className="p-3">Domain</th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Currency</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created At</th>
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody>
                {panels.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-3">{p.domain}</td>
                    <td className="p-3">{p.panel_username}</td>
                    <td className="p-3">{p.currency}</td>
                    <td className="p-3">{p.price}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border
                          ${
                            p.status === "pending"
                              ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600"
                              : p.status === "approved"
                              ? "bg-green-200 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-400 dark:border-green-700"
                              : "bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-400 dark:border-red-700"
                          }
                        `}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
