"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AddCategory } from "@/lib/services";

export default function AddNewCategory() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");

  const onAdd = async () => {
    if (!category.trim()) return alert("Enter a category name");
    const res = await AddCategory({ category });
    alert(res.message);
    setOpen(false);
    setCategory("");
  };

  return (
    <>
      {/* ✅ Click button */}
      <button
        onClick={() => setOpen(true)}
        className="w-[90%] mt-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow hover:bg-gray-700 inline font-bold"
      >
        Add New Category
      </button>

      {/* ✅ POPUP MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white dark:bg-[#1A1C1F] border border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-md p-5 relative animate-fadeIn">

            {/* Close icon */}
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500 dark:text-gray-300">
              <FaTimes size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-3 text-center dark:text-white">Add New Category</h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold capitalize text-gray-800 dark:text-gray-200">
                Enter Category Name
              </label>

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Telegram, Instagram, etc"
                className="w-full px-3 py-2 mt-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E1F23] text-sm outline-none dark:text-white"
              />

              <button
                onClick={onAdd}
                className="w-full mt-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow hover:bg-gray-700 font-bold"
              >
                Save Category
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
