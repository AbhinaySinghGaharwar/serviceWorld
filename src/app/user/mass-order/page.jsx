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
    <div className="min-h-screen bg-[#0F1117] text-white px-6 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A6CF7] drop-shadow-[0_0_6px_rgba(74,108,247,0.4)]">
          Mass Order
        </h1>
        <p className="text-[#A0AEC3] mt-1">
          Place multiple orders quickly — one per line, in the given format.
        </p>
      </div>

      {/* Main Card */}
      <div
        className="
          max-w-3xl mx-auto 
          bg-[#1A1F2B] 
          border border-[#2B3143]
          rounded-2xl 
          shadow-lg shadow-black/20
          p-6
        "
      >
        {/* Tabs */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          <button
            onClick={() => (window.location.href = "/user/dashboard")}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg 
              text-[#A0AEC3]
              hover:text-[#4A6CF7] 
              hover:bg-[#4A6CF7]/10
              transition
            "
          >
            <ShoppingCart className="w-5 h-5" />
            <span>New Order</span>
          </button>

          <button
            onClick={() => setActiveTab("massorder")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg 
              transition
              ${
                activeTab === "massorder"
                  ? "bg-[#4A6CF7] text-white font-semibold shadow-md shadow-[#4A6CF7]/40"
                  : "text-[#A0AEC3] hover:text-[#4A6CF7] hover:bg-[#4A6CF7]/10"
              }
            `}
          >
            <ListOrdered className="w-5 h-5" />
            <span>Mass Order</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="mass"
              className="block text-sm font-semibold text-[#4A6CF7] mb-2"
            >
              One order per line in format:
            </label>
            <textarea
              id="mass"
              name="mass"
              rows={10}
              value={massText}
              onChange={(e) => setMassText(e.target.value)}
              placeholder="Service ID | Quantity | Link"
              className="
                w-full p-3 rounded-lg
                bg-[#0F1117]
                border border-[#2B3143]
                text-white
                placeholder-[#A0AEC3]
                focus:outline-none 
                focus:ring-2 focus:ring-[#4A6CF7]
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full py-3 rounded-lg font-semibold 
              bg-[#4A6CF7] text-white
              hover:bg-[#3b5be8]
              shadow-md shadow-[#4A6CF7]/40
              transition
            "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
