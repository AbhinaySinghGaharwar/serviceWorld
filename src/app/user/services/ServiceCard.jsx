export default function ServiceCard({ service, getIconForService, onSelect }) {
  return (
    <div
      className="
        bg-[#1A1F2B]
        border border-[#2B3143]
        rounded-2xl 
        p-5 
        transition-all duration-300
        hover:border-[#4A6CF7]
        hover:shadow-[0_0_18px_rgba(74,108,247,0.25)]
      "
    >
      <div>
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-3">
          {getIconForService(service.name)}
          <h3 className="text-lg font-semibold text-gray-100">
            {service.name}
          </h3>
        </div>

        {/* Details */}
        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-[#4A6CF7]">ID:</strong> {service.service}
        </p>

        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-[#4A6CF7]">Rate / 1K:</strong> ${service.rate}
        </p>

        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-[#4A6CF7]">Min:</strong> {service.min}
        </p>

        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-[#4A6CF7]">Max:</strong> {service.max}
        </p>
      </div>

      {/* Buy Button */}
      <button
        onClick={() => onSelect(service)}
        className="
          mt-4 w-full px-4 py-2 rounded-md 
          bg-gradient-to-r from-[#4A6CF7] to-[#16D1A5]
          text-black font-semibold
          transition-all duration-300
          hover:opacity-90
          hover:shadow-[0_0_15px_rgba(74,108,247,0.45)]
        "
      >
        Buy
      </button>
    </div>
  );
}
