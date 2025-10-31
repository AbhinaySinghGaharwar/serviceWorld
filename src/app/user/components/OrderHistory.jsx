"use client";

import { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaCalendarAlt,
  FaLink,
  FaLayerGroup,
  FaRupeeSign,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBolt,
} from "react-icons/fa";

const STATUS_STYLES = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Completed: "bg-green-500/20 text-green-400",
  Processing: "bg-blue-500/20 text-blue-400",
  Canceled: "bg-red-500/20 text-red-400",
  Partial: "bg-orange-500/20 text-orange-400",
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

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { method: "GET", credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  const statuses = ["All", "Pending", "Processing", "Completed", "Partial", "Canceled", "Inprogress"];

  return (
    <div className="bg-[#0e0e0f] min-h-screen text-gray-100 p-4 md:p-6">
      {/* Filter Buttons */}
      <div className="mb-6 flex gap-2 flex-wrap justify-center sm:justify-start">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusFilter(status)}
            className={`px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 border transition-all duration-300 ${
              statusFilter === status
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40 scale-[1.05]"
                : "bg-[#151517] border border-yellow-500/10 text-gray-300 hover:border-yellow-500/30"
            }`}
          >
            {STATUS_ICONS[status] || <FaClipboardList />} {status}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-medium flex flex-col items-center">
          <FaSpinner className="animate-spin text-3xl mb-2 text-yellow-400" />
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-10 text-gray-400 font-medium">
          <FaClipboardList className="inline-block text-2xl mb-2 text-gray-500" />
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-[#151517] p-5 rounded-2xl border border-yellow-500/20 shadow-md hover:shadow-yellow-500/10 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold flex items-center gap-2 truncate text-yellow-400">
                  <FaClipboardList /> Order #{order._id}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    STATUS_STYLES[order.status] || "bg-gray-700 text-gray-300"
                  }`}
                >
                  {STATUS_ICONS[order.status] || ""} {order.status || "Pending"}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-yellow-400" />
                  <span>
                    <span className="font-medium text-gray-200">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-yellow-400" />
                  <span>
                    <span className="font-medium text-gray-200">Service:</span>{" "}
                    {order.serviceName || order.service}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaLink className="text-yellow-400" />
                  <a
                    href={order.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline truncate max-w-[220px]"
                  >
                    {order.link}
                  </a>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaLayerGroup className="text-yellow-400" />
                    <span>
                      <span className="font-medium text-gray-200">Qty:</span>{" "}
                      {order.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-green-400" />
                    <span className="font-semibold text-green-400">{order.charge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaBolt className="text-yellow-400" />
                  <span>
                    <span className="font-medium text-gray-200">Start:</span>{" "}
                    {order.startCount || "-"} |{" "}
                    <span className="font-medium text-gray-200">Remains:</span>{" "}
                    {order.remains || "-"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
