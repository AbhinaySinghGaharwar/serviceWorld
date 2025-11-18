"use client";
import { useCurrency } from "@/context/CurrencyContext";

export default function BalanceDisplay({ balance }) {
  const { symbol, convert } = useCurrency();

  if (balance == null) return null;

  return (
    <div className="hidden sm:flex flex-col items-end">
      <span className="text-sm text-gray-500 dark:text-gray-300">
        Balance
      </span>

      <span className="text-lg font-bold text-green-500">
        {symbol}{convert(balance).toFixed(2)}
      </span>
    </div>
  );
}
