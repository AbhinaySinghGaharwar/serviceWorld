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

  // 🧠 Helper to truncate long instruction text
  const renderInstructionText = (text) => {
    const limit = 120; // characters to show before truncation
    if (text.length <= limit) return text;
    return expanded ? text : text.slice(0, limit) + "...";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* 🧾 QR Section */}
      <div
        className={`${bgMain} border ${borderColor} p-4 rounded-2xl shadow-inner flex flex-col items-center`}
      >
        <h6 className={`font-semibold ${headingColor} mb-3`}>Scan QR</h6>
        {filteredPaymentMethod ? (
          <img
            src={`data:image/png;base64,${filteredPaymentMethod}`}
            alt="QR Code"
            className="w-40 sm:w-52 h-auto rounded-lg"
          />
        ) : (
          <p className="text-center text-gray-500 text-sm">No QR available</p>
        )}
      </div>

      {/* 🧭 Instructions Section */}
      <div className={`${bgMain} border ${borderColor} rounded-xl p-4 text-sm`}>
        <h6 className={`font-semibold ${headingColor} mb-2`}>Instructions</h6>

        <ol className="list-decimal list-inside space-y-1 text-gray-500">
          {Instructions ? (
            Array.isArray(Instructions) ? (
              Instructions.map((inst, i) => (
                <li key={i} className="font-medium text-gray-400">
                  {inst.length > 120 ? (
                    <>
                      {renderInstructionText(inst)}
                      <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="text-yellow-400 ml-1 underline hover:text-yellow-300"
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
              <li className="font-medium text-gray-400">
                {renderInstructionText(Instructions)}
                {Instructions.length > 120 && (
                  <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-yellow-400 ml-1 underline hover:text-yellow-300"
                  >
                    {expanded ? "Show less" : "Read more"}
                  </button>
                )}
              </li>
            )
          ) : (
            <>
              <li>Scan the above QR using your UPI app.</li>
              <li>Send the desired amount.</li>
              <li>Enter the UTR number below after successful payment.</li>
            </>
          )}
        </ol>
      </div>
    </div>
  );
}
