import { FaSearch } from "react-icons/fa";

export default function SearchBar({ searchTerm, setSearchTerm, loadingSearch }) {
  return (
    <div className="relative w-full sm:w-[90%] mx-auto mb-8">
      
      {/* Search icon */}
      <FaSearch className="
        absolute left-3 top-1/2 -translate-y-1/2 
        text-[#4B5563] 
        dark:text-[#A0AEC3]
      " />

      {/* Search input */}
      <input
        type="text"
        placeholder="Search service by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full pl-10 pr-10 py-2 rounded-xl 
          bg-white text-[#1A1A1A]
          placeholder-[#6B7280]

          dark:bg-[#1A1F2B] dark:text-white 
          dark:placeholder-[#A0AEC3]

          border border-gray-300 
          dark:border-[#2B3143]

          focus:border-[#4A6CF7]
          focus:ring-1 focus:ring-[#4A6CF7]

          outline-none transition
        "
      />

      {/* Loading spinner */}
      {loadingSearch && (
        <div className="
          absolute right-3 top-1/2 -translate-y-1/2 
          text-[#4A6CF7] animate-spin
        ">
          <FaSearch />
        </div>
      )}
    </div>
  );
}
