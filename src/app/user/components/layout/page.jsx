"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdDashboard,
  MdHistory,
  MdPayment,
  MdHelp,
  MdInventory,
  MdLink,
  MdDns,
} from "react-icons/md";

import { logoutUser } from "@/lib/authentication";
import Sidebar from "./Sidebar";
import Header from "./Header";
import clsx from "clsx";

export default function Page({
  user,
  children,
  darkMode: initialDark,
  websiteName,
}) {
  const [darkMode, setDarkMode] = useState(initialDark);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // 🧭 Sidebar Menu Items
  const menuItems = [
    { icon: <MdDashboard />, text: "New Order", href: "/user/dashboard" },
    { icon: <MdInventory />, text: "Mass Order", href: "/user/mass-order" },
    { icon: <MdHistory />, text: "Services", href: "/user/services" },
    { icon: <MdHistory />, text: "Orders History", href: "/user/orders" },
    { icon: <MdPayment />, text: "Add Funds", href: "/user/addfunds" },
    { icon: <MdHelp />, text: "Tickets Support", href: "/user/support" },
    { icon: <MdLink />, text: "Referral", href: "/user/referral" },
    { icon: <MdDns />, text: "Child Panel", href: "/user/child-panel" },
  ];

  // 🌙 Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (!res.error) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        router.replace("/auth/login");
      } else alert("Logout failed.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main
      className={clsx(
        "flex h-screen overflow-hidden transition-colors duration-500",

        // 🌙 DARK MODE
        darkMode &&
          "bg-[#0F1117] text-white",

        // 🌞 LIGHT MODE
        !darkMode &&
          "bg-[#F5F7FA] text-[#1A1A1A]"
      )}
    >
      {/* 🔹 Mobile Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🔹 SIDEBAR */}
      <Sidebar
        menuItems={menuItems}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
      />

      {/* 🔹 MAIN CONTENT */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        
        {/* Header */}
        <Header
          dark={darkMode}
          user={user}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          handleLogout={handleLogout}
          toggleDarkMode={toggleDarkMode}
          websitename={websiteName}
        />

        {/* Page Content Wrapper */}
        <div className="
          flex-1 
          overflow-y-auto 
          md:p-6 
          bg-[#F5F7FA] dark:bg-[#0F1117]
          text-[#1A1A1A] dark:text-white
        ">
          {children}
        </div>
      </div>
    </main>
  );
}
