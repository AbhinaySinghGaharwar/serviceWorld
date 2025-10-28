"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserStatistics() {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch("/api/services/getbalance");
        const data = await res.json();

        if (data.success) {
          setBalance(data.balance);
        } else {
          console.error("Balance fetch failed:", data.error);
        }
      } catch (err) {
        console.error("Fetch balance error:", err);
      }
    }

    fetchBalance();

    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: "https://cdn.mypanel.link/hmz1fi/bcpg233dh40fsdoc.png", label: "Username", value: "58" },
    { icon: "https://cdn.mypanel.link/hmz1fi/raj356puppqixik9.png", label: "My Balance", value: balance || "₹0" },
    { icon: "https://cdn.mypanel.link/hmz1fi/mp50mc1fhx7sm8o1.png", label: "Panel Orders", value: "6642" },
    { icon: "https://cdn.mypanel.link/hmz1fi/aw21tyz9g0kxlk1u.png", label: "Spent Balance", value: "₹ 0" },
  ];

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-6 px-3 sm:px-6 flex justify-center transition-colors duration-300">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 max-w-6xl w-full">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl px-3 py-3 sm:px-4 sm:py-4 shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
              <Image
                src={stat.icon}
                alt={stat.label}
                width={32}
                height={32}
                className="object-contain w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-tight">
                {stat.label}
              </span>
              <h4 className="text-sm sm:text-base md:text-lg font-semibold leading-snug truncate">
                {stat.value}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
