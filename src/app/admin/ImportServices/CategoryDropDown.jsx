import { Search } from "lucide-react";
export default function CategoryDropdown({
    setSearch,categoryDropdownRef,setOpenCategoryDropdown,openCategoryDropdown,activeCategory,categories,setActiveCategory,search,
}){
    return (
        <>
             {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4" />
            <input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-2 pl-8 rounded-lg text-sm"
            />
          </div>

          {/* Category Dropdown */}
          <div ref={categoryDropdownRef} className="relative mt-3">
            <button
              type="button"
              onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
              className="w-full border px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800"
            >
              Category: {activeCategory} ▼
            </button>

            {openCategoryDropdown && (
              <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border rounded-xl shadow z-50">
                {categories.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveCategory(c);
                      setOpenCategoryDropdown(false);
                    }}
                    className="px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-sm"
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

</>
    )
}