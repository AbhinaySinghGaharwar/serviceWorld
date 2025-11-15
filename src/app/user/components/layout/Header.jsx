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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "flex items-center justify-between px-4 py-3 sticky top-0 z-30 backdrop-blur-lg transition-all border-b",
        dark
          ? "bg-[#0F1117]/90 text-white border-[#2B3143]"
          : "bg-white/90 text-[#1A1A1A] border-gray-300",
        scrolled && "shadow-xl shadow-black/10 dark:shadow-black/30"
      )}
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="
            p-2 rounded-lg
            bg-[#4A6CF7]/15
            text-[#4A6CF7]
            hover:bg-[#4A6CF7]/25
            transition
          "
        >
          <FaBars size={20} />
        </button>

        {/* Website Title */}
        <Link
          href="/"
          className="
            text-xl sm:text-2xl font-bold tracking-wide
            text-[#4A6CF7]
          "
        >
          {websitename.siteName}
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="
            p-2 rounded-full
            bg-[#4A6CF7]/15 
            hover:bg-[#4A6CF7]/25
            text-[#4A6CF7]
            transition
          "
        >
          {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Balance */}
        {user?.balance != null && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm text-[#A0AEC3]">Balance</span>
            <span className="text-lg font-bold text-[#16D1A5]">
              {currency === "USD" ? "$" : "₹"}
              {Number(user.balance).toFixed(2)}
            </span>
          </div>
        )}

        {/* Profile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            flex items-center justify-center w-10 h-10 rounded-full
            bg-[#4A6CF7]/15
            text-[#4A6CF7]
            hover:bg-[#4A6CF7]/25
            transition
          "
        >
          <FaUserCircle size={22} />
        </button>

        {/* Profile Dropdown */}
        {menuOpen && (
          <div
            className="
              absolute right-0 top-12 w-48 rounded-xl overflow-hidden
              bg-white dark:bg-[#1A1F2B]
              border border-gray-300 dark:border-[#2B3143]
              shadow-xl shadow-black/10 dark:shadow-black/30
              z-50
            "
          >
            {/* Settings */}
            <button
              className="
                flex items-center gap-2 px-4 py-2 w-full text-sm
                hover:bg-[#4A6CF7]/10 dark:hover:bg-[#4A6CF7]/20
                text-[#1A1A1A] dark:text-[#A0AEC3]
                transition
              "
              onClick={() => {
                setMenuOpen(false);
                router.push("/user/settings");
              }}
            >
              <FiSettings className="text-[#4A6CF7]" /> Settings
            </button>

            {/* Logout */}
            <button
              className="
                flex items-center gap-2 px-4 py-2 w-full text-sm
                text-red-500 hover:bg-red-500/10 transition
              "
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
