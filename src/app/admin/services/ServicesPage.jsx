"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function ServicesPage({ services }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);

  // 🌗 ONLY READ DARK MODE FROM LOCAL STORAGE
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // 🔍 Filter logic
  const filtered = useMemo(() => {
    return services.filter((srv) => {
      const s = search.toLowerCase();

      const matchesSearch =
        srv.name?.toLowerCase().includes(s) ||
        srv.desc?.toLowerCase().includes(s) ||
        srv.service?.toString().includes(s);

      const matchesCategory =
        selectedCategory === "All" ||
        srv.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, services]);

  // 🗂️ Group by category
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((srv) => {
      const cat = srv.category || "Uncategorized";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(srv);
    });
    return groups;
  }, [filtered]);

  // 📊 Category dropdown list
  const allCategories = [
    "All",
    ...new Set(services.map((s) => s.category).filter(Boolean)),
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-[#0e0e0f] text-gray-300"
          : "bg-gray-100 text-gray-900"
      } px-3 sm:px-6 lg:px-10 py-8 transition-all duration-300`}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-yellow-500 tracking-wide">
          All Services
        </h1>

        {/* Search */}
        <div className="relative w-full sm:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full ${
              theme === "dark"
                ? "bg-[#151517] border border-yellow-500/20 text-gray-200"
                : "bg-white border border-gray-300 text-gray-800"
            } rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-yellow-500 outline-none`}
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto ${
            theme === "dark"
              ? "bg-[#151517] border border-yellow-500/20 text-gray-300"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
        >
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div
        className={`rounded-2xl shadow-lg overflow-hidden border ${
          theme === "dark"
            ? "bg-[#151517] border-yellow-500/20"
            : "bg-white border-gray-300"
        }`}
      >
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead
              className={`border-b ${
                theme === "dark"
                  ? "bg-[#1a1a1c] text-yellow-400 border-yellow-500/20"
                  : "bg-gray-200 text-black border-gray-300"
              }`}
            >
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Rate</th>
                <th className="px-4 py-3 text-left">Min</th>
                <th className="px-4 py-3 text-left">Max</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            {/* ONLY ONE TBODY */}
            <tbody>
              {Object.keys(grouped).length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    No services found.
                  </td>
                </tr>
              )}

              {Object.keys(grouped).map((category) => (
                <React.Fragment key={category}>
                  {/* CATEGORY HEADER ROW */}
                  <tr
                    key={`cat-${category}`}
                    className={
                      theme === "dark"
                        ? "bg-[#1a1a1c] text-yellow-400"
                        : "bg-gray-200 text-gray-900"
                    }
                  >
                    <td
                      colSpan={7}
                      className="px-4 py-3 font-bold text-lg tracking-wide"
                    >
                      {category}
                    </td>
                  </tr>

                  {/* SERVICE ROWS */}
                  {grouped[category].map((srv) => (
                    <tr
                      key={`srv-${category}-${srv.service}`}
                      className={`border-b transition-all ${
                        theme === "dark"
                          ? "border-yellow-500/10 hover:bg-yellow-500/10"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <td className="px-4 py-3">{srv.service}</td>
                      <td className="px-4 py-3 font-semibold text-yellow-500">
                        {srv.name}
                      </td>
                      <td className="px-4 py-3 text-green-500 font-semibold">
                        ₹{srv.rate}
                      </td>
                      <td className="px-4 py-3">{srv.min}</td>
                      <td className="px-4 py-3">{srv.max}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            srv.status === "Enabled"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {srv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedService(srv)}
                          className="px-4 py-1 text-xs bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 hover:bg-yellow-500/30 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden">
          {Object.keys(grouped).map((category) => (
            <div key={category}>
              <h2
                className={`px-4 py-3 font-bold ${
                  theme === "dark"
                    ? "bg-[#1a1a1c] text-yellow-400"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {category}
              </h2>

              {grouped[category].map((srv) => (
                <div
                  key={`${category}-${srv.service}`}
                  className={`p-4 border-b ${
                    theme === "dark"
                      ? "border-yellow-500/10 hover:bg-[#1a1a1c]"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <h3 className="font-semibold text-lg text-yellow-500">
                    {srv.name}
                  </h3>

                  <p className="text-sm">
                    <span className="text-yellow-500">ID:</span> {srv.service}
                  </p>

                  <p className="text-sm text-green-500">
                    <span className="text-yellow-500">Rate:</span> ₹{srv.rate}
                  </p>

                  <p className="text-sm">
                    <span className="text-yellow-500">Min:</span> {srv.min} |
                    <span className="text-yellow-500"> Max:</span> {srv.max}
                  </p>

                  <button
                    onClick={() => setSelectedService(srv)}
                    className="mt-2 px-3 py-1 text-xs bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 hover:bg-yellow-500/30"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div
            className={`max-w-lg w-full p-6 rounded-2xl shadow-lg border relative ${
              theme === "dark"
                ? "bg-[#151517] border-yellow-500/30"
                : "bg-white border-gray-300"
            }`}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              {selectedService.name}
            </h2>

            <p className="text-sm mb-4 opacity-80">
              {selectedService.desc || "No description provided."}
            </p>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium text-yellow-500">Category:</span>{" "}
                {selectedService.category}
              </p>
              <p>
                <span className="font-medium text-yellow-500">Rate:</span> ₹
                {selectedService.rate}
              </p>
              <p>
                <span className="font-medium text-yellow-500">Min:</span>{" "}
                {selectedService.min} |{" "}
                <span className="font-medium">Max:</span>{" "}
                {selectedService.max}
              </p>
              <p>
                <span className="font-medium text-yellow-500">Status:</span>{" "}
                {selectedService.status}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 hover:bg-yellow-500/30 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
