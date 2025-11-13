"use client";

import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import clsx from "clsx";
import { logoutUser } from "@/lib/authentication";
import { uploadProfilePicture } from "@/lib/userActions"; // ✅ <-- Make sure this path is correct
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  
  menuItems,
  darkMode = true,
}) {
    console.log(user)
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [currency, setCurrency] = useState("INR");


  // 🔹 Upload profile image
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    const res = await uploadProfilePicture(formData);
    setUploading(false);

    if (res.success) {
      router.refresh()
    } else {
      alert(res.error || "Upload failed");
    }
  };

  const handleCurrencyChange = (value) => setCurrency(value);

  return (
    <aside
      className={clsx(
        "fixed z-50 flex flex-col w-64 h-full text-gray-100 shadow-2xl transition-transform duration-300 border-r border-yellow-500/20",
        darkMode
          ? "bg-gradient-to-b from-[#0d0d0f] via-[#1c1c1e] to-[#2b2b2d]"
          : "bg-gradient-to-b from-gray-100 via-white to-gray-200 text-gray-900 border-yellow-700/20",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-1 px-4 pt-4 border-b border-yellow-500/20">
        <div
          className="w-20 h-20 rounded-full bg-yellow-400/20 flex items-center justify-center shadow-md overflow-hidden cursor-pointer relative group"
          onClick={() => fileInputRef.current?.click()}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className={`w-full h-full object-cover ${
                uploading ? "opacity-50" : ""
              }`}
            />
          ) : (
            <FaUserCircle
              size={60}
              className={`text-yellow-400/80 ${uploading ? "opacity-50" : ""}`}
            />
          )}
          <div className="absolute inset-0 bg-black/40 text-xs text-yellow-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {uploading ? "Uploading..." : "Change Photo"}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <h2 className="text-lg font-semibold mt-2 text-yellow-300">
          {user?.username || "Guest"}
        </h2>

        <div className="flex flex-row items-center justify-between gap-3">
         <p className="text-sm text-gray-400">
  Balance: {currency === "USD" ? "$" : "₹"}
  {user.balance}
</p>


          {/* 💱 Currency Selector */}
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="bg-[#1c1c1e] dark:bg-[#1c1c1e] text-gray-200 border border-yellow-500/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-yellow-400"
          >
            <option value="INR">INR ₹</option>
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
          </select>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <div
              key={idx}
              onClick={() => {
                router.push(item.href);
                setIsSidebarOpen(false);
              }}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer font-medium transition-all duration-200",
                isActive
                  ? "bg-yellow-500/20 text-yellow-400 shadow-md"
                  : "hover:bg-yellow-500/10 text-gray-300 dark:text-gray-300"
              )}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-yellow-500/20">
        <button
          onClick={logoutUser}
          className="w-full flex items-center gap-3 justify-center bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 font-semibold py-2 rounded-xl transition"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
