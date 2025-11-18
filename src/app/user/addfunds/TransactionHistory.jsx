export default function TransactionHistory({ transactions }) {
  return (
    <div
      className="
        bg-white dark:bg-[#1A1F2B]
        border border-gray-300 dark:border-[#2B3143]
        rounded-2xl 
        shadow-md 
        p-5 md:p-8
      "
    >
      {/* Heading */}
      <h5 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Transaction History
      </h5>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">

          <thead
            className="
              bg-gray-200 dark:bg-[#2B3143]
              text-gray-800 dark:text-gray-200
              border-b border-gray-300 dark:border-[#2B3143]
            "
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
                  className="py-5 text-center text-gray-500 dark:text-gray-400 italic"
                >
                  No transactions yet.
                </td>
              </tr>
            ) : (
              transactions.map((tx, i) => (
                <tr
                  key={i}
                  className="
                    border-b border-gray-300 dark:border-[#2B3143]
                    hover:bg-gray-100 dark:hover:bg-[#2A2F3A]
                    transition-all duration-200
                  "
                >
                  <td className="py-2 px-3 text-gray-800 dark:text-gray-200">
                    {tx.utr}
                  </td>

                  <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>

                  <td className="py-2 px-3 capitalize text-gray-700 dark:text-gray-300">
                    {tx.payment_type}
                  </td>

                  <td className="py-2 px-3 font-semibold text-gray-800 dark:text-gray-100">
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
