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
import Card from "./Card";


export default function DashboardLayout({ user, serviceEnabled }) {
  const [spent, setSpent] = useState(0);
  const [orders, setOrders] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setSpent(1245.75);
    setOrders(689);
  }, []);

 

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
