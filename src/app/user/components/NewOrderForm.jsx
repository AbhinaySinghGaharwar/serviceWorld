"use client";

import { useState, useEffect } from "react";

export default function NewOrderForm() {
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [charge, setCharge] = useState("");
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseType, setResponseType] = useState("success");
  const [quantityError, setQuantityError] = useState("");
  const [serviceError, setServiceError] = useState(""); // ✅ new

  // 🔹 Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services/getservices");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setServiceError("⚠️ No service data found. Please contact the administrator.");
        } else {
          setServices(data);
        }
      } catch (err) {
        console.error(err);
        setServiceError("❌ Failed to load services. Please contact the administrator.");
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  // 🔹 Calculate charge
  useEffect(() => {
    if (service && quantity && services.length > 0) {
      const selectedService = services.find((s) => s.service === service);
      if (selectedService && selectedService.rate) {
        const rate = parseFloat(selectedService.rate.toString().replace(/,/g, ""));
        const qty = parseInt(quantity, 10);
        if (!isNaN(rate) && !isNaN(qty)) setCharge((rate * qty).toFixed(2));
        else setCharge("");
      } else {
        setCharge("");
      }
    } else {
      setCharge("");
    }
  }, [service, quantity, services]);

  // 🔹 Handle quantity validation
  useEffect(() => {
    if (!service || services.length === 0) return;
    const selectedService = services.find((s) => s.service === service);
    if (!selectedService) return;

    const qty = parseInt(quantity, 10);
    if (qty < selectedService.min) {
      setQuantityError(`Minimum allowed quantity is ${selectedService.min}`);
    } else if (qty > selectedService.max) {
      setQuantityError(`Maximum allowed quantity is ${selectedService.max}`);
    } else {
      setQuantityError("");
    }
  }, [quantity, service, services]);

  // 🔹 Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !link || !quantity || !charge) {
      setResponseMessage("⚠️ Please fill all fields before submitting.");
      setResponseType("error");
      return;
    }

    if (quantityError) {
      setResponseMessage("⚠️ Quantity must be within the allowed range.");
      setResponseType("error");
      return;
    }

    setSubmitting(true);
    setResponseMessage(null);

    try {
      const res = await fetch("/api/orders/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, link, quantity, charge }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setResponseMessage(`❌ ${data.error || "Failed to create order."}`);
        setResponseType("error");
      } else {
        setResponseMessage(`✅ Order created successfully! ID: ${data.orderId}`);
        setResponseType("success");
        setService("");
        setLink("");
        setQuantity("");
        setCharge("");
      }
    } catch (err) {
      console.error(err);
      setResponseMessage("❌ Something went wrong while creating the order.");
      setResponseType("error");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = service
    ? services.find((s) => s.service === service)
    : null;

  // 🔹 Check if service data is missing or broken
  const invalidServiceData =
    !selectedService ||
    !selectedService.name ||
    !selectedService.rate ||
    selectedService.min == null ||
    selectedService.max == null;

  return (
    <div className="card-body bg-gray-100 p-6 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ===================== Service Section ===================== */}
        <div>
          <label className="block mb-1 font-semibold text-lg text-gray-800">
            Service
          </label>

          {/* ✅ Response Message Below Title */}
          {responseMessage && (
            <div
              className={`mb-3 rounded-lg p-3 text-sm ${
                responseType === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {responseMessage}
            </div>
          )}

          {/* ✅ Service Loading / Error */}
          {serviceError && (
            <div className="mb-3 p-3 text-sm bg-red-100 text-red-700 border border-red-300 rounded-lg">
              {serviceError}
            </div>
          )}

          <select
            className="w-full border border-gray-300 rounded-lg p-2 bg-white"
            value={service}
            onChange={(e) => setService(e.target.value)}
            disabled={loadingServices || serviceError}
          >
            <option value="">Select a service</option>
            {loadingServices ? (
              <option>Loading services...</option>
            ) : (
              services.map((srv) => (
                <option key={srv.service} value={srv.service}>
                  {srv.name} | ₹{srv.rate}
                </option>
              ))
            )}
          </select>
        </div>

        {/* ===================== Description ===================== */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <div className="p-2 border rounded-lg bg-white min-h-[48px]">
            {invalidServiceData
              ? "⚠️ Service details are missing or invalid. Please contact the administrator."
              : selectedService?.desc || "No description available"}
          </div>
        </div>

        {/* ===================== Link ===================== */}
        <div>
          <label className="block font-semibold mb-1">Link</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter post or video link"
          />
        </div>

        {/* ===================== Quantity ===================== */}
        <div>
          <label className="block font-semibold mb-1">Quantity</label>
          <input
            type="number"
            className={`w-full border rounded-lg p-2 ${
              quantityError ? "border-red-500" : "border-gray-300"
            }`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
          {quantityError && (
            <small className="text-red-600 font-medium">{quantityError}</small>
          )}
        </div>

        {/* ===================== Rate / Min / Max ===================== */}
        {selectedService && !invalidServiceData && (
          <div className="grid grid-cols-3 gap-4 mt-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div>
              <p className="text-gray-500 text-sm font-medium">Rate (per 1)</p>
              <p className="font-semibold text-gray-800">₹{selectedService.rate}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Min</p>
              <p className="font-semibold text-gray-800">{selectedService.min}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Max</p>
              <p className="font-semibold text-gray-800">{selectedService.max}</p>
            </div>
          </div>
        )}

        {/* ===================== Charge ===================== */}
        <div>
          <label className="block font-semibold mb-1">Charge</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
            value={charge}
            readOnly
          />
        </div>

        {/* ===================== Submit Button ===================== */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting || serviceError || invalidServiceData}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
