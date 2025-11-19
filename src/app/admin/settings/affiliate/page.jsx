"use client";

import { useState, useEffect } from "react";
import { getAffiliateSettings, updateAffiliateSettings } from "@/lib/adminServices";

export default function AffiliateSettingsAdmin() {
  const [commission, setCommission] = useState(5);
  const [payout, setPayout] = useState(50);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      const data = await getAffiliateSettings();
      setCommission(data.commission_rate);
      setPayout(data.minimum_payout);
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const result = await updateAffiliateSettings({
      commission_rate: commission,
      minimum_payout: payout,
    });
    setSaving(false);

    setMessage(result.success ? "Settings updated!" : "Failed to update.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0e0e0f] text-gray-900 dark:text-gray-200 px-6 py-10 transition-colors">

      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Affiliate Settings (Admin)
      </h1>

      <div className="bg-white dark:bg-[#151517] p-6 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg max-w-md">

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">
            Commission Rate (%)
          </span>
          <input
            type="number"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#0e0e0f] border border-gray-300 dark:border-gray-700 rounded-lg p-3 mt-1 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 outline-none transition"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 dark:text-gray-300">
            Minimum Payout ($)
          </span>
          <input
            type="number"
            value={payout}
            onChange={(e) => setPayout(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#0e0e0f] border border-gray-300 dark:border-gray-700 rounded-lg p-3 mt-1 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 outline-none transition"
          />
        </label>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-2 rounded-lg font-semibold text-white bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 transition ${
            saving ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        {message && (
          <p className="text-center mt-3 text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
