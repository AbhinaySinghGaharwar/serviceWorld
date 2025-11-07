"use client";

import { useState, useTransition } from "react";
import { setChildPanelSettings } from "@/lib/adminServices";

export default function ChildPanel({ initialSettings }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // ✅ Local state for form fields
  const [siteSettings, setSiteSettings] = useState({
    domain: initialSettings?.domain || "",
    price: initialSettings?.price || "",
  });

  // 🧭 Update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiteSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    startTransition(async () => {
      const res = await setChildPanelSettings(formData);
      if (res.error) setMessage("❌ " + res.error);
      else setMessage("✅ " + res.message);
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0f] p-6 text-gray-300">
      <div className="max-w-2xl mx-auto bg-[#151517] border border-yellow-500/20 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          Admin — Set Child Panel Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Domain</label>
            <input
              type="text"
              name="domain"
              placeholder="yourchildpanel.com"
              value={siteSettings.domain}
              onChange={handleChange}
              className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="text"
              name="price"
              placeholder="₹ 800"
              value={siteSettings.price}
              onChange={handleChange}
              className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg shadow-lg hover:shadow-yellow-500/40 transition-all"
          >
            {isPending ? "Saving..." : "Save Settings"}
          </button>

          {message && (
            <p
              className={`text-center mt-3 text-sm ${
                message.startsWith("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
