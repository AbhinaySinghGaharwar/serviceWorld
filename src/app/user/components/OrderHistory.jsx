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

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Canceled: "bg-red-100 text-red-800",
  Partial: "bg-orange-100 text-orange-800",
  Inprogress: "bg-purple-100 text-purple-800",
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
    <div className="content_area p-4">
      {/* Status Filter Pills */}
      <div className="mb-6 flex gap-2 flex-wrap justify-center sm:justify-start">
        {statuses.map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
              statusFilter === status
                ? "bg-blue-600 text-white shadow-lg scale-[1.05]"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => handleStatusFilter(status)}
          >
            {STATUS_ICONS[status] || <FaClipboardList />} {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium flex flex-col items-center">
          <FaSpinner className="animate-spin text-3xl mb-2 text-blue-500" />
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">
          <FaClipboardList className="inline-block text-2xl mb-2 text-gray-400" />
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold flex items-center gap-2 truncate">
                  <FaClipboardList className="text-blue-600" /> Order #{order._id}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                    STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {STATUS_ICONS[order.status] || ""} {order.status || "Pending"}
                </span>
              </div>

              <div className="space-y-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-500" />
                  <span>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-indigo-500" />
                  <span>
                    <span className="font-medium">Service:</span> {order.serviceName || order.service}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaLink className="text-indigo-500" />
                  <a
                    href={order.link}
                    target="_blank"
                    className="text-blue-600 hover:underline truncate max-w-[220px]"
                    rel="noopener noreferrer"
                  >
                    {order.link}
                  </a>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaLayerGroup className="text-indigo-500" />
                    <span>
                      <span className="font-medium">Qty:</span> {order.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-green-600" />
                    <span className="font-semibold">{order.charge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaBolt className="text-yellow-500" />
                  <span>
                    <span className="font-medium">Start:</span> {order.startCount || "-"} |{" "}
                    <span className="font-medium">Remains:</span> {order.remains || "-"}
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
