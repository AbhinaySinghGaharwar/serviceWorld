"use client";

import { useState } from "react";
import { ShoppingCart, ListOrdered } from "lucide-react";

export default function MassOrderPage() {
  const [activeTab, setActiveTab] = useState("massorder");
  const [massText, setMassText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mass order submitted!");
  };

  return (
    <div className="min-h-screen bg-[#0e0e0f] text-gray-300 px-6 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">Mass Order</h1>
        <p className="text-gray-400">
          Place multiple orders quickly — one per line, in the given format.
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-3xl mx-auto bg-[#151517] border border-yellow-500/20 rounded-2xl shadow-lg p-6">
        {/* Tabs */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-[#1e1e20] transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>New Order</span>
          </button>

          <button
            onClick={() => setActiveTab("massorder")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === "massorder"
                ? "bg-yellow-400 text-black font-semibold"
                : "text-gray-300 hover:text-yellow-400 hover:bg-[#1e1e20]"
            } transition`}
          >
            <ListOrdered className="w-5 h-5" />
            <span>Mass Order</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="mass"
              className="block text-sm font-semibold text-yellow-400 mb-2"
            >
              One order per line in format:
            </label>
            <textarea
              id="mass"
              name="mass"
              value={massText}
              onChange={(e) => setMassText(e.target.value)}
              rows={10}
              placeholder="Service ID | Quantity | Link"
              className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.6)]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
