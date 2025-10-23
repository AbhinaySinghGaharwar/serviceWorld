"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Updates", href: "/updates" },
    { name: "API", href: "/apiv2" },
    { name: "SignUp", href: "/auth/signup" },
  ];

  const gradientText =
    "bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text";

  // Disable background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <header className="w-full flex justify-center bg-gray-100 shadow-md z-50">
      <div className="w-full max-w-[1100px] py-4 px-4 md:px-6 flex items-center justify-between bg-white rounded-3xl shadow-lg shadow-gray-300/40 relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            SM
          </div>
          <h1
            className={`text-lg md:text-2xl font-semibold ${gradientText}`}
          >
            InstantSMM
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center text-base md:text-lg flex-1 justify-center">
          {menuItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={i}
                href={item.href}
                className={`group relative font-medium text-black transition-colors duration-300 ${
                  isActive ? gradientText : ""
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-1/2 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transition-all duration-300 ${
                    isActive
                      ? "w-full -translate-x-1/2"
                      : "w-0 group-hover:w-full -translate-x-1/2"
                  }`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Login Button */}
        <Link href="/auth/login" className="hidden md:block">
          <button className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white text-base hover:opacity-90 transition">
            Login
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: isOpen ? 0 : "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center gap-6 z-40 rounded-b-3xl shadow-2xl`}
        >
          {menuItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl ${
                    isActive ? gradientText : "text-black"
                  } hover:underline`}
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}

          <Link href="/auth/login" onClick={() => setIsOpen(false)}>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
              Login
            </button>
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
