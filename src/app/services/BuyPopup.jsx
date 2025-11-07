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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-3"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-[#151517] border border-yellow-500/20 p-6 rounded-2xl max-w-md w-full shadow-2xl text-gray-200"
      >
        <h3 className="text-2xl font-bold mb-3 text-yellow-400">
          Buy {selectedService.name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter link or username"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
          />

          {quantityError && (
            <p className="text-sm text-red-500">{quantityError}</p>
          )}

          <div className="text-sm text-gray-300">
            <strong className="text-yellow-400">Charge:</strong>{" "}
            {charge ? `$${charge}` : "—"}
          </div>

          {responseMessage && (
            <p
              className={`text-sm mt-2 ${
                responseType === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {responseMessage}
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="w-full px-4 py-2 rounded-md bg-[#0e0e0f] border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2 rounded-md bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 font-semibold hover:bg-yellow-500/30 hover:border-yellow-400 transition disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Confirm"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
