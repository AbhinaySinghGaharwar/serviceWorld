"use client";
import { useCurrency } from "@/context/CurrencyContext";

export default function BalanceDisplay({ balance }) {
  const { symbol, convert } = useCurrency();

  // If balance is null/undefined → treat as 0
  const safeBalance = balance ?? 0;

  return (
    <div className="hidden sm:flex flex-col items-end">
      <span className="text-sm text-gray-500 dark:text-gray-300">
        Balance
      </span>

      <span className="text-lg font-bold text-green-500">
        {symbol}{convert(safeBalance).toFixed(2)}
      </span>
    </div>
  );
}
