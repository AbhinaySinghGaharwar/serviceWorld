"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaSpotify,
  FaTiktok,
  FaTelegramPlane,
  FaLinkedinIn,
  FaDiscord,
  FaGlobe,
  FaStar,
  FaCircle,
} from "react-icons/fa";

const icons = [
  { name: "Instagram", icon: <FaInstagram size={28} /> },
  { name: "Facebook", icon: <FaFacebookF size={28} /> },
  { name: "YouTube", icon: <FaYoutube size={28} /> },
  { name: "Twitter", icon: <FaTwitter size={28} /> },
  { name: "Spotify", icon: <FaSpotify size={28} /> },
  { name: "TikTok", icon: <FaTiktok size={28} /> },
  { name: "Telegram", icon: <FaTelegramPlane size={28} /> },
  { name: "LinkedIn", icon: <FaLinkedinIn size={28} /> },
  { name: "Discord", icon: <FaDiscord size={28} /> },
  { name: "Website", icon: <FaGlobe size={28} /> },
  { name: "Explore", icon: <FaStar size={28} /> },
  { name: "Network", icon: <FaCircle size={28} /> },
];

export default function CategoryFilter({ selectedCategory, onCategorySelect }) {
  return (
    <div className="flex items-center justify-center px-2">
      <div
        className="
          grid 
          grid-cols-4 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-6 
          xl:grid-cols-6 
          2xl:grid-cols-6 
          gap-3 
          w-full 
          max-w-6xl 
          py-6
        "
      >
        {icons.map((item, i) => {
          const isSelected = selectedCategory === item.name;
          return (
            <div
              key={i}
              onClick={() => onCategorySelect(item.name)}
              className={`
                bg-[#151517]
                border ${isSelected ? "border-yellow-500" : "border-yellow-500/20"}
                flex flex-col items-center justify-center 
                rounded-2xl 
                py-3 
                transition-all duration-300 
                hover:scale-105 
                hover:shadow-[0_0_18px_rgba(234,179,8,0.25)]
                cursor-pointer
              `}
            >
              <span className={`mb-1 ${isSelected ? "text-yellow-300" : "text-yellow-400"}`}>
                {item.icon}
              </span>
              <span
                className={`text-sm mt-2 font-medium hidden md:block text-center ${
                  isSelected ? "text-yellow-300" : "text-gray-300"
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
