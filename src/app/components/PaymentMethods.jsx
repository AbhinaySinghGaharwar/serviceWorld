// Updated PaymentMethods with full Light/Dark theme system
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentMethods() {
  return (
    <section className="relative py-16 px-6 md:px-12 bg-[#F5F7FA] dark:bg-[#0F1117] text-[#1A1A1A] dark:text-white overflow-hidden">

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
                opacity: [0.15, 0.8, 0.15],
                x: [`${startX}vw`, `${endX}vw`, `${startX}vw`],
                y: [`${startY}vh`, `${endY}vh`, `${startY}vh`],
              }}
              transition={{ duration: 14 + Math.random() * 8, repeat: Infinity, ease: "linear" }}
              className="absolute bg-[#4A6CF7] rounded-full blur-[2px]"
              style={{ width: size, height: size }}
            />
          );
        })}
      </div>

      {/* Animated Blue/Green Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18, rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[700px] h-[700px] bg-gradient-to-tr from-[#4A6CF7] via-[#16D1A5] to-[#4A6CF7] rounded-full blur-[150px]"
        />
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] bg-clip-text text-transparent"
      >
        We Accept Multiple Payment Methods
      </motion.h2>

      {/* Images */}
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
            className="object-contain"
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
            className="rounded-xl shadow-[0_0_20px_rgba(74,108,247,0.2)] border border-[#4A6CF7]/30 object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}