// Updated HowItWorks component with Light/Dark theme system
"use client";

import { motion } from "framer-motion";
import { FaUserAlt, FaLink } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";

export default function HowItWorks() {
  return (
    <section
      className="relative py-24 bg-[#F5F7FA] dark:bg-[#0F1117] text-[#1A1A1A] dark:text-white overflow-hidden"
    >
      {/* Floating Blue Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(45)].map((_, i) => {
          const size = Math.random() * 3 + 2;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const endX = Math.random() * 100;
          const endY = Math.random() * 100;

          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: `${startX}vw`, y: `${startY}vh` }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                x: [`${startX}vw`, `${endX}vw`, `${startX}vw`],
                y: [`${startY}vh`, `${endY}vh`, `${startY}vh`],
              }}
              transition={{ duration: 12 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
              className="absolute bg-[#4A6CF7] rounded-full blur-[2px]"
              style={{ width: size, height: size }}
            />
          );
        })}
      </div>

      {/* Blue Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-[#4A6CF7]/20 rounded-full blur-[140px] top-10 left-10 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-[#16D1A5]/20 rounded-full blur-[180px] bottom-0 right-0 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#4A6CF7] via-[#16D1A5] to-[#4A6CF7]"
        >
          How It Works
        </motion.h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20 relative">
          <Step
            icon={<FaUserAlt className="text-4xl text-[#4A6CF7]" />}
            title="Create Account & Add Balance"
            text="Register quickly, login securely, and top up your wallet to start using premium SMM services."
            delay={0.1}
          />

          <Connector />

          <Step
            icon={<MdHomeRepairService className="text-4xl text-[#4A6CF7]" />}
            title="Choose Your Service"
            text="Explore our verified high-quality social media services tailored for fast growth."
            delay={0.3}
          />

          <Connector />

          <Step
            icon={<FaLink className="text-4xl text-[#4A6CF7]" />}
            title="Provide Link & Enjoy Results"
            text="Submit your URL and quantity. Relax while the results are delivered automatically."
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}

function Step({ icon, title, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center max-w-xs p-6 rounded-2xl 
                 bg-white dark:bg-[#1A1F2B] border border-[#4A6CF7]/20 shadow-lg 
                 hover:shadow-[#4A6CF7]/30 transition-all duration-300"
    >
      <div className="relative mb-6">
        {/* Glow Icon */}
        <motion.div
          className="w-20 h-20 rounded-full bg-[#F5F7FA] dark:bg-[#0F1117] border border-[#4A6CF7]/40 
                     flex items-center justify-center text-[#4A6CF7] shadow-[0_0_20px_rgba(74,108,247,0.3)]"
          animate={{
            boxShadow: [
              "0 0 20px rgba(74,108,247,0.3)",
              "0 0 40px rgba(22,209,165,0.5)",
              "0 0 20px rgba(74,108,247,0.3)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>

        <motion.span
          className="absolute inset-0 rounded-full border border-[#4A6CF7]/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
      </div>

      <h4 className="text-lg font-semibold text-[#4A6CF7] mb-2">{title}</h4>

      <p className="text-[#4A5568] dark:text-[#A0AEC3] text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

function Connector() {
  return (
    <div className="hidden md:flex items-center justify-center w-20 h-[2px] relative">
      <motion.div
        className="absolute w-full h-[3px] bg-gradient-to-r from-[#4A6CF7] via-[#16D1A5] to-[#4A6CF7] rounded-full"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] rounded-full shadow-[0_0_15px_rgba(74,108,247,0.6)]"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}