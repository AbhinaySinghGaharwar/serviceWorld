"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentMethods() {
  return (
    <section className="relative bg-[#0e0e0f] py-16 px-6 md:px-12 rounded-2xl mt-16 overflow-hidden shadow-[0_0_40px_rgba(255,221,64,0.12)]">
      
      {/* ✨ Animated Golden Glow Background */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18, rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[700px] h-[700px] bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-700 rounded-full blur-[150px]"
        />
      </div>

      {/* 💳 Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl md:text-4xl font-bold mb-12 
                   bg-gradient-to-r from-yellow-500 to-yellow-300 
                   bg-clip-text text-transparent"
      >
        We Accept Multiple Payment Methods
      </motion.h2>

      {/* 📸 Images */}
      <div className="flex flex-col items-center justify-center">

        {/* Desktop Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <Image
            src="https://cdn.mypanel.link/hmz1fi/srtwbbr2kkl8qjg8.png"
            alt="payment methods desktop"
            width={1000}
            height={400}
            className="rounded-xl shadow-[0_0_25px_rgba(255,221,64,0.2)] border border-yellow-500/20 object-contain"
          />
        </motion.div>

        {/* Mobile Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:hidden"
        >
          <Image
            src="https://cdn.mypanel.link/hmz1fi/187e2gr6e4bsaxz1.png"
            alt="payment methods mobile"
            width={400}
            height={400}
            className="rounded-xl shadow-[0_0_20px_rgba(255,221,64,0.15)] border border-yellow-500/20 object-contain"
          />
        </motion.div>

      </div>
    </section>
  );
}
