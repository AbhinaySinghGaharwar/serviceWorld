"use client";

import { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { createTicket } from "@/lib/adminServices";

export default function TicketForm({ setTicketList }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      return alert("⚠️ Please fill all fields before submitting.");
    }

    try {
      setLoading(true);
      const res = await createTicket({ subject, message });

      if (res.error) {
        alert("❌ " + res.error);
        return;
      }

      alert("✅ " + res.message);

      setTicketList((prev) => [res.ticket, ...prev]);

      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting ticket:", err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-[#161617]/90 
        border border-[#4A6CF7]/30 
        rounded-2xl 
        shadow-[0_0_18px_rgba(74,108,247,0.25)] 
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-2 
          bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] 
          p-4 text-black font-semibold text-lg 
          shadow-[0_0_10px_rgba(74,108,247,0.6)]
        "
      >
        <FaTicketAlt /> New Ticket
      </div>

      {/* Form Body */}
      <div className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Subject */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="
                w-full bg-[#0e0e0f] text-gray-100 
                border border-[#4A6CF7]/40 
                rounded-lg p-3 
                focus:ring-2 focus:ring-[#4A6CF7] 
                transition
              "
            >
              <option value="">Select subject</option>
              <option value="Order">Order</option>
              <option value="Payment">Payment</option>
              <option value="Complaint & Suggestion">
                Complaint & Suggestion
              </option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Message
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="
                w-full bg-[#0e0e0f] text-gray-100 
                border border-[#4A6CF7]/40 
                rounded-lg p-3 
                focus:ring-2 focus:ring-[#4A6CF7] 
                resize-none 
                transition
              "
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full font-semibold py-3 rounded-xl transition text-black
              ${
                loading
                  ? "bg-[#4A6CF7]/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] hover:shadow-[0_0_20px_rgba(74,108,247,0.35)]"
              }
            `}
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}
