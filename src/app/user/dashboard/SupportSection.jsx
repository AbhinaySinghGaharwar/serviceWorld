"use client";

import { useRouter } from "next/navigation";
import { MdSupportAgent } from "react-icons/md";

export default function SupportSection() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#0d0d0f] border border-yellow-500/30 rounded-2xl p-6 sm:p-8 mt-10 text-center shadow-[0_0_15px_rgba(255,255,0,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,0,0.5)]">
      {/* Neon glow behind icon */}
      <div className="absolute inset-0 blur-3xl bg-yellow-500/10 rounded-2xl opacity-40"></div>

      {/* Icon */}
      <MdSupportAgent className="relative text-yellow-400 text-5xl sm:text-6xl mb-3 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)] animate-pulse" />

      {/* Title */}
      <h3 className="relative text-2xl sm:text-3xl font-bold mb-2 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.6)]">
        Need Support?
      </h3>

      {/* Description */}
      <p className="relative text-gray-300 mb-5 max-w-md leading-relaxed">
        We’re here 24/7 to help with orders, payments, or technical issues.
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/user/support")}
        className="relative px-8 py-3 font-semibold rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,0,0.5)] hover:shadow-[0_0_30px_rgba(255,255,0,0.9)]"
      >
        Contact Support
      </button>
    </div>
  );
}
