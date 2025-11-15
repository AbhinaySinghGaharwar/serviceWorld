const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`
      bg-white dark:bg-[#1A1F2B]
      border border-gray-300 dark:border-[#2B3143]
      rounded-2xl
      shadow-md hover:shadow-lg hover:shadow-[#4A6CF7]/30
      p-3 sm:p-4 lg:p-5
      hover:border-[#4A6CF7]
      transition-all duration-300
      ${className}
    `}
  >
    {children}
  </div>
);

export default function Announcements() {
  return (
    <>
      <section className="relative w-full">
        <h3
          className="
            text-base sm:text-lg font-semibold mb-3 sm:mb-4 
            text-[#4A6CF7]
            tracking-wide 
            drop-shadow-[0_0_10px_rgba(74,108,247,0.5)]
          "
        >
          Announcements
        </h3>

        <Card>
          <p className="text-[13px] sm:text-sm text-[#4B5563] dark:text-[#A0AEC3] leading-relaxed">
            🎉 Welcome to{" "}
            <span className="text-[#4A6CF7] font-semibold drop-shadow-[0_0_6px_rgba(74,108,247,0.6)]">
              InstantSMM
            </span>
            ! Get the best social media services at lightning speed.
            <br />
            💳 Add funds to your account and start placing orders instantly.
            <br />
            📩 Need help? Visit our{" "}
            <span className="text-[#16D1A5] font-semibold hover:underline cursor-pointer drop-shadow-[0_0_6px_rgba(22,209,165,0.6)]">
              Support
            </span>{" "}
            section.
          </p>
        </Card>
      </section>
    </>
  );
}
