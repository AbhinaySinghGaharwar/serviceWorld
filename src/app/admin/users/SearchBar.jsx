"use client";
import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-10 max-w-lg relative z-10 w-full">
      <div
        className="
          flex items-center 
          bg-gray-100 dark:bg-[#0f1117]
          border border-gray-300 dark:border-gray-700
          rounded-xl px-4 shadow-sm
          focus-within:border-gray-500 dark:focus-within:border-gray-400
          transition
        "
      >
        <Search
          size={18}
          className="text-gray-600 dark:text-gray-300 mr-2"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full bg-transparent
            text-gray-800 dark:text-gray-200
            py-3 focus:outline-none
            placeholder-gray-500 dark:placeholder-gray-400
          "
        />
      </div>
    </div>
  );
}
