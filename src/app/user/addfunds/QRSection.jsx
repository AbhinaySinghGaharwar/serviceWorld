"use client";
import { useState } from "react";

export default function QRSection({
  filteredPaymentMethod,
  darkMode,
  headingColor,
  borderColor,
  bgMain,
  Instructions,
}) {
  const [expanded, setExpanded] = useState(false);

  // Truncate text helper
  const renderInstructionText = (text) => {
    const limit = 120;
    if (text.length <= limit) return text;
    return expanded ? text : text.slice(0, limit) + "...";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      {/* 📌 QR SECTION */}
      <div className="flex flex-col items-center">
        <h6 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Scan QR
        </h6>

        {filteredPaymentMethod ? (
          <img
            src={`data:image/png;base64,${filteredPaymentMethod}`}
            alt="QR Code"
            className="
              w-80 sm:w-52 h-auto rounded-lg
              shadow-md shadow-gray-400/30
              dark:shadow-gray-900/40
            "
          />
        ) : (
          <p className="text-center text-gray-500 text-sm dark:text-gray-400">
            No QR available
          </p>
        )}
      </div>

      {/* 📘 INSTRUCTIONS */}
      <div
        className={`
          ${bgMain || "bg-gray-50 dark:bg-[#1A1F2B]"} 
          border ${borderColor || "border-gray-300 dark:border-[#2B3143]"} 
          rounded-xl p-4 text-sm
          shadow-md shadow-gray-400/20 dark:shadow-black/20
        `}
      >
        <h6 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Instructions
        </h6>

        <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">

          {Instructions ? (
            Array.isArray(Instructions) ? (
              Instructions.map((inst, i) => (
                <li key={i} className="font-medium">
                  {inst.length > 120 ? (
                    <>
                      {renderInstructionText(inst)}
                      <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="
                          ml-1 underline underline-offset-2
                          text-gray-600 dark:text-gray-300
                          hover:text-gray-800 dark:hover:text-gray-100
                          transition
                        "
                      >
                        {expanded ? "Show less" : "Read more"}
                      </button>
                    </>
                  ) : (
                    inst
                  )}
                </li>
              ))
            ) : (
              <li className="font-medium">
                {renderInstructionText(Instructions)}

                {Instructions.length > 120 && (
                  <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="
                      ml-1 underline underline-offset-2
                      text-gray-600 dark:text-gray-300
                      hover:text-gray-800 dark:hover:text-gray-100
                      transition
                    "
                  >
                    {expanded ? "Show less" : "Read more"}
                  </button>
                )}
              </li>
            )
          ) : (
            <>
              <li>Scan the QR using your UPI app.</li>
              <li>Send the desired amount.</li>
              <li>Enter the UTR number below after payment.</li>
            </>
          )}

        </ol>
      </div>
    </div>
  );
}
