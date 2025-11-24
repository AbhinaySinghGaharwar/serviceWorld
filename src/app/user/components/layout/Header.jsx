"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BalanceDisplay from "./BalanceDisplay";
import { FaBars, FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import UserDropdown from "./UserProfileDropdown";

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
  console.log(user)
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
        "dark:bg-[#0F1117]/90 dark:text-white dark:border-gray-700",

        /* LIGHT MODE */
        "bg-white/90 text-gray-700 border-gray-300",

        scrolled && "shadow-xl shadow-black/10 dark:shadow-black/30"
      )}
    >
      {/* LEFT section */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="
            p-2 rounded-lg transition

            /* Dark */
            dark:bg-white/10 dark:text-white dark:hover:bg-white/20

            /* Light */
            bg-gray-100 text-gray-700 hover:bg-gray-200
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
            dark:text-white

            /* Light */
            text-gray-700
          "
        >
          {websitename?.siteName}
        </Link>
      </div>

      {/* RIGHT Section */}
      <div className="flex items-center gap-4 relative">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="
            p-2 rounded-full transition

            /* Dark */
            dark:bg-white/10 dark:text-white dark:hover:bg-white/20

            /* Light */
            bg-gray-100 text-gray-700 hover:bg-gray-200
          "
        >
          {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Balance */}
        <BalanceDisplay balance={user?.balance} />

        {/* Profile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            flex items-center justify-center w-10 h-10 rounded-full transition

            /* Dark */
            dark:bg-white/10 dark:text-white dark:hover:bg-white/20

            /* Light */
            bg-gray-100 text-gray-700 hover:bg-gray-200
          "
        >
          <img
  src={user?.avatar}       // replace with your image path
  alt="menu"
  className="w-6 h-6 object-cover"    // same size as size={20}
 />
        </button>

        {/* Dropdown Component */}
        <UserDropdown
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onSettings={() => router.push("/user/settings")}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
}
