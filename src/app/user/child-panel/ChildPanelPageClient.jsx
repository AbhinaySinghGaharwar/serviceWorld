"use client";

import { useState, useEffect, useTransition } from "react";
import { FaGlobe, FaCoins, FaUsers, FaUserLock } from "react-icons/fa";
import { createChildPanel } from "@/lib/adminServices";

export default function ChildPanelPageClient({ settings, paymentMethods }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const price = settings?.price || "₹ 800";
  const adminDomain = settings?.domain || "yourpaneldomain.com";

  // Subdomain
  const [subdomain, setSubdomain] = useState("");

  // Payment
  const [paymentType, setPaymentType] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [utr, setUtr] = useState("");

  // Handle domain
  const handleDomainChange = (e) => {
    let value = e.target.value.trim();

    if (value.endsWith("." + adminDomain)) {
      value = value.replace("." + adminDomain, "");
    }

    value = value.replace(/[^a-zA-Z0-9-]/g, "");
    setSubdomain(value);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("domain", `${subdomain}.${adminDomain}`);

    startTransition(async () => {
      const res = await createChildPanel({
        formData,
        payment_amount: paymentAmount,
        utr,
        payment_type: paymentType,
      });

      if (res.error) setMessage("❌ " + res.error);
      else setMessage("✅ " + res.message);
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0f] p-6 text-gray-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5] bg-clip-text text-transparent mb-2">
            Create Your Child Panel
          </h1>
          <p className="text-gray-400">
            Follow the steps below to create your own SMM child panel.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#151517] border border-[#4A6CF7]/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(74,108,247,0.15)]">
          <h2 className="text-xl font-bold text-[#4A6CF7] mb-4">
            Fill Out Details
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* Domain */}
            <div>
              <label className="block mb-1 font-semibold">Domain</label>
              <div className="relative">
                <input
                  type="text"
                  name="subdomain"
                  value={subdomain}
                  onChange={handleDomainChange}
                  className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 pr-32 text-gray-200 focus:border-[#4A6CF7] outline-none"
                  placeholder="Enter subdomain (e.g. mypanel)"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
                  .{adminDomain}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Full domain:{" "}
                <span className="text-[#16D1A5] font-semibold">
                  {subdomain
                    ? `${subdomain}.${adminDomain}`
                    : `yourpanel.${adminDomain}`}
                </span>
              </p>
            </div>

            {/* Currency */}
            <div>
              <label className="block mb-1 font-semibold">Currency</label>
              <select
                name="currency"
                className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 text-gray-200 focus:border-[#4A6CF7] outline-none"
              >
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">U.S. Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 font-semibold">Username</label>
              <input
                type="text"
                name="username"
                className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 text-gray-200 focus:border-[#4A6CF7]"
                placeholder="admin123"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 text-gray-200 focus:border-[#4A6CF7]"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 text-gray-200 focus:border-[#4A6CF7]"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-semibold">Price</label>
              <input
                type="text"
                name="price"
                value={price}
                readOnly
                className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 text-gray-200"
              />
              <p className="text-xs text-gray-400 mt-1">
                Current price set by admin
              </p>
            </div>

            {/* Payment Methods */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-[#4A6CF7] mb-2">
                Select Payment Method
              </h3>

              {paymentMethods.methods.map((m) => (
                <div
                  key={m._id}
                  onClick={() => setPaymentType(m.type)}
                  className={`flex items-center gap-3 border rounded-lg p-3 mb-3 cursor-pointer transition ${
                    paymentType === m.type
                      ? "border-[#4A6CF7] bg-[#4A6CF7]/10"
                      : "border-[#4A6CF7]/30 hover:border-[#4A6CF7]/60"
                  }`}
                >
                  <FaCoins className="text-[#4A6CF7] text-xl" />
                  <div>
                    <p className="font-semibold text-gray-200">{m.type}</p>
                    {m.qrImage && (
                      <img
                        src={`data:image/png;base64,${m.qrImage}`}
                        alt={`${m.type} QR`}
                        className="mt-2 w-32 border border-[#4A6CF7]/30 rounded-lg"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* UTR */}
            <div>
              <label className="block mb-1 font-semibold">
                UTR / Transaction ID
              </label>
              <input
                type="text"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                placeholder="Enter UTR or reference"
                className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 text-gray-200 focus:border-[#4A6CF7] outline-none"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-1 font-semibold">Payment Amount</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter paid amount"
                className="w-full bg-[#0e0e0f] border border-[#4A6CF7]/30 rounded-lg px-3 py-2 text-gray-200 focus:border-[#4A6CF7] outline-none"
                required
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isPending}
                className="
                  w-full
                  bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5]
                  text-black font-semibold 
                  py-2 rounded-lg 
                  shadow-[0_0_15px_rgba(74,108,247,0.4)]
                  hover:shadow-[0_0_25px_rgba(74,108,247,0.6)]
                  transition
                "
              >
                {isPending ? "Submitting..." : "Submit Order"}
              </button>

              {message && (
                <p
                  className={`text-center mt-3 text-sm ${
                    message.startsWith("✅")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
