import { useState } from "react";
// import PetalsRain from "./PetalsRain";
import Butterflies from "./Butterflies";

export default function EnvelopeHero({ onOpen, startOpen = false }) {
  // Si on restaure une session déjà ouverte, on démarre directement
  // en phase "open" avec la carte déjà sortie (pas d'animation à rejouer).
  const [phase, setPhase] = useState(startOpen ? "open" : "closed"); // "closed" | "opening" | "open"
  const [pulled, setPulled] = useState(startOpen);
  const [cadreLoaded, setCadreLoaded] = useState(false);
  const [envelopeImageLoaded, setEnvelopeImageLoaded] = useState(false);

  const handleOpen = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setPulled(false);

    setTimeout(() => {
      setPhase("open");
      setTimeout(() => setPulled(true), 650);
      onOpen();
    }, 260);
  };

  const isOpen = phase === "open";
  const isOpening = phase === "opening";
  const envelopeSrc = isOpen ? "/images/envelop_open1.png" : "/images/envelop_close2.png";

  return (
    <div
      className="hero-section relative flex items-center justify-center h-[96vh] w-full"
      style={{
  backgroundImage: "url(/images/bg_primary.jpg)",
    // évite la répétition si l'image est trop petite
  minHeight: "96svh",
  padding: "clamp(48px, 10vw, 80px) 0",
}}
    >
      {/* {isOpen && <PetalsRain />} */}
      <Butterflies size={{ min: 20, max: 30 }} />

      <div
        className="relative flex flex-col items-center text-center w-full"
        style={{ maxWidth: "min(80vw, 380px)" }}
      >
        {/* Envelope container */}
        <div
          className="relative w-full  flex items-center justify-center select-none"
          style={{
            opacity: 1,
            transform: isOpening ? "scale(0.986)" : "scale(1)",
            transition: "transform 260ms ease",
          }}
        >
          {/* Fleur gauche */}
          <img
            src="/images/rose_primary.png"
            alt="Roses gauche"
            className="absolute pointer-events-none z-40 object-contain opacity-95"
            style={{
              width: "clamp(180px, 65%, 340px)",
              top: isOpen
                ? "clamp(-10px, 20%, 90px)"
                : "clamp(-80px, -30%, -40px)",
              left: "clamp(-90px, -28%, -60px)",
              transform: "rotate(-40deg)",
            }}
            loading="eager"
          />

          {/* Fleur droite */}
          <img
            src="/images/rose_secondary.png"
            alt="Roses droite"
            className="absolute pointer-events-none z-40 object-contain opacity-95"
            style={{
              width: "clamp(120px, 42%, 220px)",
              bottom: "clamp(-70px, -28%, -30px)",
              right: "clamp(-70px, -24%, -30px)",
              transform: "scaleX(-1)",
            }}
            loading="eager"
          />

          {/* Placeholder pour l'enveloppe */}
          <div
            className="absolute inset-0 z-[-1]"
            style={{
              backgroundColor: "#fdfbf7",
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.12))",
              maskImage: `url(${envelopeSrc})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              opacity: envelopeImageLoaded ? 0 : 1,
              transition: "opacity 300ms ease-in-out",
            }}
          />
          {/* Enveloppe fermée → ouverte */}
          <img
            key={envelopeSrc} // Réinitialise l'élément quand la source change
            src={envelopeSrc}
            alt="Enveloppe"
            className="w-full h-full object-contain relative z-0"
            loading="eager"
            onLoad={() => setEnvelopeImageLoaded(true)}
            style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.0))" }}
          />

          {/* Carte qui sort (état ouvert uniquement) */}
          {isOpen && (
            <div
              className="absolute h-[96%] sm:h-[98%] md:h-[100%] bottom-[7%] md:bottom-[12%] left-1/2 -translate-x-1/2 z-20 overflow-hidden"
              style={{ width: "78%" }}
            >
              <div
                className="will-change-transform"
                style={{
                  transition: "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
                  transform: pulled
                    ? "translate3d(0, 12%, 0)"
                    : "translate3d(0, 200%, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  backgroundColor: cadreLoaded ? "transparent" : "#f5f2eb",
                  borderRadius: "8px",
                }}
              >
                <img
                  src="/images/cadre_dentelle4.png"
                  alt="Contenu de l'enveloppe"
                  className="w-full h-auto object-contain relative"
                  style={{
                    marginBottom: "-30%",
                    opacity: pulled ? 0.9 : 0,
                    transition: "opacity 300ms ease",
                  }}
                  loading="eager"
                  onLoad={() => setCadreLoaded(true)}
                />
                <div
                  className="absolute top-0 left-0 right-0 w-full h-full flex flex-col items-center"
                  style={{
                    padding: "clamp(12%, 16%, 20%) clamp(6px, 4%, 14px) 0",
                    gap: "clamp(2px, 0.5vw, 6px)",
                    opacity: pulled ? 1 : 0,
                  }}
                >
                  <p
                    className="text-olive font-bogue font-title capitalize"
                    style={{
                      fontSize: "clamp(13px, 3.2vw, 22px)",
                      margin: 0,
                      paddingBottom: "0.2em",
                    }}
                  >
                    Le mariage de
                  </p>
                  <p
                    className="flex flex-col text-olive font-script leading-tight"
                    style={{ fontSize: "clamp(26px, 7vw, 44px)", margin: 0 }}
                  >
                    Ousmanou
                    <span
                      className="font-title -mt-1"
                      style={{ fontSize: "clamp(12px, 3vw, 16px)" }}
                    >
                      (Abba ASOS)
                    </span>
                  </p>
                  <p
                    className="text-olive font-roundhand"
                    style={{
                      fontSize: "clamp(18px, 4.5vw, 32px)",
                      marginBottom: "clamp(-10px, -1vw, -6px)",
                    }}
                  >
                    &amp;
                  </p>
                  <p
                    className="text-olive font-script leading-tight"
                    style={{ fontSize: "clamp(26px, 7vw, 44px)", margin: 0 }}
                  >
                    Maïrama
                  </p>
                  <p
                    className="text-olive font-bogue font-semibold"
                    style={{
                      fontSize: "clamp(14px, 3.5vw, 28px)",
                      margin: 0,
                      // paddingTop: "0.1em",
                    }}
                  >
                    <time dateTime="2026-08-21">21 . 08 . 2026</time>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rabat avant */}
          {isOpen && (
            <img
              src="/images/envelop-front.png"
              alt=""
              className="absolute left-0 right-0 bottom-0 w-full h-auto object-contain pointer-events-none select-none"
              style={{
                maxHeight: "100%",
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.08))",
                zIndex: 30,
                opacity: pulled ? 1 : 0,
                transition: "opacity 600ms ease",
              }}
              loading="eager"
            />
          )}

          {/* Sceau */}
          <button
            type='button'
            onClick={!isOpen ? handleOpen : undefined}
            className={`absolute rounded-full flex items-center justify-center z-40 group transition-transform duration-300 focus:outline-none ${
              !isOpen ? "cursor-pointer" : "cursor-default"
            }`}
            style={{
              top: isOpen ? "clamp(68%, 71%, 73%)" : "55%",
              left: "49%",
              transform: "translate(-50%, -50%)",
              width: "clamp(60px, 22%, 100px)",
              aspectRatio: "1",
            }}
          >
            {/* Léger halo doux (gardé discret en fond) */}
            <div
              className={`absolute inset-[-3px] rounded-full border-2 border-olive/50 animate-ping ${
                pulled || isOpening ? "opacity-0" : "opacity-60"
              } ${!isOpen ? "group-hover:animate-none" : ""}`}
              style={{ animationDuration: "1.5s" }}
            />
            <div
              className={`absolute inset-[-12px] rounded-full border border-olive/25 animate-ping ${
                pulled || isOpening ? "opacity-0" : "opacity-40"
              }`}
              style={{ animationDuration: "1.5s", animationDelay: "0.4s" }}
            />
            <img
              src="/images/sceau1.png"
              alt="Sceau de cire OM"
              className={`w-full h-full rounded-full object-cover ${
                !isOpen
                  ? "group-hover:scale-110 transition-transform duration-300"
                  : ""
              }`}
              loading="eager"
            />

            {/* Icône "cliquez ici" animée, superposée sur le sceau */}
            {!isOpen && (
              <div
                className="absolute pointer-events-none"
                style={{
                  right: "-6%",
                  bottom: "-6%",
                  width: "42%",
                  aspectRatio: "1",
                  opacity: isOpening ? 0 : 1,
                  transition: "opacity 200ms ease",
                }}
              >
                {/* Onde de clic (ripple) */}
                <span
                  className="absolute inset-0 rounded-full bg-olive-dark/25"
                  style={{ animation: "tapRipple 1.5s ease-out infinite" }}
                />
                {/* Icône main (image réelle), avec léger effet de "tap" */}
                <img
                  src="/images/tap_hand.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{
                    animation: "handTap 1.6s ease-in-out infinite",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
                  }}
                />
              </div>
            )}
          </button>
        </div>

        {/* CTA — visible seulement état fermé */}
        <div
          style={{
            transition: "opacity 400ms ease, transform 400ms ease",
            opacity: isOpen || isOpening ? 0 : 1,
            transform:
              isOpen || isOpening ? "translateY(10px)" : "translateY(0)",
            pointerEvents: isOpen ? "none" : "auto",
            marginTop: "clamp(12px, 3vw, 24px)",
          }}
        >
          <button
            type="button"
            onClick={handleOpen}
            className="font-bogue text-olive-dark tracking-[0.25em] outline-none uppercase hover:text-burgundy transition-all duration-300 flex flex-col items-center gap-1.5 group focus:outline-none"
            style={{ fontSize: "clamp(10px, 2vw, 14px)" }}
          >
            <span>Ouvrir l'invitation</span>
            <span className="h-[1px] w-8 bg-olive-dark group-hover:w-20 group-hover:bg-burgundy transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
