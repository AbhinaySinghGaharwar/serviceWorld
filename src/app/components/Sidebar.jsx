"use client";

import { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdHistory, MdPayment, MdHelp } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({
  user,
  onLogout,
  selectedMenu,
  setSelectedMenu,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: <MdDashboard />, text: "New Order" },
    { icon: <MdHistory />, text: "Services" },
    { icon: <MdHistory />, text: "Orders History" },
    { icon: <MdPayment />, text: "Add Funds" },
    { icon: <MdHelp />, text: "Tickets Support" },
  ];

  const gradientBG =
    "bg-gradient-to-b from-purple-500 via-indigo-500 to-pink-500";

  // Handle outside clicks on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        window.innerWidth < 768 &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-btn")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button (for Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-btn md:hidden fixed top-4 left-4 z-50 bg-white text-gray-800 p-3 rounded-full shadow-lg"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-btn  fixed top-4 left-10 z-50 bg-white text-gray-800 p-3 rounded-full shadow-lg"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className={`sidebar ${gradientBG}  text-white fixed md:static top-0 left-0 w-64  flex flex-col justify-between shadow-2xl z-40 rounded-r-3xl`}
          >
            {/* User Info */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center py-6 border-b border-white/20">
                <FaUserCircle className="text-5xl text-white mb-2" />
                <h2 className="text-lg font-semibold">
                  {user?.username || "Guest"}
                </h2>
                <p className="text-sm text-white/80">
                  Balance: ₹{user?.balance ?? 0}
                </p>
              </div>

              {/* Menu Items */}
              <nav className="mt-6 space-y-2 px-4">
                {menuItems.map((item, index) => {
                  const isActive = selectedMenu === item.text;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedMenu(item.text)}
                      className={`relative flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        isActive
                          ? "bg-white text-black shadow-lg"
                          : "hover:bg-white/20"
                      }`}
                    >
                      <div className={isActive ? "text-black" : "text-white"}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center justify-center gap-2 mx-4 mb-6 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
            >
              <FiLogOut /> Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

     
    </>
  );
}
