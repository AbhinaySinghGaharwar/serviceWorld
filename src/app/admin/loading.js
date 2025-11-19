"use client";

import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
      bg-gray-100 dark:bg-[#0f1117] 
      text-gray-700 dark:text-gray-300"
    >
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
        <div className="absolute inset-0 border-t-4 border-gray-400 dark:border-gray-600 rounded-full"></div>
        <div className="absolute inset-2 border-t-4 border-gray-300 dark:border-gray-500 rounded-full opacity-70"></div>

        {/* Crown Icon */}
        <FaCrown
          size={32}
          className="text-gray-600 dark:text-gray-400 drop-shadow-sm"
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300 tracking-wide"
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
