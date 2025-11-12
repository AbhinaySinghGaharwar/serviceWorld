export default function TransactionHistory({
  transactions,
  darkMode,
  headingColor,
  borderColor,
}) {
  return (
    <div className={`border ${borderColor} rounded-2xl shadow-lg p-5 md:p-8`}>
      <h5 className={`text-2xl font-bold ${headingColor} mb-4`}>Transaction History</h5>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead className={`${headingColor} border-b ${borderColor}`}>
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
                <td colSpan="4" className="py-5 text-center text-gray-400 italic">
                  No transactions yet.
                </td>
              </tr>
            ) : (
              transactions.map((tx, i) => (
                <tr
                  key={i}
                  className={`border-b ${borderColor} hover:${
                    darkMode ? "bg-[#1c1c1e]" : "bg-gray-100"
                  } transition`}
                >
                  <td className="py-2 px-3">{tx.utr}</td>
                  <td className="py-2 px-3">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-3 capitalize">{tx.payment_type}</td>
                  <td className="py-2 px-3 text-yellow-500 font-semibold">
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
