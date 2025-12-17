"use client";
import { useState, useRef, useEffect } from "react";

export default function Dropdown({ onSelect, label = "Select", options }) {
  const [selected, setSelected] = useState(null);
  const ref = useRef();

  // optional: reset selection on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        // no open state, but keeping logic safe
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const selectOption = (opt) => {
    setSelected(opt);
    onSelect?.(opt);
  };

  return (
    <div ref={ref} className="w-full">
   

      {/* Options always visible */}
      <ul className="bg-white border rounded-md shadow ">
        {options.map((opt) => (
          <li
            key={opt.value}
            onClick={() => selectOption(opt)}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-100
              ${selected?.value === opt.value ? "bg-gray-100 font-medium" : ""}
            `}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
