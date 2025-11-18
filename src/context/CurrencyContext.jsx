"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("INR");

  // Load currency from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  // 🔥 NEW — Listen for currency change in localStorage (auto update everywhere)
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("currency");
      if (saved && saved !== currency) {
        setCurrency(saved);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [currency]);

  // Save currency when changed
  const updateCurrency = (value) => {
    setCurrency(value);
    localStorage.setItem("currency", value);
  };

  const currencySymbol = {
    INR: "₹",
    USD: "$",
    EUR: "€",
  };

  // Currency converter
  const convert = (amount) => {
    if (!amount) return 0;
    amount = Number(amount);

    if (currency === "INR") return amount;
    if (currency === "USD") return amount / 83;
    if (currency === "EUR") return amount / 90;

    return amount;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        updateCurrency,
        symbol: currencySymbol[currency],
        convert,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
