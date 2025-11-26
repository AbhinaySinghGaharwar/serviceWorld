import { FaSearch } from "react-icons/fa";

export default function SearchBar({ searchTerm, setSearchTerm, loadingSearch }) {
  return (
    <div className="relative w-full sm:w-[90%] mx-auto mb-8">
      
      {/* Search Icon */}
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search service by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full pl-10 pr-10 py-2 rounded-xl
          bg-gray-100 dark:bg-[#1A1F2B]
          border border-gray-300 dark:border-[#2B3143]
          text-gray-800 dark:text-gray-200
          placeholder-gray-500 dark:placeholder-gray-400
          focus:border-gray-500 dark:focus:border-gray-500
          focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
          outline-none transition
        "
      />

      {/* Loading Spinner */}
      {loadingSearch && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 animate-spin">
          <FaSearch />
        </div>
      )}

    </div>
  );
}
