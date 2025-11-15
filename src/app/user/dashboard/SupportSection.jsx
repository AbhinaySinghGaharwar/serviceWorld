"use client";

import { useRouter } from "next/navigation";
import { MdSupportAgent } from "react-icons/md";

export default function SupportSection() {
  const router = useRouter();

  return (
    <div
      className="
        relative flex flex-col items-center justify-center 
        bg-[#1A1F2B]
        border border-[#2B3143] 
        rounded-2xl 
        p-6 sm:p-8 mt-10 text-center 
        shadow-lg shadow-[#4A6CF7]/10
        hover:shadow-[#4A6CF7]/20
        transition-all duration-300
      "
    >
      {/* Blue Glow */}
      <div className="absolute inset-0 blur-2xl bg-[#4A6CF7]/10 rounded-2xl opacity-40"></div>

      {/* Icon */}
      <MdSupportAgent
        className="
          relative text-5xl sm:text-6xl 
          text-[#4A6CF7]
          drop-shadow-[0_0_12px_rgba(74,108,247,0.6)]
          animate-pulse
        "
      />

      {/* Title */}
      <h3
        className="
          relative text-2xl sm:text-3xl font-bold 
          text-[#4A6CF7]
          drop-shadow-[0_0_8px_rgba(74,108,247,0.6)]
          mt-3
        "
      >
        Need Support?
      </h3>

      {/* Description */}
      <p className="relative text-[#A0AEC3] mb-5 max-w-md leading-relaxed mt-2">
        We’re here 24/7 to help with orders, payments, or technical issues.
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/user/support")}
        className="
          relative px-8 py-3 font-semibold rounded-full 
          bg-[#4A6CF7] text-white
          hover:bg-[#3c59e4]
          transition-all duration-300
          shadow-md shadow-[#4A6CF7]/40 hover:shadow-[#4A6CF7]/60
        "
      >
        Contact Support
      </button>
    </div>
  );
}
