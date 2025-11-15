"use client";

import { useState } from "react";
import { FaHistory, FaSearch, FaTimes } from "react-icons/fa";

export default function TicketHistory({ tickets = [], openTicket }) {
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredTickets = tickets.filter((t) =>
    t.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="
        bg-[#161617]/90 
        border border-[#4A6CF7]/30 
        rounded-2xl 
        shadow-[0_0_20px_rgba(74,108,247,0.25)] 
        overflow-hidden 
        relative
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-2 
          bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] 
          p-4 text-black 
          font-semibold text-lg
          shadow-[0_0_10px_rgba(74,108,247,0.6)]
        "
      >
        <FaHistory /> Ticket History
      </div>

      {/* Search Bar */}
      <div className="p-4 flex items-center gap-3 border-b border-[#4A6CF7]/30">
        <FaSearch className="text-[#4A6CF7] text-lg" />
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full bg-transparent 
            outline-none 
            text-gray-100 
            text-sm 
            placeholder-gray-400
          "
        />
      </div>

      {/* Ticket List */}
      <div className="p-4 space-y-3 max-h-[460px] overflow-y-auto">
        {filteredTickets.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No tickets found.</p>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id || ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="
                p-4 border border-[#4A6CF7]/30 
                rounded-xl 
                hover:border-[#4A6CF7]/60 
                hover:shadow-[0_0_12px_rgba(74,108,247,0.35)] 
                transition cursor-pointer 
                bg-[#0e0e0f]
              "
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-100 capitalize">
                  {ticket.subject}
                </h3>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                    ticket.status === "open"
                      ? "bg-[#4A6CF7]/20 text-[#4A6CF7] border-[#4A6CF7]/40"
                      : "bg-[#16D1A5]/20 text-[#16D1A5] border-[#16D1A5]/40"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <p className="text-sm text-gray-400 line-clamp-2">
                {ticket.message}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(ticket.created_at || ticket.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Popup Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="
              bg-[#1a1a1b] 
              border border-[#4A6CF7]/40 
              rounded-2xl 
              w-full max-w-lg 
              p-5 relative 
              max-height-[80vh] 
              overflow-hidden 
              shadow-[0_0_25px_rgba(74,108,247,0.35)]
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#4A6CF7]/30 pb-3 mb-3">
              <h2 className="text-[#4A6CF7] font-semibold">
                {selectedTicket.subject}
              </h2>
              <FaTimes
                className="text-gray-400 hover:text-[#4A6CF7] cursor-pointer"
                onClick={() => setSelectedTicket(null)}
              />
            </div>

            {/* Chat messages */}
            <div className="space-y-4 overflow-y-auto max-h-[55vh] pr-2">
              {/* User’s main message */}
              <div className="flex justify-start">
                <div
                  className="
                    bg-[#222225] 
                    text-gray-100 
                    px-4 py-2 
                    rounded-2xl rounded-tl-none 
                    max-w-[80%] 
                    border border-[#4A6CF7]/30
                  "
                >
                  <p>{selectedTicket.message}</p>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {new Date(selectedTicket.created_at).toLocaleString()} • User
                  </p>
                </div>
              </div>

              {/* Replies */}
              {selectedTicket.replies?.map((reply, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    reply.type === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      px-4 py-2 rounded-2xl max-w-[80%] border text-sm
                      ${
                        reply.type === "admin"
                          ? "bg-[#4A6CF7]/20 text-[#4A6CF7] border-[#4A6CF7]/40 rounded-tr-none"
                          : "bg-[#222225] text-gray-100 border-[#4A6CF7]/30 rounded-tl-none"
                      }
                    `}
                  >
                    <p>{reply.message}</p>
                    <p
                      className={`text-xs mt-1 text-right ${
                        reply.type === "admin"
                          ? "text-[#4A6CF7]"
                          : "text-gray-500"
                      }`}
                    >
                      {new Date(reply.created_at).toLocaleString()} •{" "}
                      {reply.type === "admin" ? "Admin" : "User"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
