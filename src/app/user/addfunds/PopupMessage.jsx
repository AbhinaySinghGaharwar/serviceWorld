export default function PopupMessage({ popup, setPopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">

      <div
        className="
          bg-white dark:bg-[#1A1F2B]
          border border-gray-300 dark:border-[#2B3143]
          rounded-2xl p-6 max-w-sm w-full text-center
          shadow-md dark:shadow-black/30
        "
      >
        {/* Status Icon */}
        <div
          className="
            mx-auto mb-4 w-14 h-14 flex items-center justify-center 
            rounded-full 
            bg-gray-800 dark:bg-gray-200
            shadow-sm
          "
        >
          <span className="text-white dark:text-black text-2xl">
            {popup.success ? "✓" : "✕"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          {popup.success ? "Payment Successful" : "Transaction Failed"}
        </h2>

        {/* Message */}
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {popup.message}
        </p>

        {/* Transaction Details */}
        {popup.transaction && (
          <div
            className="
              bg-gray-100 dark:bg-[#0C0F17]
              border border-gray-300 dark:border-[#2B3143]
              rounded-xl p-3 mb-4
              text-sm text-gray-700 dark:text-gray-300
            "
          >
            <p>
              <strong className="text-gray-900 dark:text-gray-200">UTR:</strong>{" "}
              {popup.transaction.utr}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-200">Amount:</strong>{" "}
              ₹{popup.transaction.payment_amount}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-200">Type:</strong>{" "}
              {popup.transaction.payment_type}
            </p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => setPopup({ ...popup, visible: false })}
          className="
            px-5 py-2 rounded-xl font-semibold
            bg-gray-800 text-white
            hover:bg-gray-700
            dark:bg-gray-200 dark:text-black
            dark:hover:bg-gray-300
            transition active:scale-95
            shadow-sm
          "
        >
          Close
        </button>
      </div>

    </div>
  );
}
