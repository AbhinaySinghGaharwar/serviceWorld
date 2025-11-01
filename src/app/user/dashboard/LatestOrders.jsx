const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-[#151517] border border-yellow-500/30 rounded-2xl shadow-[0_0_15px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] p-3 sm:p-4 lg:p-5 hover:border-yellow-400 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const latestOrders = [
  { id: "#1324", service: "Instagram Followers", amount: "₹350", status: "Completed" },
  { id: "#1323", service: "YouTube Views", amount: "₹220", status: "Processing" },
  { id: "#1322", service: "Twitter Likes", amount: "₹90", status: "Pending" },
];

export default function LatestOrders() {
  return (
    <>
      {/* ================= LATEST ORDERS ================= */}
      <section>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-yellow-400 tracking-wide drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] animate-pulse">
          Latest Orders
        </h3>

        <Card className="overflow-x-auto">
          <table className="w-full text-[12px] sm:text-sm text-left text-gray-300">
            <thead className="text-[11px] sm:text-xs uppercase border-b border-yellow-500/30 text-yellow-400 drop-shadow-[0_0_5px_rgba(255,215,0,0.6)]">
              <tr>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Order ID</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Service</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Amount</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order, idx) => (
                <tr
                  key={idx}
                  className="border-b border-yellow-500/10 hover:bg-yellow-500/10 transition-all duration-200 hover:shadow-[0_0_12px_rgba(255,215,0,0.3)]"
                >
                  <td className="py-2 px-2 sm:py-3 sm:px-4">{order.id}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 truncate">{order.service}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-yellow-300 drop-shadow-[0_0_4px_rgba(255,215,0,0.7)]">
                    {order.amount}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    <span
                      className={`px-2 py-[2px] sm:py-1 rounded-lg text-[10px] sm:text-xs shadow-sm ${
                        order.status === "Completed"
                          ? "bg-green-500/20 text-green-400 drop-shadow-[0_0_6px_rgba(0,255,0,0.5)]"
                          : order.status === "Processing"
                          ? "bg-yellow-500/20 text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]"
                          : "bg-red-500/20 text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </>
  );
}
