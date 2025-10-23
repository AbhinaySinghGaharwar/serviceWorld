"use client";

import Image from "next/image";

export default function JoinButtons() {
  const buttons = [
    {
      href: "https://t.me/instantsmmboost",
      img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      label: "Telegram",
      className: "telegram-button",
    },
    {
      href: "https://whatsapp.com/channel/0029Vb5qAIXL7UVdD5Fyoi2F",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      label: "WhatsApp",
      className: "whatsapp-button",
    },
  ];

  return (
    <div className="button-container d-flex gap-3">
      {buttons.map((btn, index) => (
        <a
          key={index}
          href={btn.href}
          target="_blank"
          className={`custom-button ${btn.className} d-flex align-items-center gap-2`}
        >
          <Image src={btn.img} alt={btn.label} width={24} height={24} />
          Join {btn.label}
        </a>
      ))}
    </div>
  );
}
