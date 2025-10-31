"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

export default function EditWebsite() {
  const [formData, setFormData] = useState({
    siteName: "",
    panelName: "",
    maintenanceMode: false,
    logo: "",
    favicon: "",
    bronzeMember: "",
    silverMember: "",
    goldMember: "",
    reseller: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false); // ✅ prevent refetch

  // ✅ Fetch only once
  useEffect(() => {
    if (fetched) return; // prevent re-fetch on state updates
    
    setFetched(true);

    (async () => {
      try {
        const res = await fetch("/api/updateWebsite", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("❌ Failed to load settings:", err);
      }
    })();
  }, [fetched]);

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((p) => ({ ...p, [name]: files[0] }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));

    try {
      const res = await fetch("/api/updateWebsite", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        alert("✅ Settings updated successfully!");
        setFormData(result.settings);
      } else {
        alert("❌ Failed to update settings.");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("Error updating settings.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Website Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="Site Name" name="siteName" value={formData.siteName} onChange={handleChange} />
        <Input label="Panel Name" name="panelName" value={formData.panelName} onChange={handleChange} />

        <FileInput label="Logo" name="logo" file={formData.logo} onChange={handleFileChange} />
        <FileInput label="Favicon" name="favicon" file={formData.favicon} onChange={handleFileChange} />

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <span className="font-medium text-gray-700">Maintenance Mode</span>
          <Switch
            checked={formData.maintenanceMode}
            onChange={(v) => setFormData((p) => ({ ...p, maintenanceMode: v }))}
            className={`${
              formData.maintenanceMode ? "bg-green-500" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span
              className={`${
                formData.maintenanceMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["bronzeMember", "silverMember", "goldMember", "reseller"].map((field) => (
            <Input
              key={field}
              label={field.replace(/([A-Z])/g, " $1")}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          {loading ? "Updating..." : "Update Settings"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border text-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function FileInput({ label, name, file, onChange }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        className="w-full border text-gray-700 rounded-xl px-4 py-2"
      />
      {file && typeof file === "string" && (
        <img src={file} alt={name} className="mt-3 h-14 rounded-lg border" />
      )}
    </div>
  );
}
