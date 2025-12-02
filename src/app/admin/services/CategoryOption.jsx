import { Edit, Trash2 } from "lucide-react";
import { deleteCategoryAllServices } from "@/lib/services";
import { UpdateAllCategoryServiceAction } from "@/lib/customservices";
import { useState, useRef, useEffect } from "react";

export default function CategoryOption({ category, OnClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState(category);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Save updated category
  const handleSave = async () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    setLoading(true);
    const res = await UpdateAllCategoryServiceAction(newCategory.trim(), category);

    setLoading(false);
    if (res.status) {
      alert(res.message);
      setIsModalOpen(false);
      OnClose && OnClose();
    } else {
      alert("Error: " + res.message);
    }
  };

  // Delete category
  const handleDelete = async () => {
    const ok = confirm(`Delete category "${category}" and all its services?`);
    if (!ok) return;

    const res = await deleteCategoryAllServices({ category });
    if (res.status) {
      alert(res.message);
      OnClose && OnClose();
    } else {
      alert("Error: " + res.message);
    }
  };

  return (
    <div className="flex px-10 items-center">
      <div className="flex pr-5 pl-5 gap-3">
        <Edit
          size={20}
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer hover:scale-110 transition text-blue-500 hover:text-blue-700"
        />

        <Trash2
          size={20}
          onClick={handleDelete}
          className="cursor-pointer hover:scale-110 transition text-red-500 hover:text-red-700"
        />
      </div>

      {/* =================== EDIT CATEGORY POPUP =================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div
            ref={modalRef}
            className="bg-white dark:bg-[#0B1220] p-6 rounded-xl shadow-xl w-[320px]"
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
              Edit Category
            </h2>

            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-[#0F1724] text-gray-700 dark:text-gray-200 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleSave}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
