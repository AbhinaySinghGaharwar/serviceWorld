import {
  FaClipboardList,
  FaCalendarAlt,
  FaLayerGroup,
  FaLink,
  FaRupeeSign,
  FaBolt,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";

const STATUS_STYLES = {
  Pending: "bg-[#4A6CF7]/20 text-[#4A6CF7]",
  Completed: "bg-[#16D1A5]/20 text-[#16D1A5]",
  Processing: "bg-[#4A6CF7]/30 text-[#4A6CF7]",
  Canceled: "bg-red-500/20 text-red-400",
  Partial: "bg-yellow-500/20 text-yellow-400",
  Inprogress: "bg-purple-500/20 text-purple-400",
};

const STATUS_ICONS = {
  Pending: <FaClock className="inline mr-1" />,
  Completed: <FaCheckCircle className="inline mr-1" />,
  Processing: <FaSpinner className="inline animate-spin mr-1" />,
  Canceled: <FaTimesCircle className="inline mr-1" />,
  Partial: <FaBolt className="inline mr-1" />,
  Inprogress: <FaLayerGroup className="inline mr-1" />,
};

export default function OrderCard({ order }) {
  return (
    <div
      className="
        bg-[#1A1F2B] p-5 rounded-2xl 
        border border-[#2B3143]
        shadow-[0_0_12px_rgba(74,108,247,0.10)]
        hover:shadow-[0_0_20px_rgba(74,108,247,0.25)]
        hover:border-[#4A6CF7]
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold flex items-center gap-2 truncate text-[#4A6CF7]">
          <FaClipboardList /> Order #{order._id}
        </h3>

        <span
          className={`
            px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1
            ${STATUS_STYLES[order.status] || "bg-gray-700 text-gray-300"}
          `}
        >
          {STATUS_ICONS[order.status] || ""}
          {order.status || "Pending"}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-2 text-gray-300 text-sm">
        {/* Date */}
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-[#4A6CF7]" />
          <span>
            <span className="font-medium text-gray-200">Date:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Service */}
        <div className="flex items-center gap-2">
          <FaLayerGroup className="text-[#4A6CF7]" />
          <span>
            <span className="font-medium text-gray-200">Service:</span>{" "}
            {order.serviceName}
          </span>
        </div>

        {/* Link */}
        <div className="flex items-center gap-2">
          <FaLink className="text-[#4A6CF7]" />
          <a
            href={order.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A6CF7] hover:underline truncate max-w-[220px]"
          >
            {order.link}
          </a>
        </div>

        {/* Qty + Charge */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaLayerGroup className="text-[#4A6CF7]" />
            <span>
              <span className="font-medium text-gray-200">Qty:</span>{" "}
              {order.quantity}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaRupeeSign className="text-[#16D1A5]" />
            <span className="font-semibold text-[#16D1A5]">
              {order.charge}
            </span>
          </div>
        </div>

        {/* Start/Remain */}
        <div className="flex items-center gap-2">
          <FaBolt className="text-[#4A6CF7]" />
          <span>
            <span className="font-medium text-gray-200">Start:</span>{" "}
            {order.startCount || "-"}{" "}
            <span className="mx-1">|</span>
            <span className="font-medium text-gray-200">Remains:</span>{" "}
            {order.remains || "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
