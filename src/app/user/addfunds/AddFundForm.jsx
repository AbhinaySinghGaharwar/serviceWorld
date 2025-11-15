"use client";
import QRSection from "./QRSection";
import { useRouter } from "next/navigation";

export default function AddFundForm({
  paymentType,
  setPaymentType,
  utr,
  setUtr,
  amount,
  setAmount,
  filteredPaymentMethod,
  paymentMethods,
  loading,
  setLoading,
  setPopup,
  darkMode,
  Instructions,
}) {
  const router = useRouter();

  // 🎨 THEME COLORS
  const bgMain = darkMode ? "bg-[#0C0F17]" : "bg-gray-100";
  const bgCard = darkMode ? "bg-[#1A1F2B]" : "bg-white";
  const borderColor = darkMode ? "border-[#4A6CF7]/20" : "border-gray-300";
  const textColor = darkMode ? "text-gray-200" : "text-gray-900";
  const headingColor = darkMode ? "text-[#4A6CF7]" : "text-[#4A6CF7]";

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
        setPopup({
          visible: true,
          success: true,
          message: "Transaction verified successfully!",
          transaction: data.transaction,
        });

        setUtr("");
        setAmount("");
        router.reload();

      } else {
        setPopup({
          visible: true,
          success: false,
          message: data.error || "Verification failed",
          transaction: null,
        });
      }
    } catch (err) {
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
    <div
      className={`${bgCard} border ${borderColor} rounded-2xl shadow-[0_0_20px_rgba(74,108,247,0.1)] p-5 md:p-8`}
    >
      <h3 className={`text-2xl font-bold ${headingColor} mb-6`}>
        Add Funds
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Payment Method */}
        <div>
          <label className="block font-semibold mb-2">Payment Method</label>
          <select
            className={`w-full ${bgMain} border ${borderColor} rounded-lg px-3 py-2 ${textColor} 
            focus:ring-2 focus:ring-[#4A6CF7] outline-none`}
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            {paymentMethods &&
              paymentMethods.map((item) => (
                <option key={item._id} value={item.Name}>
                  {item.Name || item.type}
                </option>
              ))}
          </select>
        </div>

        {/* QR Section */}
        <QRSection
          darkMode={darkMode}
          filteredPaymentMethod={filteredPaymentMethod}
          headingColor={headingColor}
          borderColor={borderColor}
          bgMain={bgMain}
          Instructions={Instructions}
        />

        {/* UTR Input */}
        <div>
          <label className="block font-semibold mb-2">Enter UTR</label>
          <input
            type="text"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            required
            className={`w-full ${bgMain} border ${borderColor} rounded-lg px-3 py-2 ${textColor}
            focus:ring-2 focus:ring-[#4A6CF7] outline-none`}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block font-semibold mb-2">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className={`w-full ${bgMain} border ${borderColor} rounded-lg px-3 py-2 ${textColor}
            focus:ring-2 focus:ring-[#4A6CF7] outline-none`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3 rounded-xl font-bold text-white 
            bg-[#4A6CF7] hover:bg-[#3C59D4] 
            transition shadow-[0_0_12px_rgba(74,108,247,0.3)]
            ${loading ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Verifying..." : "Verify Transaction"}
        </button>
      </form>
    </div>
  );
}
