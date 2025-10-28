"use client";

export default function TicketHistory({ tickets, openTicket }) {
  return (
    <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl max-h-[420px] overflow-y-auto">
      <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
        🧾 Ticket History
      </h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tickets found.</p>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket._id || ticket.id}
              onClick={() => openTicket(ticket)}
              className="p-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 capitalize">
                  {ticket.subject}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.status === "resolved"
                      ? "bg-green-100 text-green-600"
                      : ticket.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : ticket.status === "open"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ticket.status || "Unknown"}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {ticket.message || "No message provided."}
              </p>

              <p className="text-gray-400 text-xs mt-2">
                {new Date(ticket.created_at || ticket.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
