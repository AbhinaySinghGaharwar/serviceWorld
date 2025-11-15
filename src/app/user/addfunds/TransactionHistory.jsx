export default function TransactionHistory({
  transactions,
  darkMode,
  headingColor,
  borderColor,
}) {
  return (
    <div
      className={`
        border ${borderColor} rounded-2xl 
        shadow-[0_0_15px_rgba(74,108,247,0.15)] 
        p-5 md:p-8 
        bg-[#0e0e0f]/60 backdrop-blur-md
      `}
    >
      <h5
        className={`
          text-2xl font-bold text-[#4A6CF7] 
          mb-4 drop-shadow-[0_0_8px_rgba(74,108,247,0.5)]
        `}
      >
        Transaction History
      </h5>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead
            className={`
              text-[#4A6CF7] 
              border-b ${borderColor}
              bg-[#4A6CF7]/10
            `}
          >
            <tr>
              <th className="py-2 px-3 text-left">ID</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Method</th>
              <th className="py-2 px-3 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-5 text-center text-gray-500 italic"
                >
                  No transactions yet.
                </td>
              </tr>
            ) : (
              transactions.map((tx, i) => (
                <tr
                  key={i}
                  className={`
                    border-b ${borderColor}
                    transition-all duration-200
                    hover:bg-[#1a1f33]
                    hover:shadow-[0_0_12px_rgba(74,108,247,0.3)]
                  `}
                >
                  <td className="py-2 px-3">{tx.utr}</td>

                  <td className="py-2 px-3">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>

                  <td className="py-2 px-3 capitalize text-gray-300">
                    {tx.payment_type}
                  </td>

                  <td className="py-2 px-3 font-semibold text-[#16D1A5] drop-shadow-[0_0_4px_rgba(22,209,165,0.6)]">
                    ₹{tx.payment_amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
