'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FaCog } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { updateChildPanelStatus } from "@/lib/adminServices"; // ✅ update function

export default function ClientPage({ panels }) {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [currentPanel, setCurrentPanel] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const openStatusModal = (panel) => {
    setCurrentPanel(panel);
    setSelectedStatus(panel.status);
    setStatusModalOpen(true);
  };

  const saveStatus = async () => {
    if (!currentPanel) return;

    const panelToUpdate = { _id: currentPanel._id, status: selectedStatus };
    const res = await updateChildPanelStatus(panelToUpdate);

    if (res.error) return alert("❌ " + res.error);

    alert(res.message); // ✅ alert only

    // ✅ update UI locally only
    currentPanel.status = selectedStatus;
    setStatusModalOpen(false);
  };

  return (
    <>
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

          {/* Table */}
          {panels.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No requests found.</p>
          ) : (
            <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#151517] shadow">
              <table className="w-full text-left border-collapse text-gray-800 dark:text-gray-300">

                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200">
                    <th className="p-3">Domain</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Password</th>
                    <th className="p-3">Currency</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Created At</th>
                    <th className="p-3">Renew After 1 Month</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {panels.map((p, idx) => {
                    const createdAt = new Date(p.createdAt);

                    // ✅ FIXED: calculate renew from createdAt
                    const renewAt = new Date(p.createdAt);
                    renewAt.setMonth(renewAt.getMonth() + 1);

                    return (
                      <tr
                        key={p._id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <td className="p-3">{p.domain}</td>
                        <td className="p-3">{p.panel_username}</td>
                        <td className="p-3">{p.panel_password}</td>
                        <td className="p-3">{p.currency}</td>
                        <td className="p-3">{p.price}</td>

                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              p.status === "pending"
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600"
                                : p.status === "approved"
                                ? "bg-green-200 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-400 dark:border-green-700"
                                : "bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-400 dark:border-gray-700"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>

                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                          {createdAt.toLocaleString()}
                        </td>

                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                          {renewAt.toLocaleString()}
                        </td>

                        {/* ✅ FIXED: 3 dots opens inline modal */}
                        <td className="p-3 text-center">
                          <button onClick={() => openStatusModal(p)}>
                            <BsThreeDotsVertical size={14} className="opacity-70 cursor-pointer" />
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>

      {/* ✅ FIXED INLINE MODAL */}
      {statusModalOpen && currentPanel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white dark:bg-[#1A1C1F] border border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-sm p-5 relative animate-fadeIn">

            <button
              onClick={() => setStatusModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-300"
            >
              <FaTimes size={16} />
            </button>

            <h2 className="text-lg font-bold mb-4 text-center">
              Update Status for {currentPanel.domain}
            </h2>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E1F23] outline-none text-sm dark:text-white"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* ✅ FIXED: Save button calls function (no params required) */}
            <button onClick={saveStatus} className="mt-4 w-full py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 text-sm">
              Save Status
            </button>

          </div>
        </div>
      )}
    </>
  );
}
