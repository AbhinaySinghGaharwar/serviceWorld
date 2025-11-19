"use client";
import { useMemo, useState } from "react";
import { X } from "lucide-react";

export default function ExportPopup({ users = [], dusers = [], onClose }) {
  const [exportType, setExportType] = useState("active");
  const [selectedFields, setSelectedFields] = useState(["username", "email", "role"]);

  // Gather all fields (except sensitive)
  const allFields = useMemo(() => {
    const set = new Set();
    [...users, ...dusers].forEach((u) => {
      Object.keys(u || {}).forEach((k) => set.add(k));
    });
    ["password", "salt", "__v"].forEach((k) => set.delete(k));
    return Array.from(set);
  }, [users, dusers]);

  const toggleField = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  // Export logic
  const handleExport = () => {
    const data =
      exportType === "active"
        ? users
        : exportType === "deleted"
        ? dusers
        : [...users, ...dusers];

    if (!data?.length) return alert("No data to export.");
    if (!selectedFields.length) return alert("Select at least one field.");

    const header = selectedFields.join(",");
    const rows = data.map((row) =>
      selectedFields
        .map((f) => `"${String(row?.[f] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );

    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `${exportType}_users.csv`;
    link.click();

    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="
        bg-white dark:bg-[#1a1f2b]
        border border-gray-300 dark:border-gray-700
        rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative
      ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close export popup"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Export Users
        </h2>

        {/* Type select */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Select Type:
          </label>
          <select
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
            className="
              w-full bg-gray-100 dark:bg-[#0f1117]
              border border-gray-300 dark:border-gray-700
              text-gray-800 dark:text-gray-200
              rounded-lg px-3 py-2
            "
          >
            <option value="active">Active Users</option>
            <option value="deleted">Deleted Users</option>
            <option value="both">All Users</option>
          </select>
        </div>

        {/* Fields */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Select Fields to Export:
          </label>

          <div className="
            max-h-44 overflow-y-auto
            border border-gray-300 dark:border-gray-700
            rounded-lg p-3
            bg-gray-100 dark:bg-[#0f1117]
          ">
            {allFields.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No fields found.
              </p>
            ) : (
              allFields.map((field) => (
                <label
                  key={field}
                  className="flex items-center gap-2 py-1 text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field)}
                    onChange={() => toggleField(field)}
                    className="
                      w-4 h-4 
                      accent-gray-700 dark:accent-gray-300
                    "
                  />
                  {field}
                </label>
              ))
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-2
              bg-gray-300 hover:bg-gray-400 
              dark:bg-gray-700 dark:hover:bg-gray-600
              text-gray-800 dark:text-gray-200
              rounded-lg transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            className="
              px-4 py-2
              bg-gray-800 hover:bg-gray-700 
              dark:bg-gray-600 dark:hover:bg-gray-500
              text-white font-semibold 
              rounded-lg transition
            "
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
