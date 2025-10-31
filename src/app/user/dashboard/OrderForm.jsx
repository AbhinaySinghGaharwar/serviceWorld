"use client";

import { useState, useEffect, useRef } from "react";

export default function OrderForm({ services: initialServices = [] }) {
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [charge, setCharge] = useState("");
  const [services, setServices] = useState(initialServices);
  const [filteredServices, setFilteredServices] = useState(initialServices);
  const [topServices, setTopServices] = useState(initialServices.slice(0, 6));
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseType, setResponseType] = useState("success");
  const [quantityError, setQuantityError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // ✅ Initialize categories from provided services
  useEffect(() => {
    if (services.length > 0) {
      const uniqueCats = [
        ...new Set(services.map((s) => s.category).filter(Boolean)),
      ];
      setCategories(uniqueCats);
      if (!category) setCategory(uniqueCats[0] || "");
    }
  }, [services]);

  // ✅ Filter services by category and search
  useEffect(() => {
    const filtered = services.filter(
      (s) =>
        (!category || s.category === category) &&
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [category, searchTerm, services]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Calculate charge dynamically
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

  // ✅ Validate quantity based on selected service
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

  // ✅ Handle order submission
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

  // ✅ Auto-fill form when selecting from top services
  const handleAutoFill = (srv) => {
    setService(srv.service);
    setCategory(srv.category);
    setSearchTerm(srv.name);
    document.getElementById("orderForm")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-3 sm:px-4 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        {/* LEFT PANEL */}
        <div
          id="orderForm"
          className="bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-200"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-indigo-700">
            🧾 Place Your Order
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-[17px]">
            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-200 text-gray-700"
            />

            {/* Category */}
            <div>
              <label className="block mb-2 font-semibold text-base text-gray-900">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-gray-700 shadow-sm text-base focus:ring-2 focus:ring-indigo-300"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Service */}
            <div ref={dropdownRef}>
              <label className="block mb-2 font-semibold text-base text-gray-700">
                Service
              </label>
              <div
                className="relative w-full"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-full border border-gray-300 text-gray-700 rounded-xl p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:shadow-md">
                  {service
                    ? services.find((s) => s.service === service)?.name +
                      ` | ₹${services.find((s) => s.service === service)?.rate}`
                    : "Select a service"}
                  <span className="ml-2 text-gray-400">▼</span>
                </div>
                {dropdownOpen && filteredServices.length > 0 && (
                  <ul className="absolute z-50 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-xl mt-2 shadow-lg text-base">
                    {filteredServices.map((srv) => (
                      <li
                        key={srv.service}
                        onClick={() => {
                          setService(srv.service);
                          setDropdownOpen(false);
                        }}
                        className="p-3 hover:bg-blue-50 cursor-pointer truncate text-gray-700"
                      >
                        {srv.name} | ₹{srv.rate}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Link */}
            <div>
              <label className="block mb-2 font-semibold text-base text-gray-700">
                Link
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-200 text-gray-700"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter post or video link"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-2 font-semibold text-base text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                className={`text-gray-700 w-full border rounded-xl p-3 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-200 ${
                  quantityError ? "border-red-500" : "border-gray-300"
                }`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
              {quantityError && (
                <small className="text-red-600 font-medium text-sm">
                  {quantityError}
                </small>
              )}
            </div>

            {/* Charge */}
            <div>
              <label className="block mb-2 font-semibold text-base text-gray-700">
                Charge
              </label>
              <input
                type="text"
                className="text-gray-700 w-full border border-gray-300 rounded-xl p-3 bg-gray-50 shadow-sm"
                value={charge}
                readOnly
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || invalidServiceData}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 text-lg rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </span>
              ) : (
                "Place your order"
              )}
            </button>
          </form>

          {responseMessage && (
            <h1
              className={`mt-4 text-lg text-center font-medium ${
                responseType === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {responseMessage}
            </h1>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-200 mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-indigo-700">
            ⭐ Our Top Rated Services
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Explore our most popular and trusted services — chosen by thousands of users for their reliability, speed, and cost-effectiveness.
          </p>

          <div className="space-y-6 max-h-[650px] overflow-y-auto pr-3 text-[18px]">
            {topServices.map((srv, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition-all shadow-md"
              >
                <p className="font-bold text-gray-900 text-lg">ID: {srv.service}</p>
                <p className="text-gray-800 text-lg mt-2">{srv.name?.slice(0, 90)}...</p>
                {srv.desc && (
                  <p className="text-gray-600 text-base mt-3 leading-snug">
                    {srv.desc?.slice(0, 150)}...
                  </p>
                )}
                <p className="text-base text-gray-700 mt-4">
                  Rate:{" "}
                  <span className="font-semibold text-gray-900">₹{srv.rate}</span>{" "}
                  | Min:{" "}
                  <span className="font-semibold text-gray-900">{srv.min}</span>{" "}
                  | Max:{" "}
                  <span className="font-semibold text-gray-900">{srv.max}</span>
                </p>

                <button
                  type="button"
                  onClick={() => handleAutoFill(srv)}
                  className="mt-5 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 text-lg rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  🛒 Place Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
