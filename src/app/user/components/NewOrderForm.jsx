"use client";

import { useState, useEffect, useRef } from "react";

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
  const [serviceError, setServiceError] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services/getservices");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          setServiceError("⚠️ No service data found. Please contact admin.");
        } else {
          setServices(data);
        }
      } catch (err) {
        console.error(err);
        setServiceError("❌ Failed to load services. Please contact admin.");
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (service && quantity && services.length > 0) {
      const selectedService = services.find((s) => s.service === service);
      if (selectedService && selectedService.rate) {
        const rate = parseFloat(selectedService.rate.toString().replace(/,/g, ""));
        const qty = parseInt(quantity, 10);
        if (!isNaN(rate) && !isNaN(qty)) setCharge((rate * qty).toFixed(2));
        else setCharge("");
      } else setCharge("");
    } else setCharge("");
  }, [service, quantity, services]);

  useEffect(() => {
    if (!service || services.length === 0) return;
    const selectedService = services.find((s) => s.service === service);
    if (!selectedService) return;
    const qty = parseInt(quantity, 10);
    if (qty < selectedService.min) {
      setQuantityError(`Minimum allowed quantity is ${selectedService.min}`);
    } else if (qty > selectedService.max) {
      setQuantityError(`Maximum allowed quantity is ${selectedService.max}`);
    } else setQuantityError("");
  }, [quantity, service, services]);

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

  const invalidServiceData =
    !selectedService ||
    !selectedService.name ||
    !selectedService.rate ||
    selectedService.min == null ||
    selectedService.max == null;

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg text-black">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service */}
        <div ref={dropdownRef}>
          <label className="block mb-1 font-semibold text-sm sm:text-base text-black">
            Service
          </label>
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
          {serviceError && (
            <div className="mb-3 p-3 text-sm bg-red-100 text-red-700 border border-red-300 rounded-lg">
              {serviceError}
            </div>
          )}

          {/* Custom Dropdown */}
          <div
            className="relative w-full"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div
              className={`w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-black bg-white flex justify-between items-center cursor-pointer`}
            >
              {service
                ? services.find((s) => s.service === service)?.name + ` | ₹${services.find((s) => s.service === service)?.rate}`
                : "Select a service"}
              <span className="ml-2 text-gray-400">▼</span>
            </div>
            {dropdownOpen && services.length > 0 && (
              <ul className="absolute z-50 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-lg mt-1 shadow-lg text-sm sm:text-base">
                {services.map((srv) => (
                  <li
                    key={srv.service}
                    onClick={() => {
                      setService(srv.service);
                      setDropdownOpen(false);
                    }}
                    className="p-2 hover:bg-indigo-100 cursor-pointer truncate"
                  >
                    {srv.name} | ₹{srv.rate}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 text-sm sm:text-base text-black">Description</label>
          <div className="p-2 sm:p-3 border rounded-lg bg-white min-h-[48px] text-xs sm:text-sm text-black">
            {invalidServiceData
              ? "⚠️ Service details missing or invalid."
              : selectedService?.desc || "No description available"}
          </div>
        </div>

        {/* Link */}
        <div>
          <label className="block font-semibold mb-1 text-sm sm:text-base text-black">Link</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-black"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter post or video link"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-semibold mb-1 text-sm sm:text-base text-black">Quantity</label>
          <input
            type="number"
            className={`w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base ${
              quantityError ? "border-red-500" : "border-gray-300"
            } text-black`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
          {quantityError && (
            <small className="text-red-600 font-medium text-xs sm:text-sm">{quantityError}</small>
          )}
        </div>

        {/* Rate / Min / Max */}
        {selectedService && !invalidServiceData && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-2 bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200 text-xs sm:text-sm text-black">
            <div>
              <p className="text-gray-600 font-medium">Rate (per 1)</p>
              <p className="font-semibold text-black">₹{selectedService.rate}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Min</p>
              <p className="font-semibold text-black">{selectedService.min}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Max</p>
              <p className="font-semibold text-black">{selectedService.max}</p>
            </div>
          </div>
        )}

        {/* Charge */}
        <div>
          <label className="block font-semibold mb-1 text-sm sm:text-base text-black">Charge</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base bg-gray-100 text-black"
            value={charge}
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || serviceError || invalidServiceData}
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Loading...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
