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

        /* DARK MODE */
        "dark:bg-[#0F1117]/90 dark:text-white dark:border-[#2B3143]",

        /* LIGHT MODE */
        "bg-white/90 text-[#1A1A1A] border-gray-300",

        scrolled && "shadow-xl shadow-black/10 dark:shadow-black/30"
      )}
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">

        {/* Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="
            p-2 rounded-lg transition

            /* Dark */
            dark:bg-[#4A6CF7]/15 dark:text-[#4A6CF7] dark:hover:bg-[#4A6CF7]/25

            /* Light */
            bg-[#4A6CF7]/10 text-[#4A6CF7] hover:bg-[#4A6CF7]/20
          "
        >
          <FaBars size={20} />
        </button>

        {/* Website Title */}
        <Link
          href="/"
          className="
            text-xl sm:text-2xl font-bold tracking-wide

            /* Dark */
            dark:text-[#4A6CF7]

            /* Light */
            text-[#4157C8]
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
            p-2 rounded-full transition

            /* Dark */
            dark:bg-[#4A6CF7]/15 dark:hover:bg-[#4A6CF7]/25 dark:text-[#4A6CF7]

            /* Light */
            bg-[#4A6CF7]/10 hover:bg-[#4A6CF7]/20 text-[#4A6CF7]
          "
        >
          {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Balance */}
        {user?.balance != null && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm dark:text-[#A0AEC3] text-gray-500">
              Balance
            </span>
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
            flex items-center justify-center w-10 h-10 rounded-full transition

            /* Dark */
            dark:bg-[#4A6CF7]/15 dark:text-[#4A6CF7] dark:hover:bg-[#4A6CF7]/25

            /* Light */
            bg-[#4A6CF7]/10 text-[#4A6CF7] hover:bg-[#4A6CF7]/20
          "
        >
          <FaUserCircle size={22} />
        </button>

        {/* Profile Dropdown */}
        {menuOpen && (
          <div
            className="
              absolute right-0 top-12 w-48 rounded-xl overflow-hidden z-50
              transition border shadow-xl

              /* Dark */
              dark:bg-[#1A1F2B] dark:border-[#2B3143] dark:shadow-black/30

              /* Light */
              bg-white border-gray-200 shadow-black/10
            "
          >
            {/* Settings */}
            <button
              className="
                flex items-center gap-2 px-4 py-2 w-full text-sm transition

                /* Dark */
                dark:hover:bg-[#4A6CF7]/20 dark:text-[#A0AEC3]

                /* Light */
                hover:bg-[#4A6CF7]/10 text-[#1A1A1A]
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
                flex items-center gap-2 px-4 py-2 w-full text-sm transition
                text-red-500

                /* Dark */
                dark:hover:bg-red-500/20

                /* Light */
                hover:bg-red-500/10
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
