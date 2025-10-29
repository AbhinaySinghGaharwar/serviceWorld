"use client";

import { useEffect, useState } from "react";

export default function AddFund() {
  const [paymentType, setPaymentType] = useState("BharatPe");
  const [utr, setUtr] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    visible: false,
    success: false,
    message: "",
    transaction: null,
  });
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [filteredPaymentMethod, setFilteredPaymentMethod] = useState("");

  // Fetch Payment Methods
  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        const res = await fetch("/api/payment-methods", { method: "GET" });
        const data = await res.json();
        setPaymentMethod(data.methods || []);
      } catch (err) {
        console.error("Error fetching payment methods:", err);
      }
    };
    getPaymentMethods();
  }, []);

  // Fetch Transaction History
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await fetch("/api/services/gethistory");
        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    getHistory();
  }, []);

  // Filter QR Image on Payment Type Change
  useEffect(() => {
    const filterPaymentMethod = () => {
      if (!paymentMethod || paymentMethod.length === 0) {
        setFilteredPaymentMethod("");
        return;
      }

      const matched = paymentMethod.find((item) => item.type === paymentType);
      if (matched) {
        setFilteredPaymentMethod(matched.qrImage);
      } else {
        setFilteredPaymentMethod("");
      }
    };

    filterPaymentMethod();
  }, [paymentType, paymentMethod]);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/services/addFunds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_type: paymentType,
          utr,
          payment_amount: amount,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setTransactions((prev) => [data.transaction, ...prev]);
        setPopup({
          visible: true,
          success: true,
          message: "Transaction verified successfully!",
          transaction: data.transaction,
        });
        setUtr("");
        setAmount("");
      } else {
        setPopup({
          visible: true,
          success: false,
          message: data.error || "Verification failed",
          transaction: null,
        });
      }
    } catch (err) {
      console.error("Error verifying transaction:", err);
      setPopup({
        visible: true,
        success: false,
        message: "Verification failed",
        transaction: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center px-3 sm:px-6 py-8 relative">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6 text-center sm:text-left">
            Add Funds
          </h3>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Form Section */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Payment Method */}
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Payment Method
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <option value="BharatPe">
                      BharatPe ,PhonePe, Google Pay, Paytm
                    </option>
                    <option value="PhonePe">
                      PhonePe {"{ Minimum =10rs } [ 100 add 3%Bonus]"}
                    </option>
                    <option value="BankTransfer">
                      UPI / BANK TRANSFER [MINIMUM 1K] [ 6%Bonus ]
                    </option>
                  </select>
                </div>
 {/* QR Section */}
            <div className="flex-1 flex justify-center items-center">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-inner w-full max-w-xs">
                <h6 className="text-center font-semibold mb-3 text-gray-800">
                  Scan QR
                </h6>
                {filteredPaymentMethod ? (
                  <img
                    src={`data:image/png;base64,${filteredPaymentMethod}`}
                    alt="QR Code"
                    className="w-full h-auto rounded-lg object-contain"
                  />
                ) : (
                  <p className="text-center text-gray-500 text-sm">
                    No QR available
                  </p>
                )}
              </div>
            </div>
                {/* Instructions */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-gray-800">
                  <h6 className="font-semibold text-indigo-700 mb-2">
                    Instructions
                  </h6>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Scan the QR code below</li>
                    <li>Pay the desired amount</li>
                    <li>Enter amount & transaction ID</li>
                    <li>Click on "Verify Transaction"</li>
                  </ol>
                </div>

                {/* UTR */}
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Enter UTR
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-bold transition-all duration-300 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-indigo-600 hover:to-purple-600"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify Transaction"}
                </button>
              </form>
            </div>

           
          </div>
        </div>

     {/* Transaction History */}
<div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg mt-10 p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl">
  <h5 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 text-center sm:text-left">
    Transaction History
  </h5>

  <div className="overflow-x-auto rounded-xl border border-gray-100">
    <table className="min-w-full bg-white text-gray-800 text-sm sm:text-base rounded-xl">
      <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700 font-semibold uppercase tracking-wide">
        <tr>
          <th className="py-3 px-4 text-left">ID</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Method</th>
          <th className="py-3 px-4 text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td
              colSpan="4"
              className="py-6 text-center text-gray-500 italic bg-gray-50"
            >
              No transactions yet.
            </td>
          </tr>
        ) : (
          transactions.map((tx, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
            >
              <td className="py-3 px-4 font-medium text-gray-700">{tx.utr}</td>
              <td className="py-3 px-4 text-gray-600">
                {new Date(tx.createdAt).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-gray-600 capitalize">
                {tx.payment_type}
              </td>
              <td className="py-3 px-4 font-semibold text-indigo-600">
                ₹{tx.payment_amount}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

      </div>

     {/* Popup Modal */}
{popup.visible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 px-4">
    <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 p-6 sm:p-8 rounded-3xl max-w-sm sm:max-w-md w-full shadow-2xl animate-fadeInUp text-center">
      
      {/* Success or Fail Icon */}
      <div
        className={`mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full shadow-md ${
          popup.success
            ? "bg-gradient-to-r from-green-400 to-emerald-500"
            : "bg-gradient-to-r from-rose-400 to-red-500"
        }`}
      >
        <span className="text-white text-3xl">
          {popup.success ? "✅" : "❌"}
        </span>
      </div>

      {/* Title */}
      <h2
        className={`text-2xl font-extrabold mb-3 ${
          popup.success
            ? "bg-gradient-to-r from-green-600 to-emerald-500"
            : "bg-gradient-to-r from-red-600 to-rose-500"
        } bg-clip-text text-transparent`}
      >
        {popup.success ? "Payment Successful" : "Transaction Failed"}
      </h2>

      {/* Message */}
      <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
        {popup.message}
      </p>

      {/* Transaction Details */}
      {popup.transaction && (
        <div className="text-left text-sm bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-inner">
          <p className="mb-1">
            <strong>UTR:</strong> {popup.transaction.utr}
          </p>
          <p className="mb-1">
            <strong>Amount:</strong> ₹{popup.transaction.payment_amount}
          </p>
          <p>
            <strong>Payment Type:</strong> {popup.transaction.payment_type}
          </p>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={() => setPopup({ ...popup, visible: false })}
        className="mt-6 w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}
