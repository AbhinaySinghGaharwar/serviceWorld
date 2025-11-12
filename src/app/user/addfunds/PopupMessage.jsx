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
      <div className={`${bgCard} border ${borderColor} rounded-2xl p-6 max-w-sm w-full text-center`}>
        <div
          className={`mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full ${
            popup.success ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span className="text-white text-2xl">
            {popup.success ? "✅" : "❌"}
          </span>
        </div>

        <h2
          className={`text-xl font-bold mb-2 ${
            popup.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {popup.success ? "Payment Successful" : "Transaction Failed"}
        </h2>

        <p className="mb-4 text-sm">{popup.message}</p>

        {popup.transaction && (
          <div className={`${bgMain} border ${borderColor} rounded-xl p-3 mb-4 text-sm`}>
            <p>
              <strong>UTR:</strong> {popup.transaction.utr}
            </p>
            <p>
              <strong>Amount:</strong> ₹{popup.transaction.payment_amount}
            </p>
            <p>
              <strong>Type:</strong> {popup.transaction.payment_type}
            </p>
          </div>
        )}

        <button
          onClick={() => setPopup({ ...popup, visible: false })}
          className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl transition active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
}
