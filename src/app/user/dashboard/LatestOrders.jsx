const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`
      bg-white dark:bg-[#1A1F2B]
      border border-gray-300 dark:border-[#2B3143]
      rounded-2xl 
      shadow-md hover:shadow-lg hover:shadow-[#4A6CF7]/20
      p-3 sm:p-4 lg:p-5
      transition-all duration-300
      ${className}
    `}
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
        <h3 className="
          text-base sm:text-lg font-semibold mb-3 sm:mb-4
          text-[#4A6CF7] tracking-wide
          drop-shadow-[0_0_6px_rgba(74,108,247,0.6)]
        ">
          Latest Orders
        </h3>

        <Card className="overflow-x-auto">
          <table className="
            w-full text-[12px] sm:text-sm text-left
            text-[#4B5563] dark:text-[#A0AEC3]
          ">
            <thead className="
              text-[11px] sm:text-xs uppercase font-semibold
              border-b border-gray-300 dark:border-[#2B3143]
              text-[#4A6CF7]
            ">
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
                  className="
                    border-b border-gray-200 dark:border-[#2B3143]
                    hover:bg-[#4A6CF7]/10
                    transition-all duration-200
                  "
                >
                  <td className="py-2 px-2 sm:py-3 sm:px-4">{order.id}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 truncate">{order.service}</td>

                  {/* Amount */}
                  <td className="
                    py-2 px-2 sm:py-3 sm:px-4 
                    font-semibold text-[#16D1A5]
                  ">
                    {order.amount}
                  </td>

                  {/* Status Badge */}
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    <span
                      className={`
                        px-2 py-[2px] sm:py-1 rounded-lg text-[10px] sm:text-xs 
                        shadow-sm font-medium
                        ${
                          order.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : order.status === "Processing"
                            ? "bg-[#4A6CF7]/20 text-[#4A6CF7]"
                            : "bg-orange-500/20 text-orange-400"
                        }
                      `}
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
