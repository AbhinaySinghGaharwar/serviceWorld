"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      
      {/* Logo Wrapper */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full 
                   bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500
                   flex items-center justify-center
                   shadow-[0_0_35px_rgba(168,85,247,0.55)]"
      >
        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
          <Image
            src="/fav.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Text */}
      {message && (
        <p className="mt-5 text-sm text-gray-300 tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
}
