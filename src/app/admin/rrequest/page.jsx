"use client";

import { useEffect, useState } from "react";
import { updateWithdrawStatus, getAllWithdrawRequests } from "@/lib/adminServices";

export default function AdminWithdrawTable() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const [tempStatus, setTempStatus] = useState({});

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 2500);
  };

  // Load all withdrawal requests
  useEffect(() => {
    async function loadData() {
      const res = await getAllWithdrawRequests();

      if (res.success) {
        setRequests(res.withdrawals);
        setFiltered(res.withdrawals);

        const map = {};
        res.withdrawals.forEach((r) => (map[r.id] = r.status));
        setTempStatus(map);
      } else {
        showMessage(res.message || "Failed to load requests", "error");
      }

      setLoading(false);
    }
    loadData();
  }, []);

  // SEARCH FILTER
  useEffect(() => {
    const term = search.toLowerCase();

    const filteredData = requests.filter(
      (req) =>
        req.userEmail?.toLowerCase().includes(term) ||
        req.userid?.toString().includes(term) ||
        req.status?.toLowerCase().includes(term) ||
        String(req.amount).includes(term)
    );

    setFiltered(filteredData);
  }, [search, requests]);

  const handleUpdateClick = async (id) => {
    const newStatus = tempStatus[id];
    setUpdatingId(id);

    const res = await updateWithdrawStatus(id, newStatus);

    if (res.success) {
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
      showMessage("Status updated successfully", "success");
    } else {
      showMessage(res.message || "Failed to update status", "error");
    }

    setUpdatingId(null);
  };

  return (
    <div
      className="
      bg-white dark:bg-[#1A1F2B]
      border border-gray-300 dark:border-[#2B3143]
      rounded-2xl shadow-md
      p-6 md:p-8
    "
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Withdrawal Requests
      </h2>

      {/* MESSAGE BOX */}
      {message && (
        <div
          className={`
            mb-4 p-3 rounded-lg text-sm font-medium
            ${
              messageType === "success"
                ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                : "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
            }
          `}
        >
          {message}
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email, ID, amount, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-[#0F1117]
            border border-gray-300 dark:border-[#2B3143]
            text-gray-800 dark:text-gray-200
            outline-none
            focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600
          "
        />
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center py-6 text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-6 text-gray-500 dark:text-gray-400">
          No withdrawal requests found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead
              className="
                bg-gray-200 dark:bg-[#2B3143]
                text-gray-800 dark:text-gray-200
                border-b border-gray-300 dark:border-[#2B3143]
              "
            >
              <tr>
                <th className="py-3 px-4">User Email</th>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((req) => (
                <tr
                  key={req.id}
                  className="
                    border-b border-gray-200 dark:border-[#2B3143]
                    hover:bg-gray-100 dark:hover:bg-[#2A2F3A]
                    transition
                  "
                >
                  <td className="py-3 px-4">{req.userEmail}</td>
                  <td className="py-3 px-4">{req.userid}</td>
                  <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                    ₹{req.amount}
                  </td>

                  {/* DROPDOWN */}
                  <td className="py-3 px-4">
                    <select
                      value={tempStatus[req.id] || req.status}
                      onChange={(e) =>
                        setTempStatus({
                          ...tempStatus,
                          [req.id]: e.target.value,
                        })
                      }
                      className="
                        bg-gray-100 dark:bg-[#0F1117]
                        border border-gray-300 dark:border-[#2B3143]
                        rounded-lg px-2 py-1
                        text-gray-800 dark:text-gray-200
                      "
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="py-3 px-4">
                    {new Date(req.date).toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleUpdateClick(req.id)}
                      disabled={updatingId === req.id}
                      className="
                        bg-gray-800 dark:bg-gray-200
                        text-white dark:text-black
                        px-3 py-1 rounded-lg
                        hover:bg-gray-700 dark:hover:bg-gray-300
                        transition
                        disabled:opacity-50
                      "
                    >
                      {updatingId === req.id ? "Updating..." : "Update"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
