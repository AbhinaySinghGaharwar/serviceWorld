"use client";

import { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useRouter } from "next/navigation";
export default function Header({ onMenuToggle }) {
  const router=useRouter()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md flex items-center justify-between px-4 py-3 relative z-50">
      {/* 🔹 Logo */}
      
      <div className="flex items-center gap-3">
         {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="md:hidden text-gray-800 bg-gray-100 p-2 rounded-lg shadow-sm"
        >
          <FaBars size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
          SM
        </div>
        <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
          InstantSMM
        </h1>
      </div>

      {/* 🔹 Right Side: Profile + Hamburger */}
      <div className="flex items-center gap-4">
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white shadow-md"
          >
            <FaUserCircle size={22} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-gray-800 text-sm"
                onClick={() =>router.push('/user/settings') }
              >
                <FiSettings /> Settings
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-red-600 text-sm"
                onClick={() => {
                   const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        router.push("/auth/login");
      } else alert("Logout failed. Please try again.");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  handleLogout()
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
