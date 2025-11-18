"use client";

import { useEffect, useState } from "react";

export default function useCurrency(defaultCurrency = "INR") {
  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    const saved = localStorage.getItem("user_currency");
    if (saved) setCurrency(saved);
  }, []);

  const updateCurrency = (value) => {
    setCurrency(value);
    localStorage.setItem("user_currency", value);
  };

  const availableCurrencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  ];

  return { currency, updateCurrency, availableCurrencies };
}
