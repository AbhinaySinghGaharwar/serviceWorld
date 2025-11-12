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
    const router=useRouter()
  const bgMain = darkMode ? "bg-[#0e0e0f]" : "bg-gray-50";
  const bgCard = darkMode ? "bg-[#151517]" : "bg-white";
  const borderColor = darkMode ? "border-yellow-500/20" : "border-gray-300";
  const textColor = darkMode ? "text-gray-300" : "text-gray-800";
  const headingColor = darkMode ? "text-yellow-400" : "text-yellow-600";
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/services/addFunds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_type: paymentType, utr, payment_amount: amount }),
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
        router.reload()
      } else {
        setPopup({
          visible: true,
          success: false,
          message: data.error || "Verification failed",
          transaction: null,
        });
      }
    } catch (err) {
      console.error(err);
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
    <div className={`${bgCard} border ${borderColor} rounded-2xl shadow-lg p-5 md:p-8`}>
      <h3 className={`text-2xl font-bold ${headingColor} mb-6`}>Add Funds</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Payment Method</label>
          <select
            className={`w-full ${bgMain} border ${borderColor} rounded-lg px-3 py-2 ${textColor}`}
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            {paymentMethods&&paymentMethods.map((item) => (
              <option key={item._id} value={item.Name}>
                {item.Name || item.type}
              </option>
            ))}
          </select>
        </div>

        <QRSection
          darkMode={darkMode}
          filteredPaymentMethod={filteredPaymentMethod}
          headingColor={headingColor}
          borderColor={borderColor}
          bgMain={bgMain}
          Instructions={Instructions}
        />

        <div>
          <label className="block font-semibold mb-2">Enter UTR</label>
          <input
            type="text"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            required
            className={`w-full ${bgMain} border ${borderColor} rounded-lg px-3 py-2 ${textColor}`}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className={`w-full ${bgMain} border ${borderColor} rounded-lg px-3 py-2 ${textColor}`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-black bg-yellow-400 hover:bg-yellow-500 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Verifying..." : "Verify Transaction"}
        </button>
      </form>
    </div>
  );
}
