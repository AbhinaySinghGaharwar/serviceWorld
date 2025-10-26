"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Header({ onMenuToggle }) {
  return (
    <header className="w-full bg-white shadow-md flex items-center justify-between px-4 py-3">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
          SM
        </div>
        <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
          InstantSMM
        </h1>
      </div>

      {/* Hamburger for mobile */}
      <button
        onClick={onMenuToggle}
        className="md:hidden text-gray-800 bg-gray-100 p-2 rounded-lg shadow-sm"
      >
        <FaBars size={20} />
      </button>
    </header>
  );
}
