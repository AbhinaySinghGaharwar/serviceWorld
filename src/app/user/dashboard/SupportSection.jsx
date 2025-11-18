"use client";

import { useRouter } from "next/navigation";
import { MdSupportAgent } from "react-icons/md";

export default function SupportSection() {
  const router = useRouter();

  return (
    <div
      className="
        relative flex flex-col items-center justify-center 
        rounded-2xl 
        p-6 sm:p-8 mt-10 text-center 
        transition-all duration-300

        /* Dark Mode Box */
        dark:bg-[#1A1F2B] dark:border-[#2B3143]
        dark:shadow-lg dark:shadow-[#4A6CF7]/10
        dark:hover:shadow-[#4A6CF7]/20

        /* Light Mode Box */
        bg-white border-gray-200
        shadow-md hover:shadow-lg
      "
    >
      {/* Glow Background */}
      <div
        className="
          absolute inset-0 blur-2xl rounded-2xl opacity-40

          /* Dark Mode Glow */
          dark:bg-[#4A6CF7]/10

          /* Light Mode Glow */
          bg-[#4A6CF7]/5
        "
      ></div>

      {/* Icon */}
      <MdSupportAgent
        className="
          relative text-5xl sm:text-6xl 

          /* Dark Mode */
          dark:text-[#4A6CF7] 
          dark:drop-shadow-[0_0_12px_rgba(74,108,247,0.6)]

          /* Light Mode */
          text-[#3B4B7D]
        "
      />

      {/* Title */}
      <h3
        className="
          relative text-2xl sm:text-3xl font-bold mt-3

          /* Dark Mode Title */
          dark:text-[#4A6CF7]
          dark:drop-shadow-[0_0_8px_rgba(74,108,247,0.6)]

          /* Light Mode Title */
          text-[#2D3A63]
        "
      >
        Need Support?
      </h3>

      {/* Description */}
      <p
        className="
          relative mb-5 max-w-md leading-relaxed mt-2

          /* Dark Mode Description */
          dark:text-[#A0AEC3]

          /* Light Mode Description */
          text-gray-600
        "
      >
        We’re here 24/7 to help with orders, payments, or technical issues.
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/user/support")}
        className="
          relative px-8 py-3 font-semibold rounded-full 
          transition-all duration-300

          /* Dark Mode Button */
          dark:bg-[#4A6CF7] dark:text-white
          dark:hover:bg-[#3c59e4]
          dark:shadow-md dark:shadow-[#4A6CF7]/40 
          dark:hover:shadow-[#4A6CF7]/60

          /* Light Mode Button */
          bg-[#4A6CF7] text-white
          hover:bg-[#3A5BE0]
          shadow-md shadow-[#4A6CF7]/30 hover:shadow-[#4A6CF7]/40
        "
      >
        Contact Support
      </button>
    </div>
  );
}
