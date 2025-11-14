"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer({ siteName }) {
  return (
    <footer className="relative bg-[#151517] text-gray-300 py-6 md:py-8 rounded-t-[30px] shadow-xl overflow-hidden border-t border-yellow-500/20">
      {/* 🔥 Animated Yellow Glow Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15, rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px]
          bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-700
          rounded-full blur-3xl absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left relative z-10">
        
        {/* Left Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-1"
        >
          <h3 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 drop-shadow-md">
            Cheapest SMM Panel
          </h3>
          <p className="text-xs md:text-sm text-gray-400">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm font-medium"
        >
          {[
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Refund Policy", href: "/refund-policy" },
            { name: "Contact Us", href: "/contact" },
          ].map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link
                href={link.href}
                className="relative text-gray-300 hover:text-yellow-400 transition-colors duration-300
                after:content-[''] after:absolute after:left-0 after:bottom-[-2px]
                after:w-0 after:h-[2px] after:bg-yellow-400
                hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Divider */}
      <div className="mt-5 border-t border-yellow-500/20 w-full" />

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="text-center text-xs md:text-sm text-gray-400 mt-3 tracking-wide px-3"
      >
        Made with ❤️ by{" "}
        <span className="text-yellow-400 font-semibold">{siteName}</span>
      </motion.p>
    </footer>
  );
}
