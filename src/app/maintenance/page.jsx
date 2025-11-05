"use client";

import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0e0e0f] text-center p-6 relative overflow-hidden">
      {/* 🌟 Animated Glow Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{ scale: 1.1, opacity: 0.3, rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-[600px] h-[600px] bg-gradient-to-tr from-yellow-500/20 via-yellow-300/10 to-transparent rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* 🛠️ Maintenance Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-[#151517]/90 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.1)] p-8 sm:p-10"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-yellow-400 text-6xl mb-5 flex justify-center"
        >
          <FaTools className="drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">
          Under Maintenance
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
          Our website is currently undergoing scheduled maintenance to bring you an even better experience.  
          <br className="hidden sm:block" /> We’ll be back shortly — thank you for your patience!
        </p>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 text-yellow-400 font-semibold">
          <motion.span
            className="w-3 h-3 bg-yellow-400 rounded-full"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>System Maintenance in Progress...</span>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </motion.div>
    </div>
  );
}
