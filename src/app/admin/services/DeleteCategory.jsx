"use client";

import { useState } from "react";
import { deleteCat } from "@/lib/customservices";

export default function DeleteCategory({ category = [], Isopen, setIsopen }) {
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const toggleOne = (cat) => {
    const updated = { ...selected, [cat]: !selected[cat] };
    setSelected(updated);
    setSelectAll(Object.values(updated).every(Boolean));
  };

  const toggleAll = (checked) => {
    setSelectAll(checked);
    const newSelected = {};
    category.forEach((cat) => (newSelected[cat] = checked));
    setSelected(newSelected);
  };

  const handleDelete = async () => {
    const selectedCats = Object.entries(selected)
      .filter(([_, val]) => val)
      .map(([cat]) => cat);

    if (selectedCats.length === 0) {
      return alert("No category selected!");
    }

    const res = await deleteCat(selected);
    alert(res.message);
  };

  if (!Isopen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      <div className="relative p-5 rounded-xl border bg-white shadow w-[330px]">

        {/* Close Icon Button (Improved UI) */}
        <button
          onClick={() => setIsopen(false)}
          className="absolute -right-3 -top-3 bg-white border rounded-full p-1 shadow hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-lg font-bold mb-3 mt-1">Delete Categories</h2>

        {category.length === 0 ? (
          <p className="text-gray-500 text-center py-5">No categories found.</p>
        ) : (
          <>
            {/* Select All */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => toggleAll(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-semibold">Select All</span>
            </div>

            {/* Category List */}
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
              {category.map((cat, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selected[cat] || false}
                    onChange={() => toggleOne(cat)}
                    className="w-4 h-4"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
            >
              Delete Selected
            </button>
          </>
        )}
      </div>
    </div>
  );
}
