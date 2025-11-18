"use client";

import { MdAddShoppingCart, MdAccountBalanceWallet } from "react-icons/md";
import { useRouter } from "next/navigation";
import Card from "./Card";

export default function QuickActions() {
  const router = useRouter();

  const quickActions = [
    { icon: <MdAddShoppingCart size={20} />, label: "New Order", href: "/user/dashboard" },
    { icon: <MdAccountBalanceWallet size={20} />, label: "Add Funds", href: "/user/addfunds" },
  ];

  return (
    <section className="w-full mt-4 mb-4">
      <div className="flex gap-3 sm:gap-4 lg:gap-5">
        {quickActions.map((action, idx) => (
          <Card
            key={idx}
            onClick={() => router.push(action.href)}
            className="
              flex items-center gap-3
              w-full
              py-2 px-3 sm:py-2.5 sm:px-4     /* smaller height + reduced padding */
              transition-all duration-200
              hover:bg-[#4A6CF7]/10 hover:shadow-md hover:shadow-[#4A6CF7]/20 hover:scale-[1.02]
              cursor-pointer rounded-lg
            "
          >
            <div className="text-[#4A6CF7]">
              {action.icon}
            </div>

            <span className="text-sm sm:text-base font-medium">
              {action.label}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}
