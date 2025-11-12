"use client";

import { useEffect, useState } from "react";
import AddFundForm from "./AddFundForm";
import TransactionHistory from "./TransactionHistory";
import PopupMessage from "./PopupMessage";
import useTheme from "./useTheme";

export default function AddFund({paymentMethods=[],transactions=[]}) {
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
  const [Instructions,setInstructions]=useState('')
  
  const [filteredPaymentMethod, setFilteredPaymentMethod] = useState("");
  const darkMode = useTheme();



  // ✅ Update QR image on type change
  useEffect(() => {
    const matched = paymentMethods.find((i) => i.type === paymentType);
    setInstructions(matched?.instruction)
    setFilteredPaymentMethod(matched?.qrImage || "");

  }, [paymentType, paymentMethods]);

  const bgMain = darkMode ? "bg-[#0e0e0f]" : "bg-gray-50";
  const bgCard = darkMode ? "bg-[#151517]" : "bg-white";
  const borderColor = darkMode ? "border-yellow-500/20" : "border-gray-300";
  const textColor = darkMode ? "text-gray-300" : "text-gray-800";
  const headingColor = darkMode ? "text-yellow-400" : "text-yellow-600";

  return (
    <div
      className={`min-h-screen ${bgMain} ${textColor} flex justify-center px-4 md:px-6 py-8`}
    >
      <div className="w-full max-w-6xl space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
        <AddFundForm
          {...{
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
          }}
        />
        <TransactionHistory
          transactions={transactions}
          darkMode={darkMode}
          headingColor={headingColor}
          borderColor={borderColor}
        />
      </div>

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
