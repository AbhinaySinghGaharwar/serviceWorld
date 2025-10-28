"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

// Utility component to represent the "card_v2" style
const CardV2 = ({ children }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-5">
    {children}
  </div>
);

export default function DashboardLayout() {
  

 
const [balance, setBalance] = useState("₹ 0");
  const [active, setActive] = useState(null);

    // Fetch balance
  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch("/api/services/getbalance");
        const data = await res.json();
        if (data.success) setBalance(data.balance);
      } catch (err) {
        console.error("Balance fetch error:", err);
      }
    }

    fetchBalance();
  }, []);

  // Statistics Data
  const stats = [
    { icon: "https://cdn.mypanel.link/hmz1fi/bcpg233dh40fsdoc.png", label: "Username", value: "58" },
    { icon: "https://cdn.mypanel.link/hmz1fi/raj356puppqixik9.png", label: "My Balance", value: balance },
    { icon: "https://cdn.mypanel.link/hmz1fi/mp50mc1fhx7sm8o1.png", label: "Panel Orders", value: "6689" },
    { icon: "https://cdn.mypanel.link/hmz1fi/aw21tyz9g0kxlk1u.png", label: "Spent Balance", value: "₹ 0" },
  ];

 // Categories
const categories = [
  { icon: <FaInstagram size={32} />, label: "Instagram", key: "instagram" },
  { icon: <FaFacebook size={32} />, label: "Facebook", key: "facebook" },
  { icon: <FaYoutube size={32} />, label: "Youtube", key: "youtube" },
  { icon: <FaTwitter size={32} />, label: "Twitter", key: "twitter" },
  { icon: <FaSpotify size={32} />, label: "Spotify", key: "spotify" },
  { icon: <FaTiktok size={32} />, label: "Tiktok", key: "tiktok" },
  { icon: <FaTelegram size={32} />, label: "Telegram", key: "telegram" },
  { icon: <FaLinkedin size={32} />, label: "Linkedin", key: "linkedin" },
  { icon: <FaDiscord size={32} />, label: "Discord", key: "discord" },
  { icon: <FaGlobe size={32} />, label: "Website Traffic", key: "traffic" },
  { icon: <FaStar size={32} />, label: "Others", key: "other" },
  { icon: <FaInfinity size={32} />, label: "Everythings", key: "everything" },
];


  const handleFilter = (key) => {
    setActive(key);
    // filterStarted(key) equivalent
  };

  const joinButtons = [
    {
      href: "https://t.me/instantsmmboost",
      img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      label: "Telegram",
      color: "bg-[#0088cc] hover:bg-[#007ab8]",
    },
    {
      href: "https://whatsapp.com/channel/0029Vb5qAIXL7UVdD5Fyoi2F",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      label: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#1ebe5b]",
    },
  ];

  return (
    // Mimicking the original "content" div with a container-fluid effect
    <div className="content w-full bg-gray-100 py-6">
      <div className="container-fluid mx-auto px-3">
        
        {/* ============ USER STATS (user_statistic_wraper) ============ */}
        <div className="mb-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
            {stats.map((item, index) => (
                // Mimicking the statistic__item style: white background, rounded, minimal shadow
                <div
                key={index}
                className="statistic__item flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3 sm:p-4 transition-all hover:shadow-md"
                >
                <div className="icon flex-shrink-0">
                    {/* Using a fixed size and removing the extra colored background to match the raw HTML look */}
                    <Image src={item.icon} alt={item.label} width={28} height={28} className="object-contain" />
                </div>
                {/* Mimicking the user__data typography */}
                <div className="user__data overflow-hidden">
                    <span className="text-xs text-gray-600 block">{item.label}</span>
                    <h4 className="text-base font-bold text-gray-900 truncate">{item.value}</h4>
                </div>
                </div>
            ))}
            </div>
        </div>
<div id="category_filter" className="mb-5">
  <div className="category_filter_wrap">
    <CardV2>
      <div className="filter_btn_wrap flex flex-wrap justify-start sm:justify-center gap-5 sm:gap-2 py-2">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleFilter(cat.key)}
            data-change-cat={cat.key}
            className={`flex-shrink-0 flex items-center justify-center gap-3 
              text-[18px] capitalize text-white 
              px-[10px] py-[10px] rounded-md text-center cursor-pointer
              border-2 border-transparent bg-gradient-to-r from-indigo-500 to-purple-600
              transition-all duration-300 
              hover:from-purple-600 hover:to-indigo-500 hover:shadow-lg
              ${
                active === cat.key
                  ? "from-pink-500 to-orange-500 text-white shadow-md ring-2 ring-pink-300 font-semibold"
                  : ""
              }`}
          >
            {/* 👇 Bigger icon on mobile */}
            <span className="text-4xl sm:text-lg flex-shrink-0">{cat.icon}</span>

            {/* 👇 Label hidden on mobile */}
            <span className="filter_txt hidden sm:inline">{cat.label}</span>
          </button>
        ))}
      </div>
    </CardV2>
  </div>
</div>



        {/* ============ JOIN BUTTONS (button-container) ============ */}
        {/* Replicating the custom CSS approach for the buttons */}
        <div className="button-container flex flex-wrap justify-center my-5 gap-3">
            {joinButtons.map((btn, index) => (
            <a
                key={index}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                // Custom-button + specific color styles
                className={`custom-button inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg transition-all hover:opacity-90 ${btn.color}`}
            >
                {/* Image tag with proper size */}
                <Image src={btn.img} alt={btn.label} width={24} height={24} className="flex-shrink-0" />
                <span>Join {btn.label}</span>
            </a>
            ))}
        </div>
        
      </div>
    </div>
  );
}





