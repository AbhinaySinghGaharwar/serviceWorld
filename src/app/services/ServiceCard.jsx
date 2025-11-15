export default function ServiceCard({ service, getIconForService, onSelect }) {
  return (
    <div
      className="
        bg-white dark:bg-[#1A1F2B]
        border border-gray-200 dark:border-[#2B3143]
        rounded-2xl p-5 
        transition-all duration-300 
        hover:border-[#4A6CF7] 
        hover:shadow-lg hover:shadow-[#4A6CF7]/20
      "
    >
      <div>
        {/* Title + Icon */}
        <div className="flex items-center gap-3 mb-3">
          {getIconForService(service.name)}
          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">
            {service.name}
          </h3>
        </div>

        {/* ID */}
        <p className="text-sm text-[#4B5563] dark:text-[#A0AEC3] mb-1">
          <strong className="text-[#4A6CF7]">ID:</strong> {service.service}
        </p>

        {/* Rate */}
        <p className="text-sm text-[#4B5563] dark:text-[#A0AEC3] mb-1">
          <strong className="text-[#16D1A5]">Rate / 1K:</strong> ${service.rate}
        </p>

        {/* Min */}
        <p className="text-sm text-[#4B5563] dark:text-[#A0AEC3] mb-1">
          <strong className="text-[#16D1A5]">Min:</strong> {service.min}
        </p>

        {/* Max */}
        <p className="text-sm text-[#4B5563] dark:text-[#A0AEC3] mb-1">
          <strong className="text-[#16D1A5]">Max:</strong> {service.max}
        </p>
      </div>

      {/* Buy Button */}
      <button
        onClick={() => onSelect(service)}
        className="
          mt-4 w-full px-4 py-2 rounded-md 
          bg-[#4A6CF7] text-white 
          font-semibold
          hover:bg-[#3D5DE0]
          transition shadow-md
        "
      >
        Buy
      </button>
    </div>
  );
}
