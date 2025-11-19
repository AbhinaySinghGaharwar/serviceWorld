"use client";

import { useEffect, useState } from "react";

export default function TicketChatModal({
  ticket,
  onClose,
  message,
  setMessage,
  onSend,
  onUpdate,
  isPending,
}) {
  const [hasAdminReply, setHasAdminReply] = useState(false);
  const [existingReply, setExistingReply] = useState(null);

  useEffect(() => {
    if (ticket?.replies?.length > 0) {
      const adminReply = ticket.replies.find((r) => r.type === "admin");

      if (adminReply) {
        setHasAdminReply(true);
        setExistingReply(adminReply);
        setMessage(adminReply.message);
      } else {
        setHasAdminReply(false);
        setExistingReply(null);
        setMessage("");
      }
    } else {
      setHasAdminReply(false);
      setExistingReply(null);
      setMessage("");
    }
  }, [ticket, setMessage]);

  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50">
      <div className="bg-white dark:bg-[#151517] border border-gray-300 dark:border-gray-700 w-full md:w-1/2 max-h-[80vh] rounded-t-2xl shadow-xl flex flex-col transition-colors">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Ticket: {ticket._id}
          </h2>

          <button
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Chat Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-[#0e0e0f]">

          {/* User Message */}
          <div className="p-3 rounded-lg max-w-[80%] bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            <p className="text-sm">{ticket.message}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(ticket.created_at || ticket.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Admin Reply (if exists) */}
          {existingReply && (
            <div className="p-3 rounded-lg max-w-[80%] ml-auto bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-100">
              <p className="text-sm">{existingReply.message}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {new Date(existingReply.created_at).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#151517] flex flex-col gap-3">
          <textarea
            rows="3"
            placeholder={
              hasAdminReply
                ? "Edit your previous reply..."
                : "Write your reply..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isPending}
            className={`
              flex-1 border rounded-lg px-3 py-2
              bg-white dark:bg-[#0e0e0f]
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-700
              placeholder-gray-500
              focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600
              resize-none transition
              ${isPending ? "opacity-60 cursor-not-allowed" : ""}
            `}
          />

          <div className="flex justify-end gap-3">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Close
            </button>

            {/* Send or Update Button */}
            <button
              onClick={() =>
                hasAdminReply ? onUpdate(existingReply, message) : onSend()
              }
              disabled={isPending}
              className={`
                px-4 py-2 rounded-lg font-medium transition
                ${
                  isPending
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : hasAdminReply
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }
              `}
            >
              {isPending
                ? "Saving..."
                : hasAdminReply
                ? "Update Reply"
                : "Send Reply"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
