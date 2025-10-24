"use client";

import { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdHistory, MdPayment, MdHelp } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ onLogout, selectedMenu, setSelectedMenu }) {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  const menuItems = [
    { icon: <MdDashboard />, text: "New Order" },
    { icon: <MdHistory />, text: "Services" },
    { icon: <MdHistory />, text: "Orders History" },
    { icon: <MdPayment />, text: "Add Funds" },
    { icon: <MdHelp />, text: "Tickets Support" },
  ];

  const gradientBG = "bg-gradient-to-b from-purple-500 via-indigo-500 to-pink-500";

  // Fetch user profile on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/uploadProfile", {
          headers: {
            "x-user-email": localStorage.getItem("email"), // or JWT logic
          },
        });
        const data = await res.json();
        console.log(data)
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

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

  // Handle profile image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("username", user.username);
      formData.append("email", user.email);

      const res = await fetch("/api/uploadProfile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, avatar: data.avatar });
        alert("Profile image uploaded!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Hamburger Buttons */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-btn md:hidden fixed top-4 left-4 z-50 bg-white text-gray-800 p-3 rounded-full shadow-lg"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-btn fixed top-4 left-10 z-50 bg-white text-gray-800 p-3 rounded-full shadow-lg"
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
            className={`sidebar ${gradientBG} text-white fixed md:static top-0 left-0 w-64 flex flex-col justify-between shadow-2xl z-40 rounded-r-3xl`}
          >
            {/* User Info */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center py-6 border-b border-white/20">
                <label className="cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className={`w-24 h-24 rounded-full object-cover border-2 border-white ${
                        uploading ? "opacity-50 animate-pulse" : ""
                      }`}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white text-xl">
                      {uploading ? "Uploading..." : <FaUserCircle size={48} />}
                    </div>
                  )}
                </label>
                <h2 className="text-lg font-semibold mt-2">{user?.username || "Guest"}</h2>
                <p className="text-sm text-white/80">Balance: ₹{user?.balance ?? 0}</p>
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
                        isActive ? "bg-white text-black shadow-lg" : "hover:bg-white/20"
                      }`}
                    >
                      <div className={isActive ? "text-black" : "text-white"}>{item.icon}</div>
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

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
