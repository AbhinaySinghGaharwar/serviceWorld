"use client";

import { FaUserAlt, FaLink } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";

export default function HowItWorks() {
  return (
    <section
      className="py-24 bg-[#F5F7FA] dark:bg-[#0F1117] text-[#1A1A1A] dark:text-white"
    >
      <div className="container mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#4A6CF7] via-[#16D1A5] to-[#4A6CF7]">
          How It Works
        </h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20">

          <Step
            icon={<FaUserAlt className="text-4xl text-[#4A6CF7]" />}
            title="Create Account & Add Balance"
            text="Register quickly, login securely, and top up your wallet to start using premium SMM services."
          />

          <Connector />

          <Step
            icon={<MdHomeRepairService className="text-4xl text-[#4A6CF7]" />}
            title="Choose Your Service"
            text="Explore our verified high-quality social media services tailored for fast growth."
          />

          <Connector />

          <Step
            icon={<FaLink className="text-4xl text-[#4A6CF7]" />}
            title="Provide Link & Enjoy Results"
            text="Submit your URL and quantity. Relax while the results are delivered automatically."
          />

        </div>
      </div>
    </section>
  );
}

function Step({ icon, title, text }) {
  return (
    <div
      className="flex flex-col items-center text-center max-w-xs p-6 rounded-2xl 
                 bg-white dark:bg-[#1A1F2B] border border-[#4A6CF7]/20 shadow-lg 
                 transition-colors"
    >
      <div className="w-20 h-20 rounded-full bg-[#F5F7FA] dark:bg-[#0F1117] border border-[#4A6CF7]/40 
                      flex items-center justify-center mb-6 shadow-md">
        {icon}
      </div>

      <h4 className="text-lg font-semibold text-[#4A6CF7] mb-2">{title}</h4>

      <p className="text-[#4A5568] dark:text-[#A0AEC3] text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Connector() {
  return (
    <div className="hidden md:flex items-center justify-center w-20">
      <div className="w-full h-[3px] bg-gradient-to-r from-[#4A6CF7] via-[#16D1A5] to-[#4A6CF7] rounded-full" />
    </div>
  );
}
