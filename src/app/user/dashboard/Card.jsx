// -------------------------
// Card Component
// -------------------------
const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`
      bg-white dark:bg-[#1A1F2B]
      border border-gray-300 dark:border-[#2B3143]
      rounded-2xl shadow-md p-3 sm:p-4 lg:p-5
      hover:border-[#4A6CF7]
      hover:shadow-lg hover:shadow-[#4A6CF7]/20
      transition-all cursor-pointer
      ${className}
    `}
  >
    {children}
  </div>
);
export default Card