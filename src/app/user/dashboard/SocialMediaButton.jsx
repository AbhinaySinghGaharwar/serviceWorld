"use client";

import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

export default function SocialButtons({
  whatsappNumber = "",
  telegramUsername = "",
}) {
  const openWhatsApp = () => {
    if (!whatsappNumber) return alert("WhatsApp number is missing");
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const openTelegram = () => {
    if (!telegramUsername) return alert("Telegram username is missing");
    window.open(`https://t.me/${telegramUsername}`, "_blank");
  };

  return (
    <div className="flex flex-row items-center gap-3 sm:gap-4">

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="
          flex items-center gap-2 sm:gap-3
          
          /* MOBILE SIZE */
          px-4 py-3 text-sm min-w-[140px]
          
          /* TABLET */
          sm:px-5 sm:py-3 sm:text-base
          
          /* DESKTOP */
          lg:px-6 lg:py-4 lg:text-lg

          rounded-xl font-semibold
          bg-green-500/20 hover:bg-green-500/30
          text-green-600 dark:text-green-400
          dark:bg-green-500/10 dark:hover:bg-green-500/20
          backdrop-blur transition shadow-sm
          whitespace-nowrap
        "
      >
        <FaWhatsapp
          className="
            text-lg 
            sm:text-xl
            lg:text-2xl
          "
        />
        <span>Join WhatsApp</span>
      </button>

      {/* Telegram Button */}
      <button
        onClick={openTelegram}
        className="
          flex items-center gap-2 sm:gap-3
          
          /* MOBILE SIZE */
          px-4 py-3 text-sm min-w-[140px]

          /* TABLET */
          sm:px-5 sm:py-3 sm:text-base

          /* DESKTOP */
          lg:px-6 lg:py-4 lg:text-lg

          rounded-xl font-semibold
          bg-blue-500/20 hover:bg-blue-500/30
          text-blue-600 dark:text-blue-400
          dark:bg-blue-500/10 dark:hover:bg-blue-500/20
          backdrop-blur transition shadow-sm
          whitespace-nowrap
        "
      >
        <FaTelegramPlane
          className="
            text-lg
            sm:text-xl
            lg:text-2xl
          "
        />
        <span>Join Telegram</span>
      </button>

    </div>
  );
}
