export default function ServiceTable({
  profitPercentage,
  reviewServices,
  selectedServices,
  handleRowCheck,
  setReviewServices,
  categories,
  handleFinalSubmit,
  submitting,
}) {

  const allSelected =
    reviewServices.length > 0 &&
    selectedServices.length === reviewServices.length;

  return (
    <>
      <div className="border p-4 rounded-2xl shadow bg-white dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-3 text-center">Selected Services</h2>

        <table className="table-auto w-full border-collapse border border-gray-400 dark:border-gray-600 text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {/* SELECT ALL CHECKBOX */}
              <th className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    if (checked) {
                      // select ALL review rows
                      const ids = reviewServices.map((s) => s.id);
                      handleRowCheck("selectAllFinal", true, ids);
                    } else {
                      // unselect all
                      handleRowCheck("selectAllFinal", false, []);
                    }
                  }}
                />
              </th>

              <th className="border p-2">ID</th>
              <th className="border p-2">Service Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Provider</th>
              <th className="border p-2">Rate + {profitPercentage + "%"}</th>
              <th className="border p-2">Min</th>
              <th className="border p-2">Max</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>

          <tbody>
            {reviewServices.map((s) => (
              <tr key={s.id}>
                {/* Checkbox */}
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(s.id)}
                    onChange={(e) => handleRowCheck(s.id, e.target.checked)}
                  />
                </td>

                {/* ID */}
                <td className="border p-2 text-center">{s.id}</td>

                {/* Service Name */}
                <td className="border p-2">
                  <input
                    className="border rounded p-1"
                    value={s.name || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? { ...row, name: e.target.value }
                            : row
                        )
                      )
                    }
                  />
                </td>

                {/* Type */}
                <td className="border p-2">
                  <input
                    className="w-full border rounded p-1"
                    value={s.type || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? { ...row, type: e.target.value }
                            : row
                        )
                      )
                    }
                  />
                </td>

                {/* Category */}
                <td className="border p-2">
                  <select
                    className="w-full border rounded-lg p-1"
                    value={s.category || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? {
                                ...row,
                                category:
                                  e.target.value === "0"
                                    ? "Other"
                                    : e.target.value,
                              }
                            : row
                        )
                      )
                    }
                  >
                    <option value="0">Create New</option>
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat, i) => (
                        <option key={i} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </td>

                {/* Provider */}
                <td className="border p-2">
                  <input
                    className="w-full border rounded p-1"
                    value={s.provider || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? { ...row, provider: e.target.value }
                            : row
                        )
                      )
                    }
                  />
                </td>

                {/* Rate */}
                <td className="border p-2">
                  <input
                    className="w-full border rounded p-1"
                    value={s.rate || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? { ...row, rate: e.target.value }
                            : row
                        )
                      )
                    }
                  />

                  <div className="text-xs mt-1 text-gray-700 dark:text-gray-300 font-medium">
                    Final Rate:{" "}
                    {s.rate
                      ? (
                          Number(s.rate) +
                          (Number(s.rate) * profitPercentage) / 100
                        ).toFixed(2)
                      : "0.00"}
                  </div>
                </td>

                {/* Min */}
                <td className="border p-2">
                  <input
                    className="w-full border rounded p-1"
                    value={s.min || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? { ...row, min: e.target.value }
                            : row
                        )
                      )
                    }
                  />
                </td>

                {/* Max */}
                <td className="border p-2">
                  <input
                    className="w-full border rounded p-1"
                    value={s.max || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? { ...row, max: e.target.value }
                            : row
                        )
                      )
                    }
                  />
                </td>

                {/* Description */}
                <td className="border p-2">
                  <textarea
                    className="w-full border rounded p-1"
                    value={s.description || ""}
                    onChange={(e) =>
                      setReviewServices((prev) =>
                        prev.map((row) =>
                          row.id === s.id
                            ? {
                                ...row,
                                description: e.target.value,
                              }
                            : row
                        )
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submit Button */}
        <button
          onClick={handleFinalSubmit}
          disabled={submitting}
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-md rounded-xl shadow hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Import services"}
        </button>
      </div>
    </>
  );
}
