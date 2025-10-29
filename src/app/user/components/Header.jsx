"use client";

import { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header({ onMenuToggle }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        router.push("/auth/login");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="w-full bg-white shadow-md flex items-center justify-between px-4 py-3 relative z-50">
      {/* 🔹 Left Side: Logo + Mobile Menu */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="md:hidden text-gray-800 bg-gray-100 p-2 rounded-lg shadow-sm"
        >
          <FaBars size={20} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
            SM
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            InstantSMM
          </h1>
        </Link>
      </div>

      {/* 🔹 Right Side: Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white shadow-md hover:opacity-90 transition"
          >
            <FaUserCircle size={22} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-55 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden animate-fadeIn">
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-gray-800 text-sm"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/user/settings");
                }}
              >
                <FiSettings /> Settings
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 pt-4 hover:bg-gray-100 w-full text-red-600 text-sm"
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
      </div>
    </header>
  );
}
