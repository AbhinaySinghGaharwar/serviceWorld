export default function PopupMessage({
  popup,
  setPopup,
  darkMode,
  bgCard,
  borderColor,
  bgMain,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">
      
      <div
        className={`
          ${bgCard} border ${borderColor} 
          rounded-2xl p-6 max-w-sm w-full text-center 
          shadow-[0_0_18px_rgba(74,108,247,0.15)]
        `}
      >
        {/* Status Icon */}
        <div
          className={`
            mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full 
            ${popup.success ? "bg-[#16D1A5]" : "bg-red-600"}
            shadow-[0_0_12px_rgba(0,0,0,0.25)]
          `}
        >
          <span className="text-white text-2xl">
            {popup.success ? "✓" : "✕"}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`text-xl font-bold mb-2 ${
            popup.success ? "text-[#16D1A5]" : "text-red-400"
          }`}
        >
          {popup.success ? "Payment Successful" : "Transaction Failed"}
        </h2>

        {/* Message */}
        <p className="mb-4 text-sm text-gray-300">{popup.message}</p>

        {/* Transaction Details */}
        {popup.transaction && (
          <div
            className={`
              ${bgMain} border ${borderColor} 
              rounded-xl p-3 mb-4 text-sm text-gray-300
            `}
          >
            <p>
              <strong className="text-gray-100">UTR:</strong>{" "}
              {popup.transaction.utr}
            </p>
            <p>
              <strong className="text-gray-100">Amount:</strong>{" "}
              ₹{popup.transaction.payment_amount}
            </p>
            <p>
              <strong className="text-gray-100">Type:</strong>{" "}
              {popup.transaction.payment_type}
            </p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => setPopup({ ...popup, visible: false })}
          className="
            px-5 py-2 rounded-xl font-semibold text-white
            bg-[#4A6CF7] hover:bg-[#3C59D4]
            transition active:scale-95
            shadow-[0_0_12px_rgba(74,108,247,0.3)]
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
