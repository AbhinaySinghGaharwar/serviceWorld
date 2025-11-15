"use client";

import { useState, useRef } from "react";
import TicketForm from "./TicketForm";
import TicketHistory from "./TicketHistory";

export default function TicketSupport({ tickets = [] }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketList, setTicketList] = useState(tickets);
  const repliesEndRef = useRef(null);

  const openTicket = (ticket) => setSelectedTicket(ticket);
  const closeTicket = () => setSelectedTicket(null);

  return (
    <div className="min-h-screen text-gray-100 py-10 px-4 flex justify-center bg-[#0e0e0f]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 📝 New Ticket Form */}
        <TicketForm setTicketList={setTicketList} />

        {/* 📜 Ticket History */}
        <TicketHistory tickets={ticketList} openTicket={openTicket} />

        {/* 💬 Ticket Popup */}
        {selectedTicket && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
            <div
              className="
                bg-[#161617] 
                border border-[#4A6CF7]/40 
                rounded-3xl 
                shadow-[0_0_30px_rgba(74,108,247,0.35)] 
                w-full max-w-lg 
                max-h-[90vh] 
                flex flex-col 
                overflow-hidden
              "
            >
              
              {/* Header */}
              <div
                className="
                  flex justify-between items-center 
                  p-4 
                  bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] 
                  text-black 
                  rounded-t-3xl 
                  shadow-[0_0_12px_rgba(74,108,247,0.6)]
                "
              >
                <h2 className="text-lg font-bold">
                  {selectedTicket.subject}
                </h2>
                <button
                  onClick={closeTicket}
                  className="
                    text-2xl font-bold 
                    hover:scale-110 
                    transition-transform 
                    text-black
                  "
                >
                  &times;
                </button>
              </div>

              {/* Ticket Details */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                
                {/* Main User Message */}
                <div
                  className="
                    bg-[#0e0e0f] 
                    p-3 
                    rounded-xl 
                    border border-[#4A6CF7]/30 
                    shadow-sm
                  "
                >
                  <p className="text-gray-100">{selectedTicket.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      selectedTicket.created_at || selectedTicket.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {/* Replies */}
                {selectedTicket.replies?.length > 0 ? (
                  selectedTicket.replies.map((r, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border shadow-sm ${
                        r.sender === "user"
                          ? `
                            bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5]
                            text-black 
                            ml-auto 
                            border-[#4A6CF7]/40 
                            shadow-[0_0_10px_rgba(74,108,247,0.4)]
                          `
                          : `
                            bg-[#0e0e0f] 
                            text-gray-100 
                            border-[#4A6CF7]/30
                          `
                      }`}
                    >
                      <p>{r.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          r.sender === "user"
                            ? "text-black/70"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(r.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-center mt-4">
                    No replies yet.
                  </p>
                )}

                <div ref={repliesEndRef} />
              </div>

              {/* Bottom Close Button */}
              <div
                className="
                  border-t border-[#4A6CF7]/30 
                  p-3 
                  flex justify-center 
                  bg-[#0e0e0f]
                "
              >
                <button
                  onClick={closeTicket}
                  className="
                    bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5]
                    text-black 
                    px-6 py-2 
                    rounded-lg font-semibold 
                    hover:shadow-[0_0_12px_rgba(74,108,247,0.35)]
                    transition active:scale-95
                  "
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
