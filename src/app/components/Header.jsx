"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCogs, FaCode, FaBlog } from "react-icons/fa";
import Link from "next/link";

export default function Navbar({ logo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#0e0e0f]/90 backdrop-blur-md shadow-lg border-b border-yellow-500/20 transition-all duration-300">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="SMM World Panel Logo"
            className="h-14 sm:h-16 w-auto hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,221,64,0.3)]"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
          <li>
            <Link
              href="/services"
              className="flex items-center hover:text-yellow-400 transition-colors"
            >
              <FaCogs className="text-yellow-400 mr-2 text-[18px]" />
              Services
            </Link>
          </li>

          <li>
            <Link
              href="/apiv2"
              className="flex items-center hover:text-yellow-400 transition-colors"
            >
              <FaCode className="text-yellow-400 mr-2 text-[18px]" />
              API
            </Link>
          </li>

          <li>
            <Link
              href="/blogs"
              className="flex items-center hover:text-yellow-400 transition-colors"
            >
              <FaBlog className="text-yellow-400 mr-2 text-[18px]" />
              Blogs
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/auth/login"
            className="px-5 py-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black rounded-full font-semibold shadow-[0_0_15px_rgba(255,221,64,0.3)] hover:shadow-[0_0_20px_rgba(255,221,64,0.5)] hover:scale-[1.03] transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-5 py-2 bg-gradient-to-r from-yellow-700 to-yellow-500 text-black rounded-full font-semibold shadow-[0_0_15px_rgba(255,221,64,0.3)] hover:shadow-[0_0_20px_rgba(255,221,64,0.5)] hover:scale-[1.03] transition"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-yellow-400 focus:outline-none hover:scale-110 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#151517] border-t border-yellow-500/20 shadow-inner"
          >
            <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300 font-medium">
              <li>
                <Link
                  href="/services"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/apiv2"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Blogs
                </Link>
              </li>

              {/* Mobile Buttons */}
              <div className="flex flex-col space-y-3 w-3/4 pt-2">
                <Link
                  href="/auth/login"
                  className="block text-center px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black rounded-full font-semibold shadow-[0_0_15px_rgba(255,221,64,0.3)] hover:shadow-[0_0_20px_rgba(255,221,64,0.5)] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="block text-center px-4 py-2 bg-gradient-to-r from-yellow-700 to-yellow-500 text-black rounded-full font-semibold shadow-[0_0_15px_rgba(255,221,64,0.3)] hover:shadow-[0_0_20px_rgba(255,221,64,0.5)] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
