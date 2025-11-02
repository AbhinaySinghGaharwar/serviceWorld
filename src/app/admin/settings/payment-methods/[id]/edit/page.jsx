"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPaymentMethodDetails } from "@/lib/adminServices";
import { putPaymentMethodDetails } from "@/lib/adminServices";

export default function EditPaymentTypePage() {
  const { id } = useParams();
  const router = useRouter();

  const [type, setType] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [token, setToken] = useState("");
  const [active, setActive] = useState(true);
  const [qrImage, setQrImage] = useState(null);
  const [newQrFile, setNewQrFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Load existing payment method data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPaymentMethodDetails(id);
        if (res.success) {
          const data = res.method;
          setType(data.type || "");
          setMerchantId(data.merchantId || "");
          setToken(data.token || "");
          setActive(data.active ?? true);
          setQrImage(data.qrImage ? `data:image/png;base64,${data.qrImage}` : null);
        } else {
          setMessage(res.error || "Failed to load data");
        }
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong while loading data");
      }
    };
    fetchData();
  }, [id]);

  // ✅ Handle update using server action
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Convert new QR file (if uploaded)
      let qrBase64 = null;
      if (newQrFile) {
        qrBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result;
            if (result && result.includes(",")) {
              resolve(result.split(",")[1]);
            } else {
              reject("Invalid QR format");
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(newQrFile);
        });
      }

      // ✅ Call the server action directly
      const result = await putPaymentMethodDetails(type, {
        merchantId,
        token,
        active,
        qrBase64,
      });

      if (result.success) {
        setMessage("✅ Updated successfully!");
        setTimeout(() => router.push("/admin/settings/payment-methods"), 1500);
      } else {
        setMessage(`❌ ${result.error || "Update failed"}`);
      }
    } catch (err) {
      console.error("❌ handleSubmit error:", err);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0e0e0f] flex items-center justify-center px-4 py-6">
        <div className="bg-[#151517] border border-yellow-500/20 shadow-2xl rounded-2xl p-8 max-w-md w-full text-gray-300 relative">
          <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            Edit Payment Method
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type */}
            <div>
              <label className="block font-semibold text-yellow-400 mb-2">
                Payment Type
              </label>
              <input
                type="text"
                value={type}
                readOnly
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-4 py-2 text-gray-400 focus:ring-0 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Merchant ID */}
            <div>
              <label className="block font-semibold text-yellow-400 mb-2">
                Merchant ID
              </label>
              <input
                type="text"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            {/* Token */}
            <div>
              <label className="block font-semibold text-yellow-400 mb-2">
                Token
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 border-yellow-500/30 bg-[#0e0e0f] rounded"
              />
              <label className="text-gray-300 font-semibold">Active</label>
            </div>

            {/* QR Preview */}
            {qrImage && (
              <div>
                <label className="block font-semibold text-yellow-400 mb-2">
                  Current QR Image
                </label>
                <img
                  src={qrImage}
                  alt="QR"
                  className="w-32 h-32 object-contain mb-2 rounded-lg border border-yellow-500/20 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowPopup(true)}
                />
              </div>
            )}

            {/* Upload new QR */}
            <div>
              <label className="block font-semibold text-yellow-400 mb-2">
                Upload New QR (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewQrFile(e.target.files[0])}
                className="w-full text-gray-300"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500/90 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-yellow-400/40 transition-all duration-300"
            >
              {loading ? "Updating..." : "Update Payment Method"}
            </button>
          </form>

          {/* Status message */}
          {message && (
            <div
              className={`mt-4 text-center font-medium ${
                message.startsWith("✅") ? "text-green-400" : "text-red-500"
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
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-[#151517] border border-yellow-500/20 rounded-2xl p-6 shadow-2xl relative max-w-sm w-full text-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-yellow-400 mb-4 text-center">
              QR Preview
            </h2>
            {qrImage && (
              <img
                src={qrImage}
                alt="QR"
                className="w-full h-auto object-contain rounded-lg border border-yellow-500/20"
              />
            )}
            <button
              className="mt-4 w-full bg-yellow-500/90 hover:bg-yellow-400 text-black py-2 rounded-xl font-semibold shadow-md hover:shadow-yellow-400/40 transition-all duration-300"
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
