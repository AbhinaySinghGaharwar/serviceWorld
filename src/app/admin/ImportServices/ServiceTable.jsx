   {/* Table */}
          <div className="overflow-x-auto mt-3">
            <table className="w-full border text-xs">
              <thead className="border-b bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-2">Select</th>
                  <th className="p-2 text-left">Service</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2">Rate</th>
                  <th className="p-2">Min</th>
                  <th className="p-2">Max</th>
                  <th className="p-2 text-right">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map(s => (
                  <tr key={s.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(s.id)}
                        onChange={() => toggleSelectService(s.id)}
                        className="h-4 w-4"
                      />
                    </td>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.category}</td>
                    <td className="p-2 text-center">{s.rate}</td>
                    <td className="p-2 text-center">{s.min}</td>
                    <td className="p-2 text-center">{s.max}</td>
                    <td className="p-2 text-right">
                      <button
                        type="button"
                        onClick={() => setViewService(s)}
                        className="px-2 py-1 bg-blue-600 text-white rounded-lg text-xs"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredServices.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-3 text-center text-sm text-gray-500">No services found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Final Submit */}
        <button
  onClick={handleFinalSubmit}
  disabled={submitting}
  className="mt-3 w-full py-2 bg-green-700 text-white text-sm rounded-lg hover:bg-green-600 disabled:opacity-50"
>
  {submitting ? "Submitting..." : "Submit Selected Services"}
</button>
     {/* ✅ Responsive Centered Details Panel */}
{viewService && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50">
    <div className="
      bg-white dark:bg-gray-900 
      w-full max-w-[420px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]
      max-h-[85vh] 
      overflow-y-auto 
      shadow-xl border rounded-2xl p-4
      animate-fadeIn
    ">
      <button
        onClick={() => setViewService(null)}
        className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg mb-3"
      >
        Close Panel
      </button>

      <pre className="text-[11px] sm:text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-xl border overflow-x-auto">
        {JSON.stringify(viewService, null, 2)}
      </pre>
    </div>
  </div>
)}
