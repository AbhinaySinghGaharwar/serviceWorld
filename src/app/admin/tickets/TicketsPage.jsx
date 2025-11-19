"use client";

import { useState, useEffect, useTransition } from "react";
import TicketChatModal from "./TicketChatModal";
import { replyToTicket, updateAdminReply } from "@/lib/adminServices";

export default function TicketsPage({ tickets }) {
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // 🔍 Search tickets
  useEffect(() => {
    if (!search) {
      setFilteredTickets(tickets);
      return;
    }

    const lower = search.toLowerCase();
    const filtered = tickets.filter((t) =>
      [t._id, t.email, t.subject, t.message, t.status]
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
    setFilteredTickets(filtered);
  }, [search, tickets]);

  const sendReply = async () => {
    if (!message.trim() || !selectedTicket) return;

    startTransition(async () => {
      const res = await replyToTicket({
        ticketId: selectedTicket._id,
        message,
      });

      if (res.error) return alert(res.error);

      const newReply = res.reply;

      setSelectedTicket((prev) => ({
        ...prev,
        replies: [...(prev.replies || []), newReply],
        status: "answered",
      }));

      setFilteredTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id
            ? {
                ...t,
                replies: [...(t.replies || []), newReply],
                status: "answered",
              }
            : t
        )
      );

      setMessage("");
      alert("Reply sent successfully!");
    });
  };

  const updateReply = async (existingReply, newMessage) => {
    if (!newMessage.trim() || !selectedTicket) return;

    startTransition(async () => {
      const res = await updateAdminReply({
        ticketId: selectedTicket._id,
        newMessage,
      });

      if (res.error) return alert(res.error);

      setSelectedTicket((prev) => ({
        ...prev,
        replies: prev.replies.map((r) =>
          r.type === "admin" ? { ...r, message: res.updatedMessage } : r
        ),
      }));

      setFilteredTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id
            ? {
                ...t,
                replies: t.replies.map((r) =>
                  r.type === "admin"
                    ? { ...r, message: res.updatedMessage }
                    : r
                ),
              }
            : t
        )
      );

      alert("Reply updated successfully!");
    });
  };

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-100 text-gray-800 dark:bg-[#0e0e0f] dark:text-gray-300 transition-colors">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Support Tickets</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and respond to user support requests efficiently.</p>
      </div>

      {/* Search */}
      <div className="max-w-lg">
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-[#151517] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
        />
      </div>

      {/* Ticket Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 col-span-full">No tickets found.</p>
        ) : (
          filteredTickets.map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-[#151517] border border-gray-300 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition duration-300 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="mb-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                    Ticket #{t._id.slice(-6)}
                  </h2>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full
                      ${
                        t.status === "answered"
                          ? "bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/40 dark:text-green-300"
                          : t.status === "open"
                          ? "bg-red-100 text-red-700 border border-red-300 dark:bg-red-900/40 dark:text-red-300"
                          : "bg-gray-200 text-gray-700 border border-gray-400 dark:bg-gray-700/40 dark:text-gray-300"
                      }
                    `}
                  >
                    {t.status || "unknown"}
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Created:{" "}
                  {t.createdAt
                    ? new Date(t.createdAt).toLocaleString()
                    : "Unknown"}
                </p>
              </div>

              {/* Info */}
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-medium text-gray-900 dark:text-gray-100">User:</span>{" "}
                  {t.username || "Unknown"}
                </p>

                <p>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Subject:</span>{" "}
                  {t.subject}
                </p>

                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Message:</span>{" "}
                  {t.message}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Replies: {(t.replies || []).length}
                </p>

                <button
                  className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg font-medium transition"
                  onClick={() => setSelectedTicket(t)}
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Modal */}
      <TicketChatModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        message={message}
        setMessage={setMessage}
        onSend={sendReply}
        onUpdate={updateReply}
        isPending={isPending}
      />
    </div>
  );
}
