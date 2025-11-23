export default function ViewModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1A1C1F] rounded-xl p-6 max-w-lg w-full border border-gray-300 dark:border-gray-700">
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Service Details
        </h2>

        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
          {Object.entries(service).map(([key, value]) => (
            <div key={key} className="text-sm">
              <strong className="text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/_/g, " ")}:
              </strong>{" "}
              <span className="text-gray-600 dark:text-gray-400">
                {value?.toString() || "-"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            Close
          </button>
          <button
            onClick={() => window.location.href = "/auth/login"}
            className="px-4 py-2 rounded-md bg-[#4A6CF7] text-white hover:bg-[#3D5DE0]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
