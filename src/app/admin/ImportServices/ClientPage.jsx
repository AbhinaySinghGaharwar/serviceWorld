'use client'
import React, { useState, useRef, useEffect } from "react";
import {  getCategories, importServicesAction, StoreServicesInDB } from "@/lib/services";
import FormSection from "./FormSection";
import ServiceTable from "./ServiceTable";

export default function ClientPage({provider=[],}) {
  const [providerInput, setProviderInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]); // ids of selected rows
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [submitting, setSubmitting] = useState(false);
  const [openProviderDropdown, setOpenProviderDropdown] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const [profitPercentage, setProfitPercentage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [reviewServices, setReviewServices] = useState([]); // rows shown in final table



  // Import Services API Call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await importServicesAction({ url: providerInput, api: apiKey });

    if (result.error) {
      alert("Failed to import services!");
      setServices([]);
      setCategories([]);
      setSelectedServices([]);
      setShowServices(false);
      return;
    }

    const formatted = Array.isArray(result)
      ? result.map((s, i) => ({
          id: i + 1,
          name: s.service,
          category: s.category || "Other",
          min: s.min,
          max: s.max,
          rate: s.rate,
          provider: providerInput,
          api_category: s.category || "Other",
          ...s,
        }))
      : [];

    setServices(formatted);
    setSelectedServices([]);
    setShowServices(false);
    setReviewServices([]);

    const catList = await getCategories()
  
    setCategories(catList?.data);
     
  };

  // CHECK / UNCHECK ONLY LOGIC
 const handleRowCheck = (id, checked, allIds = []) => {
  if (id === "selectAllFinal") {
    // bulk select/unselect
    setSelectedServices(allIds);
    return;
  }

  setSelectedServices((prev) =>
    checked ? [...prev, id] : prev.filter((x) => x !== id)
  );
};


  // Keep selectAll state synced
  useEffect(() => {
    setSelectAll(
      services.length > 0 &&
      selectedServices.length > 0 &&
      selectedServices.length === services.length
    );
  }, [selectedServices, services]);

  const filteredServices = services.filter((s) => {
    return (
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (activeCategory === "All" || s.category === activeCategory)
    );
  });

  // Submit Categories → prepare final table list
  const handleCategorySubmit = () => {
    if (selectedServices.length === 0) {
      alert("Select at least one service!");
      return;
    }
    const initialReview = services.filter((s) => selectedServices.includes(s.id));
    setReviewServices(initialReview); // freeze rows shown in final table
    setShowServices(true);
  };

  // Final Submit
  const handleFinalSubmit = async () => {
    const selected = services.filter((s) => selectedServices.includes(s.id));

    if (selected.length === 0) {
      alert("No services selected to submit!");
      return;
    }

    setSubmitting(true);
    const res = await StoreServicesInDB({ services: selected, profitPercentage });
    alert(res.message);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <FormSection
        provider={provider}
        providerInput={providerInput}
        apiKey={apiKey}
        profitPercentage={profitPercentage}
        openProviderDropdown={openProviderDropdown}
        setOpenProviderDropdown={setOpenProviderDropdown}
        setProviderInput={setProviderInput}
        setApiKey={setApiKey}
        setProfitPercentage={setProfitPercentage}
        handleSubmit={handleSubmit}
      />

      {/* MAIN TABLE */}
     {/* MAIN TABLE */}
{categories.length > 0 && !showServices && (
  <div className="border p-4 rounded-2xl shadow bg-white dark:bg-gray-900">

    <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="border p-2 text-center">
            {/* SELECT ALL CHECKBOX */}
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectAll(checked);

                if (checked) {
                  // select ALL visible rows (filtered list)
                  const allVisibleIds = filteredServices.map((s) => s.id);
                  setSelectedServices(allVisibleIds);
                } else {
                  // unselect all
                  setSelectedServices([]);
                }
              }}
            />
          </th>
          <th className="border p-2">ID</th>
          <th className="border p-2">Select Categories</th>
          <th className="border p-2">API Category Name</th>
        </tr>
      </thead>

      <tbody>
        {filteredServices.map((service) => (
          <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="border p-2 text-center">
              <input
                type="checkbox"
                checked={selectedServices.includes(service.id)}
                onChange={(e) => handleRowCheck(service.id, e.target.checked)}
              />
            </td>

            <td className="border p-2 text-center">{service.id}</td>

            <td className="border p-2">
              <select
                className="form-control w-full p-1 border rounded-lg"
                value={service.category || ""}
                onChange={(e) =>
                  setServices((prev) =>
                    prev.map((s) =>
                      s.id === service.id
                        ? {
                            ...s,
                            category:
                              e.target.value === "0"
                                ? "Other"
                                : e.target.value,
                          }
                        : s
                    )
                  )
                }
              >
                <option value="0">Create New</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </td>

            <td className="border p-2">
              <input
                readOnly
                className="form-control w-full p-1 border rounded-lg bg-gray-50 dark:bg-gray-800"
                value={service.api_category || ""}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <button
      onClick={handleCategorySubmit}
      className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl shadow hover:opacity-90"
    >
      Submit Categories
    </button>
  </div>
)}

{/*  profitPercentage,
  reviewServices,
  selectedServices,
  handleRowCheck,
  setReviewServices,categories,handleFinalSubmit,submitting */}
 {showServices&& <ServiceTable profitPercentage={profitPercentage} reviewServices={reviewServices} selectedServices={selectedServices}handleRowCheck={handleRowCheck} setReviewServices={setReviewServices}categories={categories} handleFinalSubmit={handleFinalSubmit} submitting={submitting}/>}
{/* FINAL TABLE */}


    </div>
  );
}
