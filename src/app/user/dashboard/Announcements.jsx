const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-[#151517] border border-yellow-500/30 rounded-2xl shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] p-3 sm:p-4 lg:p-5 hover:border-yellow-400 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

export default function Announcements() {
  return (
    <>
      {/* ================= ANNOUNCEMENTS ================= */}
      <section className="relative">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-yellow-400 tracking-wide drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] animate-pulse">
          Announcements
        </h3>
        <Card>
          <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
            🎉 Welcome to{" "}
            <span className="text-yellow-400 font-semibold drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]">
              InstantSMM
            </span>
            ! Get the best social media services at lightning speed.
            <br />
            💳 Add funds to your account and start placing orders instantly.
            <br />
            📩 Need help? Visit our{" "}
            <span className="text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] cursor-pointer hover:underline">
              Support
            </span>{" "}
            section.
          </p>
        </Card>
      </section>
    </>
  );
}
