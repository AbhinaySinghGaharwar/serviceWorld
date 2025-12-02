import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaLock,
  FaKey,
  FaLanguage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

/* ----------------------------------------
   Section Component
---------------------------------------- */
export function Section({ icon, title, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-xl 
                 bg-white dark:bg-[#1A1F2B] 
                 border border-gray-300 dark:border-[#2B3143]
                 shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-gray-700 dark:text-gray-300">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </div>
      {content}
    </motion.div>
  );
}

/* ----------------------------------------
   Alert Box (Reusable)
---------------------------------------- */
export function AlertBox({ message }) {
  return (
    <div
      className="mt-4 px-4 py-3 rounded-lg text-sm
                 bg-gray-100 dark:bg-[#141823]
                 border border-gray-300 dark:border-[#2B3143]
                 text-gray-800 dark:text-gray-200
                 shadow-sm"
    >
      {message}
    </div>
  );
}

/* ----------------------------------------
   Password Input
---------------------------------------- */
export function PasswordInput({ label, value, onChange, show, setShow }) {
  return (
    <div className="mb-4 relative">
      <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
        {label}
      </label>

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg px-4 py-2.5 pr-10
                  bg-gray-100 dark:bg-[#0F1117]
                  border border-gray-300 dark:border-[#2B3143]
                  text-gray-900 dark:text-gray-200"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 text-gray-600 dark:text-gray-400"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

/* ----------------------------------------
   Input Component
---------------------------------------- */
export function Input({ label, value, readOnly }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <input
        value={value}
        readOnly={readOnly}
        className="w-full rounded-lg px-4 py-2.5
                  bg-gray-100 dark:bg-[#0F1117]
                  border border-gray-300 dark:border-[#2B3143]
                  text-gray-900 dark:text-gray-300"
      />
    </div>
  );
}

/* ----------------------------------------
   Select Component
---------------------------------------- */
export function Select({ label, options }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <select
        className="w-full rounded-lg px-4 py-2.5
                   bg-gray-100 dark:bg-[#0F1117]
                   border border-gray-300 dark:border-[#2B3143]
                   text-gray-900 dark:text-gray-200"
      >
        {options.map((opt, i) => (
          <option key={i} className="text-black dark:text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ----------------------------------------
   Button
---------------------------------------- */
export function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 py-3 rounded-lg font-semibold
                bg-gray-800 dark:bg-gray-700 text-white
                hover:bg-gray-700 dark:hover:bg-gray-600
                transition"
    >
      {text}
    </button>
  );
}
