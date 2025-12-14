"use client";

import { useState } from "react";

export default function PaymentTable({ dbData }) {
  const [data, setData] = useState(()=>JSON.parse(dbData));
  const [search, setSearch] = useState("");

  const filtered = data.filter(
    (p) =>
      p.utr?.toLowerCase().includes(search.toLowerCase()) ||
      p.gateway?.toLowerCase().includes(search.toLowerCase())||
      p?.username?.toLowerCase().includes(search.toLowerCase())||
      p?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 bg-gray-50 p-4">
      <input
        type="text"
        placeholder="Search by UTR / Gateway / Email / Username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
      />

      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2 text-left">UTR</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Gateway</th>
            <th className="border px-3 py-2">UserName</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No results
              </td>
            </tr>
          ) : (
            filtered.map((p) => (
              <tr key={p._id} className="hover:bg-gray-100">
                <td className="border px-3 py-2">{p.utr}</td>
                <td className="border px-3 py-2">₹{p.amount}</td>
                <td className="border px-3 py-2">{p.status}</td>
                <td className="border px-3 py-2">{p.gateway}</td>
                <td className="border px-3 py-2">{p?.username}</td>
                <td className="border px-3 py-2">{p?.email}</td>
                <td className="border px-3 py-2">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
