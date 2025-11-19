"use client";

import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import clsx from "clsx";
import { logoutUser } from "@/lib/authentication";
import { uploadProfilePicture } from "@/lib/userActions";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useCurrency from "@/hooks/useCurrency";
import UserBalance from "./UserBalance";
import ProfileSection from "./ProfileSection";
export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  menuItems,
}) {
  const { currency, updateCurrency } = useCurrency();
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
 

  // Upload profile pic
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

        /* Light Mode */
        "bg-white border-gray-300 text-gray-800",

        /* Dark Mode */
        "dark:bg-[#0F1117] dark:border-gray-800 dark:text-white",

        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Profile Section */}
    <ProfileSection user={user}/>

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
      "flex items-center gap-3 p-3 cursor-pointer font-medium text-sm transition-all",

      // ACTIVE item (text only)
      isActive &&
        `
        text-gray-900 
        dark:text-white
      `,

      // INACTIVE item
      !isActive &&
        `
        text-gray-600 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-white
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
      <div className="p-4 border-t border-gray-300 dark:border-gray-800">
        <button
          onClick={logoutUser}
          className="
            w-full flex items-center gap-3 justify-center font-semibold py-2 rounded-xl transition
            bg-red-100 text-red-600 hover:bg-red-200
            dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30
          "
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
