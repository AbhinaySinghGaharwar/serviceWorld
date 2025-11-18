"use client";

import { useEffect, useState } from "react";
import AddFundForm from "./AddFundForm";
import TransactionHistory from "./TransactionHistory";
import PopupMessage from "./PopupMessage";

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

  // Update QR + instructions
  useEffect(() => {
    const match = paymentMethods.find((i) => i.type === paymentType);
    setInstructions(match?.instruction || "");
    setFilteredPaymentMethod(match?.qrImage || "");
  }, [paymentType, paymentMethods]);

  return (
    <div
      className="
        min-h-screen
        bg-gray-100 text-gray-800
        dark:bg-[#0C0F17] dark:text-gray-200
        flex justify-center
        px-4 md:px-6 py-8
      "
    >
      <div className="
        w-full max-w-6xl 
        space-y-6 
        md:space-y-0 md:grid md:grid-cols-2 md:gap-6
      ">

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
          instructions={instructions}
        />

        {/* RIGHT: Transaction History */}
        <TransactionHistory
          transactions={transactions}
        />
      </div>

      {/* POPUP MESSAGE */}
      {popup.visible && (
        <PopupMessage
          popup={popup}
          setPopup={setPopup}
          bgCard="bg-white dark:bg-[#1A1F2B]"
          borderColor="border-gray-300 dark:border-[#2B3143]"
          bgMain="bg-gray-100 dark:bg-[#0C0F17]"
        />
      )}
    </div>
  );
}
