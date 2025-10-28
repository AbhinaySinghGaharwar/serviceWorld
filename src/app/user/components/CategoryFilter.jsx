"use client";

import { useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaSpotify,
  FaTiktok,
  FaTelegram,
  FaLinkedin,
  FaDiscord,
  FaGlobe,
  FaStar,
  FaInfinity,
} from "react-icons/fa";

const categories = [
  { icon: <FaInstagram />, label: "Instagram", key: "instagram" },
  { icon: <FaFacebook />, label: "Facebook", key: "facebook" },
  { icon: <FaYoutube />, label: "YouTube", key: "youtube" },
  { icon: <FaTwitter />, label: "Twitter", key: "twitter" },
  { icon: <FaSpotify />, label: "Spotify", key: "spotify" },
  { icon: <FaTiktok />, label: "TikTok", key: "tiktok" },
  { icon: <FaTelegram />, label: "Telegram", key: "telegram" },
  { icon: <FaLinkedin />, label: "LinkedIn", key: "linkedin" },
  { icon: <FaDiscord />, label: "Discord", key: "discord" },
  { icon: <FaGlobe />, label: "Website Traffic", key: "traffic" },
  { icon: <FaStar />, label: "Others", key: "other", isOther: true },
  { icon: <FaInfinity />, label: "Everything", key: "everything" },
];

export default function CategoryFilter() {
  const [active, setActive] = useState(null);

  const handleFilter = (key, isOther = false) => {
    setActive(key);
    console.log(isOther ? "Filter Others" : "Filter:", key);
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-4 flex justify-center transition-colors duration-300">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 max-w-6xl">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleFilter(cat.key, cat.isOther)}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.04]
              ${
                active === cat.key
                  ? "border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800"
                  : "border border-transparent bg-white text-black dark:bg-gray-800 dark:text-gray-100"
              }`}
          >
            <span
              className={`text-lg sm:text-xl ${
                active === cat.key
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {cat.icon}
            </span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
