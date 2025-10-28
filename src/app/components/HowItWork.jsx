"use client";

import { motion } from "framer-motion";
import { FaUserAlt, FaLink } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";

export default function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 py-24 overflow-hidden">
      {/* Gradient glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-indigo-400/40 to-fuchsia-400/40 rounded-full blur-[120px] top-10 left-10 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full blur-[160px] bottom-0 right-0 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-purple-600"
        >
          How It Works
        </motion.h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20 relative">
          <Step
            icon={<FaUserAlt className="text-4xl text-fuchsia-600" />}
            title="Create An Account & Add Balance"
            text="Register, log in securely, and top up your account to unlock premium services."
            delay={0.1}
          />

          <AnimatedConnector />

          <Step
            icon={<MdHomeRepairService className="text-4xl text-purple-600" />}
            title="Select Your Targeted Service"
            text="Choose from verified, high-quality services that help you grow fast."
            delay={0.3}
          />

          <AnimatedConnector />

          <Step
            icon={<FaLink className="text-4xl text-indigo-600" />}
            title="Provide Link & Watch Results!"
            text="Enter your URL and quantity — sit back and watch your results roll in."
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
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center text-center max-w-xs p-6 rounded-2xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative mb-6">
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500 flex items-center justify-center text-white shadow-md"
          animate={{
            boxShadow: [
              "0 0 15px rgba(236,72,153,0.4)",
              "0 0 25px rgba(99,102,241,0.5)",
              "0 0 15px rgba(236,72,153,0.4)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
        <motion.span
          className="absolute inset-0 rounded-full border border-indigo-200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
      </div>

      <h4 className="text-lg font-semibold mb-2 text-gray-900">
        {title}
      </h4>
      <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

function AnimatedConnector() {
  return (
    <div className="hidden md:flex items-center justify-center w-20 h-[2px] relative">
      <motion.div
        className="absolute w-full h-[3px] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-full shadow-md"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
