"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createOrderAction } from "@/lib/userActions";

export default function BuyPopup({ selectedService, setSelectedService }) {
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [charge, setCharge] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedService && quantity) {
      const rate = parseFloat(selectedService.rate?.toString().replace(/,/g, ""));
      const qty = parseInt(quantity, 10);
      if (!isNaN(rate) && !isNaN(qty)) {
        setCharge(((rate * qty) / 1000).toFixed(2));
      } else {
        setCharge("");
      }
    } else setCharge("");
  }, [quantity, selectedService]);

  useEffect(() => {
    if (!selectedService || !quantity) return;
    const qty = parseInt(quantity, 10);
    if (qty < selectedService.min)
      setQuantityError(`Minimum allowed quantity is ${selectedService.min}`);
    else if (qty > selectedService.max)
      setQuantityError(`Maximum allowed quantity is ${selectedService.max}`);
    else setQuantityError("");
  }, [quantity, selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService || !link || !quantity || !charge) {
      setResponseMessage("⚠️ Please fill all fields before submitting.");
      setResponseType("error");
      return;
    }
    if (quantityError) {
      setResponseMessage("⚠️ Quantity must be within the allowed range.");
      setResponseType("error");
      return;
    }

    setSubmitting(true);
    setResponseMessage("");

    try {
      const service = selectedService.service;
      const res = await createOrderAction(service, link, quantity, charge);

      if (!res.success) {
        setResponseMessage(res?.message || res?.providerError || "Failed to create order");
        setResponseType("error");
        return;
      }

      setResponseMessage(`✅ Order created successfully! ID: ${res.orderId}`);
      setResponseType("success");
      setLink("");
      setQuantity("");
      setCharge("");
    } catch (err) {
      setResponseMessage(`❌ ${err.message}`);
      setResponseType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-3"
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
        className="
          bg-[#1A1F2B] 
          border border-[#4A6CF7]/30 
          p-6 rounded-2xl max-w-md w-full 
          shadow-[0_0_25px_rgba(74,108,247,0.25)]
          text-gray-200
        "
      >
        <h3 className="text-2xl font-bold mb-3 text-[#4A6CF7]">
          Buy {selectedService.name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Link */}
          <input
            type="text"
            placeholder="Enter link or username"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="
              w-full bg-[#0F1117] 
              border border-[#4A6CF7]/30 
              rounded-lg px-3 py-2 text-gray-200 
              placeholder-gray-500 
              focus:ring-1 focus:ring-[#4A6CF7] 
              focus:border-[#4A6CF7] outline-none
            "
          />

          {/* Quantity */}
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="
              w-full bg-[#0F1117] 
              border border-[#4A6CF7]/30 
              rounded-lg px-3 py-2 text-gray-200 
              placeholder-gray-500 
              focus:ring-1 focus:ring-[#4A6CF7] 
              focus:border-[#4A6CF7] outline-none
            "
          />

          {quantityError && (
            <p className="text-sm text-red-400">{quantityError}</p>
          )}

          {/* Charge */}
          <div className="text-sm text-gray-300">
            <strong className="text-[#4A6CF7]">Charge:</strong>{" "}
            {charge ? `₹${charge}` : "—"}
          </div>

          {/* Response */}
          {responseMessage && (
            <p
              className={`text-sm mt-2 ${
                responseType === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {responseMessage}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="
                w-full px-4 py-2 rounded-md 
                bg-[#0F1117] border border-gray-700 
                text-gray-300 hover:bg-gray-800 
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="
                w-full px-4 py-2 rounded-md 
                bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] 
                text-black font-semibold
                hover:opacity-90 transition
                disabled:opacity-50
              "
            >
              {submitting ? "Processing..." : "Confirm"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
