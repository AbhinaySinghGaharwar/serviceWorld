"use client";

import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

export default function AdminLoading() {
   
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0b0b0c] via-[#0e0e0f] to-[#141414] text-yellow-400">
      {/* Animated Logo Ring */}
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 border-t-4 border-yellow-500 rounded-full"></div>
        <div className="absolute inset-2 border-t-4 border-yellow-700 rounded-full opacity-70"></div>
        <FaCrown size={32} className="text-yellow-400 drop-shadow-md" />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-lg font-semibold tracking-wide text-yellow-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
    Fetching Details...
      </motion.p>
    </div>
  );
}
