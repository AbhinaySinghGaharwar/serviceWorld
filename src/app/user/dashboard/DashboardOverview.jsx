"use client";

import { useEffect, useState } from "react";
import {
  MdAddShoppingCart,
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdSupportAgent,
} from "react-icons/md";
import { FaUserCircle, FaTools } from "react-icons/fa";

import Announcements from "./Announcements";
import LatestOrders from "./LatestOrders";
import OrderForm from "./OrderForm";
import SupportSection from "./SupportSection";
import CategoryFilter from "./CategoryFilter";

// -------------------------
// Card Component
// -------------------------
const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`
      bg-white dark:bg-[#1A1F2B]
      border border-gray-300 dark:border-[#2B3143]
      rounded-2xl shadow-md p-3 sm:p-4 lg:p-5
      hover:border-[#4A6CF7]
      hover:shadow-lg hover:shadow-[#4A6CF7]/20
      transition-all cursor-pointer
      ${className}
    `}
  >
    {children}
  </div>
);

export default function DashboardLayout({ user, serviceEnabled }) {
  const [spent, setSpent] = useState(0);
  const [orders, setOrders] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setSpent(1245.75);
    setOrders(689);
  }, []);

  const quickActions = [
    { icon: <MdAddShoppingCart size={22} />, label: "New Order", href: "/user/dashboard" },
    { icon: <MdAccountBalanceWallet size={22} />, label: "Add Funds", href: "/user/addfunds" },
  ];

  return (
    <div className="
      w-full min-h-screen 
      bg-[#F5F7FA] text-[#1A1A1A] 
      dark:bg-[#0F1117] dark:text-white
      py-4 sm:py-6 flex justify-center
    ">
      <div className="w-full max-w-6xl px-3 sm:px-6 space-y-8">

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Username */}
          <Card>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full bg-[#4A6CF7]/20 text-[#4A6CF7]">
                <FaUserCircle size={22} />
              </div>
              <div>
                <p className="text-[11px] sm:text-sm text-[#4B5563] dark:text-[#A0AEC3]">Username</p>
                <h4 className="text-sm sm:text-lg font-semibold text-[#4A6CF7] truncate">
                  {user?.username || "Guest"}
                </h4>
              </div>
            </div>
          </Card>

          {/* Balance */}
          <Card>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full bg-[#4A6CF7]/20 text-[#4A6CF7]">
                <MdAccountBalanceWallet size={22} />
              </div>
              <div>
                <p className="text-[11px] sm:text-sm text-[#4B5563] dark:text-[#A0AEC3]">Balance</p>
                <h4 className="text-sm sm:text-lg font-semibold text-[#16D1A5]">
                  ₹{user?.balance ? Number(user.balance).toFixed(2) : "0.00"}
                </h4>
              </div>
            </div>
          </Card>

          {/* Total Spent */}
          <Card>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full bg-[#4A6CF7]/20 text-[#4A6CF7]">
                <MdTrendingUp size={22} />
              </div>
              <div>
                <p className="text-[11px] sm:text-sm text-[#4B5563] dark:text-[#A0AEC3]">Total Spent</p>
                <h4 className="text-sm sm:text-lg font-semibold text-[#16D1A5]">
                  ₹{spent.toFixed(2)}
                </h4>
              </div>
            </div>
          </Card>

          {/* Orders */}
          <Card>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full bg-[#4A6CF7]/20 text-[#4A6CF7]">
                <MdAddShoppingCart size={22} />
              </div>
              <div>
                <p className="text-[11px] sm:text-sm text-[#4B5563] dark:text-[#A0AEC3]">Total Orders</p>
                <h4 className="text-sm sm:text-lg font-semibold text-[#16D1A5]">
                  {orders}
                </h4>
              </div>
            </div>
          </Card>
        </section>

        {/* CATEGORY FILTER */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* QUICK ACTIONS */}
        <section className="w-full">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#4A6CF7] tracking-wide text-center lg:text-left">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {quickActions.map((action, idx) => (
              <Card
                key={idx}
                onClick={() => (window.location.href = action.href)}
                className="
                  flex flex-col sm:flex-row items-center justify-center 
                  gap-2 sm:gap-3 py-3 sm:py-4 lg:py-5 
                  hover:bg-[#4A6CF7]/10 hover:shadow-[#4A6CF7]/20 hover:scale-105
                "
              >
                <div className="text-[#4A6CF7]">{action.icon}</div>
                <span className="text-sm sm:text-base font-medium">
                  {action.label}
                </span>
              </Card>
            ))}
          </div>
        </section>

        {/* ORDER FORM SECTION */}
        {serviceEnabled ? (
          <OrderForm selectedCategory={selectedCategory} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-6 py-10">
            <div className="
              bg-white dark:bg-[#1A1F2B]
              border border-gray-300 dark:border-[#2B3143]
              rounded-2xl p-10 max-w-md
              shadow-xl shadow-black/5 dark:shadow-black/20
            ">
              <FaTools className="text-[#4A6CF7] text-5xl mx-auto mb-4 animate-pulse" />
              <h1 className="text-2xl font-semibold text-[#4A6CF7] mb-2">
                Services Temporarily Unavailable
              </h1>
              <p className="text-[#4B5563] dark:text-[#A0AEC3] leading-relaxed">
                Our order system is temporarily disabled for maintenance.
                Please check back later.
              </p>
              <p className="text-sm text-[#A0AEC3] mt-3 italic">
                Thank you for your patience!
              </p>
            </div>
          </div>
        )}

        {/* LATEST ORDERS */}
        <LatestOrders />

        {/* ADDITIONAL SECTIONS */}
        <SupportSection />
        <Announcements />

      </div>
    </div>
  );
}
