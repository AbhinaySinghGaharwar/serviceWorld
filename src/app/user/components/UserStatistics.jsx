"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function UserStatistics() {
  useEffect(() => {
    const getBalance = async () => {
      // Fetch user balance logic here (if needed)
    };
    getBalance();
  }, []);

  const stats = [
    { icon: "https://cdn.mypanel.link/hmz1fi/bcpg233dh40fsdoc.png", label: "Username", value: "58" },
    { icon: "https://cdn.mypanel.link/hmz1fi/raj356puppqixik9.png", label: "My Balance", value: "₹ 0" },
    { icon: "https://cdn.mypanel.link/hmz1fi/mp50mc1fhx7sm8o1.png", label: "Panel Orders", value: "6642" },
    { icon: "https://cdn.mypanel.link/hmz1fi/aw21tyz9g0kxlk1u.png", label: "Spent Balance", value: "₹ 0" },
  ];

  return (
    <div className="w-full bg-gray-100 py-4 px-2 flex justify-center">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-6xl">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-2 sm:gap-2.5 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl px-2 py-2 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex-shrink-0 bg-white/20 p-1 rounded-lg">
              <Image
                src={stat.icon}
                alt={stat.label}
                width={16}
                height={16}
                className="object-contain w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5"
              />
            </div>
            <div>
              <span className="block text-[10px] sm:text-xs text-white/80 leading-tight">
                {stat.label}
              </span>
              <h4 className="text-sm sm:text-base md:text-lg font-semibold leading-snug">
                {stat.value}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
