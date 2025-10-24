"use client";

import { useEffect, useState } from "react";

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Canceled: "bg-red-100 text-red-800",
  Partial: "bg-orange-100 text-orange-800",
  Inprogress: "bg-purple-100 text-purple-800",
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
      <div className="mb-6 flex gap-2 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              statusFilter === status ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => handleStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">No orders found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold truncate">Order #{order._id}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Service:</span> {order.serviceName || order.service}
              </div>
              <div className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Link:</span> <a href={order.link} target="_blank" className="text-blue-600 hover:underline">{order.link}</a>
              </div>
              <div className="text-gray-600 text-sm mb-1 flex justify-between">
                <div><span className="font-medium">Quantity:</span> {order.quantity}</div>
                <div><span className="font-medium">Charge:</span> ₹{order.charge}</div>
              </div>
              <div className="text-gray-600 text-sm">
                <span className="font-medium">Start Count:</span> {order.startCount || "-"} | <span className="font-medium">Remains:</span> {order.remains || "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
