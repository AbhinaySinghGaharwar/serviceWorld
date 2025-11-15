"use client";

import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import clsx from "clsx";
import { logoutUser } from "@/lib/authentication";
import { uploadProfilePicture } from "@/lib/userActions";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  menuItems,
  darkMode = true,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [currency, setCurrency] = useState("INR");

  // Upload profile picture
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await uploadProfilePicture(formData);
    setUploading(false);

    if (res.success) router.refresh();
    else alert(res.error || "Upload failed");
  };

  return (
    <aside
      className={clsx(
        "fixed z-50 flex flex-col w-64 h-full transition-transform duration-300 shadow-2xl border-r",
        darkMode
          ? "bg-[#0F1117] border-[#2B3143] text-white"
          : "bg-white border-gray-300 text-[#1A1A1A]",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Profile Section */}
      <div
        className="
          flex flex-col items-center gap-2 px-4 py-6
          border-b border-[#2B3143]
        "
      >
        <div
          className="
            w-20 h-20 rounded-full 
            bg-[#4A6CF7]/15 text-[#4A6CF7]
            flex items-center justify-center 
            shadow-lg shadow-[#4A6CF7]/30
            overflow-hidden cursor-pointer group relative
          "
          onClick={() => fileInputRef.current?.click()}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className={`w-full h-full object-cover ${
                uploading ? "opacity-40" : ""
              }`}
            />
          ) : (
            <FaUserCircle
              size={60}
              className={uploading ? "opacity-40" : ""}
            />
          )}

          <div
            className="
              absolute inset-0 bg-black/40 text-xs 
              text-white flex items-center justify-center 
              opacity-0 group-hover:opacity-100 
              transition-opacity
            "
          >
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

        <h2 className="text-lg font-semibold text-[#4A6CF7]">
          {user?.username || "Guest"}
        </h2>

        <div className="flex items-center gap-3">
          {user?.balance != null && (
            <p className="text-sm text-[#A0AEC3]">
              Balance: {currency === "USD" ? "$" : "₹"}
              {Number(user.balance).toFixed(2)}
            </p>
          )}

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="
              bg-[#1A1F2B] text-[#A0AEC3]
              border border-[#2B3143] rounded-lg 
              px-3 py-1 text-sm focus:outline-none
              focus:border-[#4A6CF7]
            "
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

                // Active item
                isActive &&
                  `
                  bg-[#4A6CF7]/20 
                  text-[#4A6CF7]
                  shadow-md shadow-[#4A6CF7]/30
                `,

                // Inactive item
                !isActive &&
                  `
                  text-[#A0AEC3]
                  hover:bg-[#4A6CF7]/10 
                  hover:text-[#4A6CF7]
                  transition 
                `
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        className="
          p-4 border-t border-[#2B3143]
        "
      >
        <button
          onClick={logoutUser}
          className="
            w-full flex items-center gap-3 justify-center
            bg-red-500/20 hover:bg-red-500/30 
            text-red-400 font-semibold 
            py-2 rounded-xl transition
          "
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
