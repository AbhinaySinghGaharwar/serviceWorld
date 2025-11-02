"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllPaymentMethods } from "@/lib/adminServices";

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null); // 👈 For popup
  const router = useRouter();

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await getAllPaymentMethods();
        console.log(res)
        setMethods(
          res.methods.map((m) => ({
            ...m,
            qrImage: m.qrImage ? `data:image/png;base64,${m.qrImage}` : null,
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMethods();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0f] p-6 text-gray-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
          Payment Methods
        </h1>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {methods.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center py-10">
              No payment methods found.
            </p>
          ) : (
            methods.map((method) => (
              <div
                key={method._id}
                className="bg-[#151517] border border-yellow-500/20 rounded-2xl shadow p-5 flex flex-col items-center transition hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]"
              >
                <h2 className="text-lg font-bold mb-2 text-yellow-400">
                  {method.type}
                </h2>
                <p className="text-gray-400 text-sm mb-2 text-center">
                  Merchant ID:{" "}
                  <span className="font-medium text-gray-300">
                    {method.merchantId}
                  </span>
                </p>

                {method.qrImage && (
                  <img
                    src={method.qrImage}
                    alt={`${method.type} QR`}
                    className="w-32 h-32 object-contain mb-4 rounded-lg border border-yellow-500/20"
                  />
                )}

                <div className="flex gap-3 w-full">
                  <button
                    className="flex-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 py-2 rounded-xl font-semibold hover:bg-yellow-500/20 hover:shadow-[0_0_10px_rgba(234,179,8,0.4)] transition-all"
                    onClick={() => setSelectedMethod(method)} // 👈 Show popup
                  >
                    View
                  </button>
                  <button
                    className="flex-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 py-2 rounded-xl font-semibold hover:bg-yellow-500/20 hover:shadow-[0_0_10px_rgba(234,179,8,0.4)] transition-all"
                    onClick={() =>
                      router.push(
                        `/admin/settings/payment-methods/${method._id}/edit`
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Popup / Modal */}
      {selectedMethod && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#151517] border border-yellow-500/30 rounded-2xl p-6 w-[90%] sm:w-[400px] relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-yellow-400 text-xl"
              onClick={() => setSelectedMethod(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">
              {selectedMethod.type} Details
            </h2>

            <div className="space-y-3 text-sm">
              <p>
                <span className="text-yellow-400">Merchant ID:</span>{" "}
                {selectedMethod.merchantId || "N/A"}
              </p>
              <p>
                <span className="text-yellow-400">Token ID:</span>{" "}
                {selectedMethod.token || "N/A"}
              </p>
              <p>
                <span className="text-yellow-400">type:</span>{" "}
                {selectedMethod.type || "N/A"}
              </p>
             <p>
  <span className="text-yellow-400">Updated At:</span>{" "}
  {selectedMethod.updatedAt
    ? new Date(selectedMethod.updatedAt).toLocaleString()
    : "N/A"}
</p>
              
              {selectedMethod.qrImage && (
                <div className="flex justify-center mt-4">
                  <img
                    src={selectedMethod.qrImage}
                    alt="QR Code"
                    className="w-40 h-40 object-contain rounded-lg border border-yellow-500/30"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
