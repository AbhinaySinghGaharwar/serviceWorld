"use client";

import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function ServiceDetailsPopup({ service, onClose }) {
  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-3"
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="
          bg-white dark:bg-[#1A1F2B]
          border border-gray-300 dark:border-[#2B3143]
          rounded-2xl p-6 w-full max-w-lg 
          shadow-lg text-gray-800 dark:text-gray-100
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Service Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Info Section */}
        <div className="space-y-3">

          <DetailRow label="Service Name" value={service.name} />
          <DetailRow label="Service ID" value={service.service} />
          <DetailRow label="Category" value={service.category || "—"} />
          <DetailRow label="Rate per 1K" value={`₹${service.rate}`} />
          <DetailRow label="Minimum Quantity" value={service.min} />
          <DetailRow label="Maximum Quantity" value={service.max} />
          <DetailRow label="Average Time" value={service.average_time || "N/A"} />
          <DetailRow 
            label="Description"
            value={service.description || "No description available."}
            multiline
          />

        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            mt-6 w-full py-2 rounded-md
            bg-gray-800 dark:bg-gray-700 
            text-white font-semibold
            hover:bg-gray-700 dark:hover:bg-gray-600
            transition
          "
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

/* 🔹 Reusable row for details */
function DetailRow({ label, value, multiline }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </p>
      <p
        className={`
          text-sm text-gray-600 dark:text-gray-400 
          ${multiline ? "whitespace-pre-line mt-1" : ""}
        `}
      >
        {value}
      </p>
    </div>
  );
}
