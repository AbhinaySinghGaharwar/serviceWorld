"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPaymentTypePage() {
  const [type, setType] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [token, setToken] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!qrFile) {
      setMessage("❌ Please upload a QR image");
      return;
    }

    setLoading(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(qrFile);
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1]; // remove data:image/png;base64,
      try {
        const res = await fetch("/api/payment-methods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, merchantId, token, active: true, qrBase64: base64 }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("✅ Payment type added successfully!");
          setTimeout(() => router.push("/admin/settings/payment-methods"), 1500);
        } else {
          setMessage(`❌ ${data.error || "Something went wrong"}`);
        }
      } catch (err) {
        console.error(err);
        setMessage("❌ Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-200">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Add Payment Method Type
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-black font-semibold mb-2">Type Name</label>
            <input
              type="text"
              placeholder="e.g. BharatPe"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Merchant ID */}
          <div>
            <label className="block text-black font-semibold mb-2">Merchant ID</label>
            <input
              type="text"
              placeholder="Enter Merchant ID"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Token */}
          <div>
            <label className="block text-black font-semibold mb-2">Token</label>
            <input
              type="text"
              placeholder="Enter Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* QR Upload */}
          <div>
            <label className="block text-black font-semibold mb-2">Upload QR Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setQrFile(e.target.files[0])}
              className="w-full text-black"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-bold py-3 rounded-xl shadow-md hover:from-indigo-600 hover:to-pink-600 transition-all duration-300"
          >
            {loading ? "Adding..." : "Add Payment Type"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
