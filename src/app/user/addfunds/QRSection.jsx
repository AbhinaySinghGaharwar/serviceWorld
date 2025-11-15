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

  // Helper: truncate instructions
  const renderInstructionText = (text) => {
    const limit = 120;
    if (text.length <= limit) return text;
    return expanded ? text : text.slice(0, limit) + "...";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      
      {/* 📌 QR SECTION */}
      <div
        className={`
          ${bgMain} border ${borderColor} p-4 rounded-2xl 
          shadow-[0_0_12px_rgba(74,108,247,0.25)] 
          flex flex-col items-center
        `}
      >
        <h6 className={`font-semibold text-[#4A6CF7] mb-3 drop-shadow-[0_0_6px_rgba(74,108,247,0.5)]`}>
          Scan QR
        </h6>

        {filteredPaymentMethod ? (
          <img
            src={`data:image/png;base64,${filteredPaymentMethod}`}
            alt="QR Code"
            className="w-40 sm:w-52 h-auto rounded-lg shadow-[0_0_15px_rgba(74,108,247,0.25)]"
          />
        ) : (
          <p className="text-center text-gray-500 text-sm">No QR available</p>
        )}
      </div>

      {/* 📘 INSTRUCTIONS */}
      <div
        className={`
          ${bgMain} border ${borderColor} rounded-xl 
          p-4 text-sm shadow-[0_0_10px_rgba(74,108,247,0.15)]
        `}
      >
        <h6 className="font-semibold text-[#4A6CF7] mb-2 drop-shadow-[0_0_6px_rgba(74,108,247,0.5)]">
          Instructions
        </h6>

        <ol className="list-decimal list-inside space-y-1 text-gray-400">
          {Instructions ? (
            Array.isArray(Instructions) ? (
              Instructions.map((inst, i) => (
                <li key={i} className="font-medium text-gray-300">
                  {inst.length > 120 ? (
                    <>
                      {renderInstructionText(inst)}
                      <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="text-[#4A6CF7] ml-1 underline hover:text-[#3C59D4] transition"
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
              <li className="font-medium text-gray-300">
                {renderInstructionText(Instructions)}
                {Instructions.length > 120 && (
                  <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-[#4A6CF7] ml-1 underline hover:text-[#3C59D4]"
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
