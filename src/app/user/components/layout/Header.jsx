"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";

export default function Header({
  dark = true,
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  menuOpen,
  setMenuOpen,
  handleLogout,
  toggleDarkMode,
  currency = "INR",
  websitename = "MyWebsite",
}) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "flex items-center justify-between px-4 py-3 sticky top-0 z-30 backdrop-blur-lg border-b border-yellow-500/10 transition-colors",
        dark ? "bg-[#111112]/90" : "bg-white/90 text-gray-900",
        scrolled && "shadow-lg"
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
        >
          <FaBars size={20} />
        </button>
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-wide"
        >
          {websitename.siteName}
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 transition"
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* 💰 Balance */}
     
         {user?.balance != null && (
  <div className="hidden sm:flex flex-col items-end">
    <span className="text-sm text-gray-400">Balance</span>
    <span className="text-lg font-bold text-yellow-400">
      {currency === "USD" ? "$" : "₹"}
      {user.balance}
    </span>
  </div>
)}

        

        {/* Profile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
        >
          <FaUserCircle size={22} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-12 w-48 bg-[#1b1b1c] text-gray-100 rounded-xl shadow-lg border border-yellow-500/20 overflow-hidden z-50">
            <button
              className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-500/10 w-full text-sm"
              onClick={() => {
                setMenuOpen(false);
                router.push("/user/settings");
              }}
            >
              <FiSettings /> Settings
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-yellow-500/10 w-full text-sm"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
