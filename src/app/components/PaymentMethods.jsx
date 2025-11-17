"use client";
import Image from "next/image";

export default function PaymentMethods() {
  return (
    <section className="py-16 px-6 md:px-12 bg-[#F5F7FA] dark:bg-[#0F1117] text-[#1A1A1A] dark:text-white">

      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] bg-clip-text text-transparent">
        We Accept Multiple Payment Methods
      </h2>

      {/* Images */}
      <div className="flex flex-col items-center justify-center">

        {/* Desktop Image */}
        <div className="hidden md:block">
          <Image
            src="https://cdn.mypanel.link/hmz1fi/srtwbbr2kkl8qjg8.png"
            alt="payment methods desktop"
            width={1000}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Mobile Image */}
        <div className="md:hidden">
          <Image
            src="https://cdn.mypanel.link/hmz1fi/187e2gr6e4bsaxz1.png"
            alt="payment methods mobile"
            width={400}
            height={400}
            className="rounded-xl shadow-[0_0_20px_rgba(74,108,247,0.2)] border border-[#4A6CF7]/30 object-contain"
          />
        </div>

      </div>
    </section>
  );
}
