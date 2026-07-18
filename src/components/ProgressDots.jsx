import { useEffect, useState } from "react";

/**
 * Bouton unique flottant, fixé en bas à droite de l'écran.
 * - Par défaut : flèche vers le bas, invite à continuer le scroll vers la section suivante.
 * - Une fois arrivé à la dernière section : flèche vers le haut, ramène en haut de la page.
 *
 * Props:
 * - sections: [{ id: string, label: string, ref: React.RefObject }]
 * - visible: bool — n'affiche le bouton que si true (ex: après ouverture de l'enveloppe)
 */
export default function ProgressDots({ sections, visible }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    if (!visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choisit la section la plus visible à l'écran parmi celles qui intersectent
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;

        const mostVisible = visibleEntries.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best
        );

        const match = sections.find((s) => s.ref.current === mostVisible.target);
        if (match) setActiveId(match.id);
      },
      {
        // Fenêtre d'observation centrée sur le viewport pour un résultat plus stable
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, [visible, sections]);

  if (!visible) return null;

  const currentIndex = sections.findIndex((s) => s.id === activeId);
  const isAtBottom = currentIndex === sections.length - 1;

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll naturel d'environ une hauteur d'écran, plutôt qu'un saut direct à la section
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isAtBottom ? "Revenir en haut de la page" : "Défiler vers la section suivante"}
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
      {/* Halo discret */}
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