"use client";

import { useState, useEffect } from "react";
import OrderGrid from "./OrderGrid";
import OrderFilter from "./OrderFilter";
import { FaSpinner, FaClipboardList } from "react-icons/fa";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    // Mock Data
    const mockOrders = [];
    const statuses = ["Processing", "Partial", "Completed", "Pending"];

    let id = 1000;
    statuses.forEach((status) => {
      for (let i = 0; i < 5; i++) {
        mockOrders.push({
          _id: id++,
          status,
          createdAt: new Date(Date.now() - Math.random() * 100000000),
          serviceName: `Service ${i + 1} (${status})`,
          link: "https://example.com",
          quantity: Math.floor(Math.random() * 500) + 100,
          charge: (Math.random() * 5).toFixed(2),
          startCount: Math.floor(Math.random() * 5000),
          remains: Math.floor(Math.random() * 200),
        });
      }
    });

    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 800);
  }, []);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    if (status === "All") setFilteredOrders(orders);
    else setFilteredOrders(orders.filter((o) => o.status === status));
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-200 p-4 md:p-6">

      {/* 🔵 Filter Bar */}
      <OrderFilter
        statusFilter={statusFilter}
        handleStatusFilter={handleStatusFilter}
      />

      {/* 🔄 Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-medium flex flex-col items-center">
          <FaSpinner className="animate-spin text-3xl mb-2 text-[#4A6CF7]" />
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        
        /* ❗ No Orders Found */
        <div className="text-center py-10 text-gray-400 font-medium flex flex-col items-center">
          <FaClipboardList className="text-3xl mb-2 text-gray-500" />
          <p>No orders found.</p>
        </div>

      ) : (
        <OrderGrid orders={filteredOrders} />
      )}
    </div>
  );
}
