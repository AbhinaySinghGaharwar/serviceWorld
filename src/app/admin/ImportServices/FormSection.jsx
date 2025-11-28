import React from "react";

export default function FormSection({
  setOpenProviderDropdown,
  setProviderInput,
  setApiKey,
  handleSubmit,
  providerInput,
  setProfitPercentage,
  provider,
  openProviderDropdown,
  profitPercentage,
  apiKey
}) {

  return (
    <>
   <div className="flex justify-center">
       {/* FORM SECTION */}
      <div className="flex w-[50%] border px-2 py-4 rounded-2xl justify-center shadow bg-white dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="space-y-3 w-full">

          {/* Provider Dropdown */}
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setOpenProviderDropdown(!openProviderDropdown)}
              className="w-full border px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm"
            >
              {provider?.find(p => p.providerUrl === providerInput)?.name || "Select Provider ▼"}
            </button>

            {openProviderDropdown && (
              <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border rounded-xl shadow z-50">
                {provider.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setProviderInput(p.providerUrl);
                      setApiKey(p.apiKey);
                      setOpenProviderDropdown(false);
                    }}
                    className="px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-sm"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hidden Inputs */}
          <input hidden value={providerInput} onChange={e => setProviderInput(e.target.value)} required />
          <input hidden type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} required />

          {/* Profit Percentage Input */}
          <label className="text-sm font-medium">Profit Percentage</label>
          <input
            placeholder="Profit Percentage"
            value={profitPercentage ? profitPercentage + "%" : ""}
            onChange={(e) => {
              const val = e.target.value.replace("%", "");
              if (!isNaN(val)) setProfitPercentage(val);
            }}
            className="w-full border p-2 rounded-lg text-sm"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700"
          >
            Import Services
          </button>

        </form>
      </div>
   </div>
    </>
  );
}
