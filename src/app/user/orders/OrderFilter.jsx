import {
  FaClipboardList,
  FaClock,
  FaBolt,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaLayerGroup,
} from "react-icons/fa";

const STATUS_ICONS = {
  Pending: <FaClock className="inline mr-1 text-[#4A6CF7]" />,
  Completed: <FaCheckCircle className="inline mr-1 text-[#16D1A5]" />,
  Processing: <FaSpinner className="inline animate-spin mr-1 text-[#4A6CF7]" />,
  Canceled: <FaTimesCircle className="inline mr-1 text-red-400" />,
  Partial: <FaBolt className="inline mr-1 text-yellow-400" />,
  Inprogress: <FaLayerGroup className="inline mr-1 text-gray-300" />,
};

export default function OrderFilter({ statusFilter, handleStatusFilter }) {
  const statuses = ["All", "Pending", "Processing", "Completed", "Partial"];

  return (
    <div className="mb-6 flex gap-2 flex-wrap justify-center sm:justify-start">
      {statuses.map((status) => {
        const isActive = statusFilter === status;

        return (
          <button
            key={status}
            onClick={() => handleStatusFilter(status)}
            className={`
              px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 
              transition-all duration-300 border
              ${
                isActive
                  ? "bg-[#4A6CF7]/20 border-[#4A6CF7] text-[#4A6CF7] shadow-[0_0_12px_rgba(74,108,247,0.3)] scale-[1.05]"
                  : "bg-[#1A1F2B] border border-[#2B3143] text-gray-300 hover:border-[#4A6CF7] hover:text-[#4A6CF7]"
              }
            `}
          >
            {STATUS_ICONS[status] || <FaClipboardList className="text-gray-400" />} 
            {status}
          </button>
        );
      })}
    </div>
  );
}
