"use client";

import { useState } from "react";

export default function TicketForm({ setTickets }) {
  const [subject, setSubject] = useState("order");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create ticket");
      }

      const newTicket = await res.json();
      setTickets((prev) => [newTicket, ...prev]);
      setMessage("");
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
    <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl max-w-3xl mx-auto transition-all duration-300 hover:shadow-3xl">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
        🎫 Create Support Ticket
      </h2>

      {/* Error Message */}
      {error && (
        <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white p-4 mb-6 rounded-xl text-base text-center shadow-md">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 mb-6 rounded-xl text-base text-center shadow-md animate-fadeIn">
          ✅ Ticket Submitted Successfully
        </div>
      )}

      <form onSubmit={handleSubmitTicket} className="space-y-7">
        {/* Subject Dropdown */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2 text-lg">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-100 border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all"
            disabled={loading}
          >
            <option value="order">Order</option>
            <option value="payment">Payment</option>
            <option value="complaint">Complaint & Suggestion</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Message Box */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2 text-lg">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full p-4 rounded-2xl bg-gray-100 border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all resize-none"
            disabled={loading}
            placeholder="Write your issue or query here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl text-white font-semibold text-xl flex justify-center items-center transition-all duration-300 ${
            success
              ? "bg-gradient-to-r from-green-500 to-emerald-500"
              : "bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 hover:opacity-90 hover:scale-[1.03]"
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
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
            "Submitted!"
          ) : (
            "Submit Ticket"
          )}
        </button>
      </form>
    </div>
  );
}
