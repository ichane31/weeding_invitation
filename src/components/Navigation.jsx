export default function Navigation({ activeTab, setActiveTab, resetEnvelope }) {
  const scrollTo = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-cream-dark shadow-sm"
      style={{ padding: "clamp(10px, 2.5vw, 16px) clamp(16px, 5vw, 32px)" }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Brand logo */}
        <button
          onClick={resetEnvelope}
          className="font-title text-burgundy font-semibold tracking-wide hover:opacity-80 transition-opacity duration-300 shrink-0"
          style={{ fontSize: "clamp(13px, 2.5vw, 20px)" }}
        >
          Ousmanou &amp; Mariam
        </button>

        {/* Navigation Links */}
        <div
          className="flex items-center font-title tracking-wider uppercase text-olive-dark"
          style={{ gap: "clamp(12px, 4vw, 32px)" }}
        >
          <button
            onClick={() => scrollTo("invitation")}
            className={`relative py-1 transition-colors duration-300 hover:text-burgundy ${
              activeTab === "invitation" ? "text-burgundy font-medium" : ""
            }`}
            style={{ fontSize: "clamp(9px, 1.8vw, 14px)" }}
          >
            <span>Invitation</span>
            {activeTab === "invitation" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-burgundy rounded-full animate-fade-in-up" />
            )}
          </button>

          <button
            onClick={() => scrollTo("gift")}
            className={`relative py-1 transition-colors duration-300 hover:text-burgundy ${
              activeTab === "gift" ? "text-burgundy font-medium" : ""
            }`}
            style={{ fontSize: "clamp(9px, 1.8vw, 14px)" }}
          >
            <span>Gift</span>
            {activeTab === "gift" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-burgundy rounded-full animate-fade-in-up" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
