"use client";

import { getServices } from "@/lib/services";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { MdReceipt, MdAccessTime } from "react-icons/md";
import { createOrderAction } from "@/lib/userActions";
import QuickActions from "./QuickActions";

export default function OrderForm({ selectedCategory }) {
  const [category, setCategory] = useState(selectedCategory);
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [charge, setCharge] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseType, setResponseType] = useState("success");
  const [quantityError, setQuantityError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const categoryRef = useRef(null);
  const searchRef = useRef(null);
  

  // Load all services
  useEffect(() => {
    (async () => {
      const data = await getServices();
      if (data) setServices(data);
    })();
  }, []);

  // Update category when category filter clicked from Dashboard
  useEffect(() => {
    if (selectedCategory && categories?.length > 0) {
      const matched = categories.find((cat) =>
        cat.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      if (matched) setCategory(matched);
    }
  }, [selectedCategory, categories]);

  // Extract categories
  useEffect(() => {
    if (services.length > 0) {
      const cats = [...new Set(services.map((s) => s.category).filter(Boolean))];
      setCategories(cats);
      if (!category) setCategory(cats[0] || "");
    }
  }, [services]);

  // Search services
  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      const result = services.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(result);
      setLoading(false);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm, services]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!categoryRef.current?.contains(e.target)) setCategoryDropdownOpen(false);
      if (!dropdownRef.current?.contains(e.target)) setDropdownOpen(false);
      if (!searchRef.current?.contains(e.target)) setSearchDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate charge
  useEffect(() => {
    if (service && quantity) {
      const srv = services.find((s) => s.service === service);
      if (srv) {
        const rate = parseFloat(srv.rate.toString().replace(/,/g, ""));
        const total = (rate / 1000) * Number(quantity);
        setCharge(total.toFixed(2));
      }
    }
  }, [service, quantity, services]);

  // Quantity validation
  useEffect(() => {
    const srv = services.find((s) => s.service === service);
    if (!srv) return;

    const qty = Number(quantity);
    if (qty < srv.min) setQuantityError(`Minimum allowed quantity is ${srv.min}`);
    else if (qty > srv.max) setQuantityError(`Maximum allowed quantity is ${srv.max}`);
    else setQuantityError("");
  }, [quantity, service]);

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !link || !quantity || !charge) {
      setResponseMessage("⚠️ Please fill all fields.");
      setResponseType("error");
      return;
    }

    if (quantityError) {
      setResponseMessage(quantityError);
      setResponseType("error");
      return;
    }

    setSubmitting(true);

    try {
      const res = await createOrderAction(service, link, quantity, charge);

      if (!res.success) {
        setResponseMessage("❌ Failed to create order");
        setResponseType("error");
      } else {
        setResponseMessage(`✅ Order created successfully (ID: ${res.orderId})`);
        setResponseType("success");
        setService("");
        setLink("");
        setQuantity("");
        setCharge("");
        setSearchTerm("");
      }
    } catch (err) {
      setResponseMessage("❌ Something went wrong.");
      setResponseType("error");
    }

    setSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center py-8  sm:px-6 lg:px-8">
      
      <div
        className="
        w-full max-w-4xl 
        bg-white dark:bg-[#1A1F2B]
        border border-gray-300 dark:border-[#2B3143] 
        rounded-2xl shadow-lg
        py-6 sm:p-8
        px-2
        transition-all duration-300
      "
      >
      
        {/* Title */}
        <h2
          className="
          flex items-center justify-center gap-3 
          text-3xl sm:text-4xl font-bold 
          text-[#4A6CF7]
          drop-shadow-[0_0_8px_rgba(74,108,247,0.5)]
          mb-8
        "
        >
          <MdReceipt size={38} /> Place Order
        </h2>
         <QuickActions/>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* SEARCH */}
          <div className="relative" ref={searchRef}>
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6CF7]"
            />
            <input
              type="text"
              placeholder="Search service..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchDropdownOpen(true);
              }}
              className="
              w-full pl-10 pr-3 py-2 rounded-lg 
              bg-gray-100 dark:bg-[#0F1117]
              border border-gray-300 dark:border-[#2B3143]
              text-[#1A1A1A] dark:text-white
              placeholder-[#4B5563] dark:placeholder-[#A0AEC3]
              focus:ring-2 focus:ring-[#4A6CF7]
            "
            />

            {searchTerm && searchDropdownOpen && (
              <div
                className="
                absolute mt-2 w-full rounded-lg z-20 
                bg-white dark:bg-[#1A1F2B]
                border border-gray-300 dark:border-[#2B3143]
                shadow-lg max-h-64 overflow-y-auto
              "
              >
                {loading ? (
                  <div className="p-4 text-center text-[#4A6CF7]">
                    <FaSpinner className="animate-spin inline-block mr-2" />
                    Searching...
                  </div>
                ) : filteredServices.length > 0 ? (
                  filteredServices.map((srv) => (
                    <div
                      key={srv.service}
                      onClick={() => {
                        setSearchTerm(srv.name);
                        setService(srv.service);
                        setSelectedService(srv);
                        setCategory(srv.category);
                        setSearchDropdownOpen(false);
                      }}
                      className="
                      px-4 py-3 cursor-pointer 
                      hover:bg-[#4A6CF7]/10 transition
                    "
                    >
                      <p className="text-[#4A6CF7] font-semibold">{srv.name}</p>
                      <p className="text-sm text-[#A0AEC3]">
                        {srv.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center p-3 text-[#A0AEC3]">
                    No results found.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* CATEGORY */}
          <div ref={categoryRef}>
            <label className="block mb-1 text-sm font-medium text-[#4B5563] dark:text-[#A0AEC3]">
              Category
            </label>
            <div
              className="
              bg-gray-100 dark:bg-[#0F1117]
              border border-gray-300 dark:border-[#2B3143]
              px-3 py-2 rounded-lg cursor-pointer
            "
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            >
              {category || "Select category"}
            </div>

            {categoryDropdownOpen && (
              <ul
                className="
                absolute mt-2 w-full rounded-lg z-20 
                bg-white dark:bg-[#1A1F2B]
                border border-gray-300 dark:border-[#2B3143]
                max-h-56 overflow-y-auto shadow-lg
              "
              >
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setCategoryDropdownOpen(false);
                    }}
                    className="
                    px-4 py-2 hover:bg-[#4A6CF7]/10 cursor-pointer
                    text-[#1A1A1A] dark:text-white
                  "
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* SERVICE */}
          <div ref={dropdownRef}>
            <label className="block mb-1 text-sm font-medium text-[#4B5563] dark:text-[#A0AEC3]">
              Service
            </label>

            <div
              className="
              bg-gray-100 dark:bg-[#0F1117]
              border border-gray-300 dark:border-[#2B3143]
              px-3 py-2  rounded-lg cursor-pointer
            "
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {service
                ? `${selectedService?.service} | ${selectedService?.name} | ₹${selectedService?.rate}`
                : "Select a service"}
            </div>

            {dropdownOpen && filteredServices.length > 0 && (
              <ul
                className="
                absolute mt-2 w-full rounded-lg z-20 
                bg-white dark:bg-[#1A1F2B]
                border border-gray-300 dark:border-[#2B3143]
                max-h-56 overflow-y-auto shadow-lg
              "
              >
                {filteredServices.map((srv) => (
                  <li
                    key={srv.service}
                    onClick={() => {
                      setService(srv.service);
                      setSelectedService(srv);
                      setDropdownOpen(false);
                    }}
                    className="
                    px-4 py-2 hover:bg-[#4A6CF7]/10 cursor-pointer
                    text-[#1A1A1A] dark:text-white
                  "
                  >
                    {srv.service} — {srv.name} — ₹{srv.rate}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* SERVICE INFO */}
          {selectedService && (
            <div
              className="
              bg-gray-100 dark:bg-[#0F1117]
              border border-gray-300 dark:border-[#2B3143]
              p-4 rounded-lg shadow-sm
            "
            >
              <p className="font-semibold text-[#4A6CF7] mb-1">
                {selectedService.service} {selectedService.name}
              </p>

              <p className="text-sm text-[#A0AEC3] mb-2">
                {selectedService?.description || "No description available."}
              </p>

              <p className="flex items-center gap-2 text-[#4A6CF7]">
                <MdAccessTime />
                {selectedService.average_time || "No data available"}
              </p>
            </div>
          )}

          {/* LINK */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#4B5563] dark:text-[#A0AEC3]">
              Link
            </label>
            <input
              type="text"
              className="
              w-full px-3 py-2  rounded-lg
              bg-gray-100 dark:bg-[#0F1117]
              border border-gray-300 dark:border-[#2B3143]
              text-[#1A1A1A] dark:text-white
              placeholder-[#4B5563] dark:placeholder-[#A0AEC3]
              focus:ring-2 focus:ring-[#4A6CF7]
            "
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter post or video link"
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#4B5563] dark:text-[#A0AEC3]">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className={`
              w-full px-3 py-2  rounded-lg
              bg-gray-100 dark:bg-[#0F1117]
              border 
              ${
                quantityError
                  ? "border-red-500"
                  : "border-gray-300 dark:border-[#2B3143]"
              }
              text-[#1A1A1A] dark:text-white
              focus:ring-2 focus:ring-[#4A6CF7]
            `}
            />
            {quantityError && (
              <p className="text-red-400 text-sm">{quantityError}</p>
            )}
          </div>

          {/* CHARGE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#4B5563] dark:text-[#A0AEC3]">
              Charge
            </label>
            <input
              type="text"
              value={charge ? `₹${charge}` : ""}
              readOnly
              className="
              w-full px-3 py-2  rounded-lg
              bg-gray-100 dark:bg-[#0F1117]
              border border-gray-300 dark:border-[#2B3143]
              text-[#1A1A1A] dark:text-white
            "
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="
            w-full py-3 rounded-lg font-semibold 
            bg-[#4A6CF7] text-white 
            hover:bg-[#3b5be8] transition
            shadow-md shadow-[#4A6CF7]/30
            disabled:opacity-50
          "
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </div>
            ) : (
              "Place Order"
            )}
          </button>
        </form>

        {/* RESPONSE MESSAGE */}
        {responseMessage && (
          <p
            className={`
            mt-5 text-center font-medium text-sm
            ${
              responseType === "error"
                ? "text-red-400"
                : "text-green-400"
            }
          `}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}
