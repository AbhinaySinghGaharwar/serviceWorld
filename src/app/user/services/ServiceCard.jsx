export default function ServiceCard({ service, getIconForService, onSelect }) {
  return (
    <div className="bg-[#151517] border border-yellow-500/20 rounded-2xl p-5 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
      <div>
        <div className="flex items-center gap-3 mb-3">
          {getIconForService(service.name)}
          <h3 className="text-lg font-semibold text-gray-100">
            {service.name}
          </h3>
        </div>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-yellow-400">ID:</strong> {service.service}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-yellow-400">Rate / 1K:</strong> ${service.rate}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-yellow-400">Min:</strong> {service.min}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="text-yellow-400">Max:</strong> {service.max}
        </p>
      </div>

      <button
        onClick={() => onSelect(service)}
        className="mt-4 w-full px-4 py-2 rounded-md bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 font-semibold hover:bg-yellow-500/20 hover:border-yellow-400 transition"
      >
        Buy
      </button>
    </div>
  );
}
