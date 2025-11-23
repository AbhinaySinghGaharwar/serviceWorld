"use client";

import { useState, useEffect } from "react";
import { getProvidersAction } from "@/lib/providerActions";
import { useCurrency } from "@/context/CurrencyContext";

export default function AddNewService() {
  const { symbol, convert } = useCurrency();

  const [providers, setProviders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // form state
  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("service");
  const [refill, setRefill] = useState("on");
  const [cancelAllowed, setCancelAllowed] = useState("on");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [price, setPrice] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [status, setStatus] = useState("enabled");

  const [loading, setLoading] = useState(false);

  // message banner
  const [message, setMessage] = useState(null);
  function showMessage(type, text) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const res = await getProvidersAction();
        setProviders(res || []);
        if (res.length > 0) setSelectedProvider(String(res[0].id));
      } catch (err) {
        console.error(err);
      }
    };
    loadProviders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceId || !serviceName || !selectedProvider || !price) {
      showMessage("error", "Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: serviceId,
        name: serviceName,
        type: serviceType,
        refill: refill === "on",
        cancelAllowed: cancelAllowed === "on",
        provider: selectedProvider,
        price: Number(price),
        min: min ? Number(min) : null,
        max: max ? Number(max) : null,
        status,
      };

      showMessage("success", "Service Added (Demo)");
      resetForm();
      setShowPopup(false);
    } catch (err) {
      showMessage("error", "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  const convertedPrice = () => {
    const n = Number(price);
    if (isNaN(n)) return "";
    try {
      const v = convert(n);
      return `${symbol} ${Number(v).toFixed(2)}`;
    } catch {
      return `${symbol} ${n.toFixed(2)}`;
    }
  };

  function resetForm() {
    setServiceId("");
    setServiceName("");
    setServiceType("service");
    setRefill("on");
    setCancelAllowed("on");
    setPrice("");
    setMin("");
    setMax("");
    setStatus("enabled");
    if (providers[0]) setSelectedProvider(String(providers[0].id));
  }

  return (
    <div className="p-4 mx-auto">
      {/* message banner */}
      {message && (
        <div
          className={`mb-4 p-3 rounded text-white ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition"
      >
        Add New Service
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-2 z-50">
    <div className="bg-white dark:bg-[#121212] w-full max-w-lg rounded-xl shadow-xl  dark:border-gray-700 px-2 py-5 animate-fadeIn max-h-[90vh] overflow-y-auto">

            
            

            <form onSubmit={handleSubmit} className="space-y-4">

              <Input label="Service ID *" value={serviceId} onChange={setServiceId} />
              <Input label="Service Name *" value={serviceName} onChange={setServiceName} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Service Type"
                  value={serviceType}
                  onChange={setServiceType}
                  options={[
                    { value: "service", label: "Service" },
                    { value: "package", label: "Package" },
                    { value: "other", label: "Other" }
                  ]}
                />

                <Select
                  label="Provider *"
                  value={selectedProvider}
                  onChange={setSelectedProvider}
                  options={providers.map((p) => ({
                    value: p.id,
                    label: p.name
                  }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Refill"
                  value={refill}
                  onChange={setRefill}
                  options={[
                    { value: "on", label: "On" },
                    { value: "off", label: "Off" }
                  ]}
                />

                <Select
                  label="Cancel"
                  value={cancelAllowed}
                  onChange={setCancelAllowed}
                  options={[
                    { value: "on", label: "On" },
                    { value: "off", label: "Off" }
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                />
                {price && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Converted: {convertedPrice()}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Min" type="number" value={min} onChange={setMin} />
                <Input label="Max" type="number" value={max} onChange={setMax} />
              </div>

              <Select
                label="Status"
                value={status}
                onChange={setStatus}
                options={[
                  { value: "enabled", label: "Enabled" },
                  { value: "disabled", label: "Disabled" }
                ]}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowPopup(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* -------------------- Reusable Form Components -------------------- */

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
