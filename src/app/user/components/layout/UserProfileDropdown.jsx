// Image reference (uploaded by user): /mnt/data/2expec.png

import React, { useEffect, useRef } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";

/**
 * UserDropdown (controlled)
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - onSettings: () => void
 * - onLogout: () => void
 *
 * Usage:
 * const [menuOpen, setMenuOpen] = useState(false);
 * <button onClick={() => setMenuOpen(v => !v)}>Toggle</button>
 * <UserDropdown
 *   isOpen={menuOpen}
 *   onClose={() => setMenuOpen(false)}
 *   onSettings={() => { setMenuOpen(false); router.push('/user/settings') }}
 *   onLogout={() => { setMenuOpen(false); handleLogout() }}
 * />
 */

export default function UserDropdown({ isOpen, onClose, onSettings, onLogout }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!ref.current) return;
      if (!isOpen) return;
      if (!ref.current.contains(e.target)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`
        absolute right-0 top-12 w-48 rounded-xl overflow-hidden z-[99999]
        border shadow-lg transition

        /* Dark */
        dark:bg-[#1A1F2B] dark:border-gray-700 dark:text-white

        /* Light */
        bg-white border-gray-200 text-gray-700
      `}
    >
      {/* Settings */}
      <button
        className={`
          flex items-center gap-2 px-4 py-2 w-full text-sm transition

          /* Dark */
          dark:hover:bg-white/10

          /* Light */
          hover:bg-gray-100
        `}
        onClick={() => {
          onClose?.();
          onSettings?.();
        }}
      >
        <FiSettings className="text-gray-700 dark:text-white" />
        Settings
      </button>

      {/* Logout */}
      <button
        className={`
          flex items-center gap-2 px-4 py-2 w-full text-sm text-red-500 transition

          /* Dark */
          dark:hover:bg-red-500/10

          /* Light */
          hover:bg-red-100
        `}
        onClick={() => {
          onClose?.();
          onLogout?.();
        }}
      >
        <FiLogOut className="dark:text-red-400" />
        Logout
      </button>
    </div>
  );
}
