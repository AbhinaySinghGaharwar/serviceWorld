"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await fetch("/api/payment-methods");
        const data = await res.json();
        // Convert QR buffers to base64 if needed
        setMethods(
          data.map((m) => ({
            ...m,
            qrImage: m.qrImage ? `data:image/png;base64,${m.qrImage}` : null,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchMethods();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-black">Payment Methods</h1>
        <Link
          href="/admin/settings/payment-methods/add"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-semibold px-4 py-2 rounded-xl shadow-md hover:from-indigo-600 hover:to-pink-600 transition-all duration-300"
        >
          + Add Type
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {methods.length === 0 ? (
          <p className="text-gray-700 col-span-full text-center py-10">
            No payment methods found.
          </p>
        ) : (
          methods.map((method) => (
            <div
              key={method._id}
              className="bg-white border border-gray-200 rounded-2xl shadow p-5 flex flex-col items-center transition hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-2 text-black">{method.type}</h2>
              <p className="text-gray-700 text-sm mb-2 text-center">
                Merchant ID: <span className="font-medium">{method.merchantId}</span>
              </p>

              {/* QR Image */}
              {method.qrImage && (
                <img
                  src={method.qrImage}
                  alt={`${method.type} QR`}
                  className="w-32 h-32 object-contain mb-4 rounded-lg border"
                />
              )}

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 text-black py-2 rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all"
                  onClick={() => alert(`Viewing ${method.type}`)}
                >
                  View
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-indigo-400 to-purple-400 text-black py-2 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all"
                  onClick={() =>
                    router.push(`/admin/settings/payment-methods/${method.type.toLowerCase()}/edit`)
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
