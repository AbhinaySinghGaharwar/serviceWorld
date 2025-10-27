"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPaymentTypePage() {
  const { type } = useParams();
  const router = useRouter();

  const [merchantId, setMerchantId] = useState("");
  const [token, setToken] = useState("");
  const [active, setActive] = useState(true);
  const [qrImage, setQrImage] = useState(null);
  const [newQrFile, setNewQrFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/payment-methods/${type}`);
        const data = await res.json();
        if (res.ok) {
          setMerchantId(data.merchantId || "");
          setToken(data.token || "");
          setActive(data.active ?? true);
          setQrImage(data.qrImage ? `data:image/png;base64,${data.qrImage}` : null);
        } else {
          setMessage(data.error || "Failed to load data");
        }
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong");
      }
    };
    fetchData();
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let qrBase64 = null;
    if (newQrFile) {
      const reader = new FileReader();
      reader.readAsDataURL(newQrFile);
      qrBase64 = await new Promise((resolve) =>
        (reader.onloadend = () => resolve(reader.result.split(",")[1]))
      );
    }

    try {
      const res = await fetch(`/api/payment-methods/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchantId, token, active, qrBase64 }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Updated successfully!");
        setTimeout(() => router.push("/admin/settings/payment-methods"), 1500);
      } else {
        setMessage(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-200 relative">
          <h1 className="text-2xl font-bold text-black mb-6 text-center">
            Edit Payment Method: {type}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Merchant ID */}
            <div>
              <label className="block text-black font-semibold mb-2">Merchant ID</label>
              <input
                type="text"
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
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
              />
              <label className="text-black font-semibold">Active</label>
            </div>

            {/* Current QR */}
            {qrImage && (
              <div>
                <label className="block text-black font-semibold mb-2">Current QR Image</label>
                <img
                  src={qrImage}
                  alt={`${type} QR`}
                  className="w-32 h-32 object-contain mb-2 rounded-lg border cursor-pointer"
                  onClick={() => setShowPopup(true)}
                />
              </div>
            )}

            {/* New QR Upload */}
            <div>
              <label className="block text-black font-semibold mb-2">Upload New QR (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewQrFile(e.target.files[0])}
                className="w-full text-black"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-bold py-3 rounded-xl shadow-md hover:from-indigo-600 hover:to-pink-600 transition-all duration-300"
            >
              {loading ? "Updating..." : "Update Payment Method"}
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

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-lg relative max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-black mb-4">{type} QR</h2>
            {qrImage && <img src={qrImage} alt={`${type} QR`} className="w-full h-auto object-contain rounded-lg border" />}
            <button
              className="mt-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black py-2 rounded-xl font-semibold hover:from-indigo-600 hover:to-pink-600 transition-all duration-300"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
