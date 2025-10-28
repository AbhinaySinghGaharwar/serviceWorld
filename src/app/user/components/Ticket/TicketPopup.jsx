"use client";

import { useState } from "react";

export default function TicketPopup({
  ticket,
  setSelectedTicket,
  setTickets,
  closeTicket,
  scrollToBottom,
  repliesEndRef,
}) {
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/tickets/${ticket._id || ticket.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyMessage }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send reply");
      }

      const updatedTicket = await res.json();
      setSelectedTicket(updatedTicket);
      setTickets((prev) =>
        prev.map((t) =>
          (t._id || t.id) === (updatedTicket._id || updatedTicket.id)
            ? updatedTicket
            : t
        )
      );

      setReplyMessage("");
      scrollToBottom();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4 animate-fadeIn">
      <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-3xl">
          <h2 className="text-lg sm:text-xl font-bold capitalize">{ticket.subject}</h2>
          <button
            onClick={closeTicket}
            className="text-2xl font-bold hover:scale-110 transition-transform"
          >
            &times;
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/80 text-white text-center text-sm py-2 font-medium">
            {error}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* Main Ticket */}
          <div className="bg-gray-100 p-3 rounded-2xl max-w-[80%] shadow-sm">
            <p className="text-gray-800">{ticket.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>

          {/* Replies */}
          {ticket.replies?.map((r, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl max-w-[80%] shadow-sm ${
                r.sender === "user"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              <p>{r.message}</p>
              <p
                className={`text-xs mt-1 ${
                  r.sender === "user"
                    ? "text-indigo-100"
                    : "text-gray-500"
                }`}
              >
                {new Date(r.created_at).toLocaleString()}
              </p>
            </div>
          ))}

          <div ref={repliesEndRef} />
        </div>

        {/* Reply Input */}
        <div className="p-4 border-t border-gray-200 flex gap-2 bg-white/80 backdrop-blur-xl">
          <input
            type="text"
            placeholder="Type your reply..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="flex-1 p-2.5 rounded-xl border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500"
            disabled={loading}
          />
          <button
            onClick={handleSendReply}
            disabled={loading}
            className={`px-6 py-2.5 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${
              success
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 active:scale-95"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : success ? (
              "Sent!"
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
