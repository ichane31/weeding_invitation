import { useEffect, useState } from "react";

export default function ProgressDots({ sections, visible }) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;

        const mostVisible = visibleEntries.reduce(
          (best, entry) =>
            entry.intersectionRatio > best.intersectionRatio ? entry : best,
          visibleEntries[0],
        );

                const hasMatch = sections.some(
          (s) => s.ref.current === mostVisible.target,
        );
        if (hasMatch) return;

      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, [visible, sections]);

  // Détection directe du "vraiment tout en bas", indépendante de l'observer,
  // pour couvrir le cas où la dernière section est trop courte pour occuper
  // la zone centrale du viewport.
  useEffect(() => {
    if (!visible) return;

    const checkBottom = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      // marge de tolérance de 8px pour les arrondis de sous-pixels
      const atBottom = scrollY + viewportHeight >= fullHeight - 8;
      setIsAtBottom(atBottom);
    };

    checkBottom();
    window.addEventListener("scroll", checkBottom, { passive: true });
    window.addEventListener("resize", checkBottom);
    return () => {
      window.removeEventListener("scroll", checkBottom);
      window.removeEventListener("resize", checkBottom);
    };
  }, [visible]);

  if (!visible) return null;

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isAtBottom
          ? "Revenir en haut de la page"
          : "Défiler vers la section suivante"
      }
      className="fixed z-50 flex items-center justify-center rounded-full shadow-md focus:outline-none group"
      style={{
        right: "clamp(6px, 3vw, 20px)",
        bottom: "clamp(6px, 3vw, 20px)",
        width: "clamp(36px, 8vw, 52px)",
        height: "clamp(36px, 8vw, 52px)",
        backgroundColor: "#FBF8F1",
        border: "1px solid rgba(138,109,59,0.35)",
      }}
    >
      <span
        className="absolute rounded-full border border-burgundy/40"
        style={{
          inset: "-4px",
          animation: "scrollBtnPulse 2.2s ease-out infinite",
        }}
      />
      <span
        style={{
          display: "inline-flex",
          transform: isAtBottom ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 400ms ease",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7A2530"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "scrollBtnBounce 1.6s ease-in-out infinite" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </span>
    </button>
  );
}
