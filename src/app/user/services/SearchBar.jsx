import { FaSearch } from "react-icons/fa";

export default function SearchBar({ searchTerm, setSearchTerm, loadingSearch }) {
  return (
    <div className="relative w-full sm:w-[90%] mx-auto mb-8">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search service by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2 rounded-xl bg-[#151517] border border-yellow-500/20 text-gray-200 placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
      />
      {loadingSearch && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 animate-spin">
          <FaSearch />
        </div>
      )}
    </div>
  );
}
