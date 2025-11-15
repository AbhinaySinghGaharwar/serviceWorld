"use client";

import { useEffect, useState } from "react";
import AddFundForm from "./AddFundForm";
import TransactionHistory from "./TransactionHistory";
import PopupMessage from "./PopupMessage";
import useTheme from "./useTheme";

export default function AddFund({ paymentMethods = [], transactions = [] }) {
  const [paymentType, setPaymentType] = useState(paymentMethods[0]?.type);
  const [utr, setUtr] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    visible: false,
    success: false,
    message: "",
    transaction: null,
  });

  const [instructions, setInstructions] = useState("");
  const [filteredPaymentMethod, setFilteredPaymentMethod] = useState("");

  const darkMode = useTheme();

  // 🎯 Update QR + Instructions when payment method changes
  useEffect(() => {
    const match = paymentMethods.find((i) => i.type === paymentType);
    setInstructions(match?.instruction || "");
    setFilteredPaymentMethod(match?.qrImage || "");
  }, [paymentType, paymentMethods]);

  // 🎨 THEME colors
  const bgMain = darkMode ? "bg-[#0C0F17]" : "bg-gray-100";
  const bgCard = darkMode ? "bg-[#1A1F2B]" : "bg-white";
  const borderColor = darkMode ? "border-[#4A6CF7]/20" : "border-gray-300";
  const textColor = darkMode ? "text-gray-200" : "text-gray-800";
  const headingColor = darkMode ? "text-[#4A6CF7]" : "text-[#4A6CF7]";

  return (
    <div className={`min-h-screen ${bgMain} ${textColor} flex justify-center px-4 md:px-6 py-8`}>
      
      <div className="w-full max-w-6xl space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">

        {/* LEFT: Add Fund Form */}
        <AddFundForm
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          utr={utr}
          setUtr={setUtr}
          amount={amount}
          setAmount={setAmount}
          filteredPaymentMethod={filteredPaymentMethod}
          paymentMethods={paymentMethods}
          loading={loading}
          setLoading={setLoading}
          setPopup={setPopup}
          darkMode={darkMode}
          instructions={instructions}
        />

        {/* RIGHT: Transaction History */}
        <TransactionHistory
          transactions={transactions}
          darkMode={darkMode}
          headingColor={headingColor}
          borderColor={borderColor}
        />
      </div>

      {/* POPUP MESSAGE */}
      {popup.visible && (
        <PopupMessage
          popup={popup}
          setPopup={setPopup}
          darkMode={darkMode}
          bgCard={bgCard}
          borderColor={borderColor}
          bgMain={bgMain}
        />
      )}
    </div>
  );
}
