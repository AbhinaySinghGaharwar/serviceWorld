"use client";

import { useState, useEffect, useRef } from "react";
import { FaTicketAlt, FaHistory, FaSearch, FaPaperPlane } from "react-icons/fa";

export default function TicketSupport() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const repliesEndRef = useRef(null);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    } catch {
      setTickets([]);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((t) =>
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message)
      return alert("⚠️ Please fill all fields before submitting.");

    const newTicket = {
      id: Date.now(),
      subject,
      message,
      status: "open",
      created_at: new Date().toISOString(),
      replies: [],
    };
    setTickets((prev) => [newTicket, ...prev]);
    setSubject("");
    setMessage("");
  };

  const openTicket = (ticket) => setSelectedTicket(ticket);
  const closeTicket = () => setSelectedTicket(null);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* 🔍 Search Bar */}
        <div className="mb-8 bg-[#161617]/90 border border-yellow-500/20 rounded-2xl p-4 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
          <div className="flex items-center gap-3 border border-yellow-500/30 bg-[#0e0e0f] rounded-xl px-3 py-2">
            <FaSearch className="text-yellow-500 text-lg" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-100 text-sm placeholder-gray-400"
            />
          </div>
        </div>

        {/* 🎫 Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📝 New Ticket Form */}
          <div className="bg-[#161617]/90 border border-yellow-500/20 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.15)] overflow-hidden">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-black font-semibold text-lg">
              <FaTicketAlt /> New Ticket
            </div>
            <div className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-yellow-500/30 bg-[#0e0e0f] text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500"
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

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-yellow-500/30 bg-[#0e0e0f] text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>

          {/* 📜 Ticket History */}
          <div className="bg-[#161617]/90 border border-yellow-500/20 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.15)] overflow-hidden">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-black font-semibold text-lg">
              <FaHistory /> Ticket History
            </div>

            <div className="p-4 space-y-3 max-h-[460px] overflow-y-auto">
              {filteredTickets.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No tickets found.
                </p>
              ) : (
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => openTicket(ticket)}
                    className="p-4 border border-yellow-500/30 rounded-xl hover:border-yellow-500/60 hover:shadow-[0_0_10px_rgba(250,204,21,0.2)] transition cursor-pointer bg-[#0e0e0f]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-gray-100 capitalize">
                        {ticket.subject}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          ticket.status === "open"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                            : "bg-green-500/20 text-green-400 border border-green-400/30"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {ticket.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(ticket.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 💬 Popup Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
            <div className="bg-[#161617] border border-yellow-500/30 rounded-3xl shadow-[0_0_25px_rgba(250,204,21,0.15)] w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-t-3xl">
                <h2 className="text-lg font-bold">{selectedTicket.subject}</h2>
                <button
                  onClick={closeTicket}
                  className="text-2xl font-bold hover:scale-110 transition-transform"
                >
                  &times;
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                <div className="bg-[#0e0e0f] p-3 rounded-xl border border-yellow-500/20 shadow-sm">
                  <p className="text-gray-100">{selectedTicket.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(selectedTicket.created_at).toLocaleString()}
                  </p>
                </div>

                {selectedTicket.replies?.map((r, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border shadow-sm ${
                      r.sender === "user"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black ml-auto"
                        : "bg-[#0e0e0f] text-gray-100 border-yellow-500/20"
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
                ))}
                <div ref={repliesEndRef} />
              </div>

              <div className="p-4 border-t border-yellow-500/20 flex gap-2 bg-[#0e0e0f]">
                <input
                  type="text"
                  placeholder="Type a reply..."
                  className="flex-1 border border-yellow-500/30 rounded-lg p-2 bg-transparent text-gray-100 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 rounded-lg font-semibold hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition flex items-center gap-2">
                  <FaPaperPlane /> Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
