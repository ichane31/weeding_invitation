import { useState } from "react";
// import PetalsRain from "./PetalsRain";
import Butterflies from "./Butterflies";

export default function EnvelopeHero({ onOpen }) {
  const [phase, setPhase] = useState("closed"); // "closed" | "opening" | "open"
  const [pulled, setPulled] = useState(false);

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

  return (
    <div
      className="relative flex items-center justify-center h-[96vh] w-full"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
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
            // aspectRatio: isOpening ? null : "1.55",
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

          {/* Enveloppe fermée → ouverte */}
          <img
            src={
              isOpen
                ? "/images/envelop_open1.png"
                : "/images/envelop_close2.png"
            }
            alt="Enveloppe"
            className="w-full h-full object-contain relative z-0"
            loading="eager"
            style={{
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.12))",
              position: "relative",
            }}
          />

          {/* Carte qui sort (état ouvert uniquement) */}
          {isOpen && (
            <div
              className="absolute h-[96%] sm:h-[98%] md:h-[100%] left-1/2 -translate-x-1/2 z-20 overflow-hidden"
              style={{ bottom: "6%", width: "78%" }}
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
                }}
              >
                <img
                  src="/images/cadre_dentelle2.png"
                  alt="Contenu de l'enveloppe"
                  className="w-full h-auto object-contain relative opacity-90"
                  style={{ marginBottom: "-30%", opacity: pulled ? 1 : 0 }}
                  loading="eager"
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
                    className="text-olive font-script leading-tight"
                    style={{ fontSize: "clamp(26px, 7vw, 44px)", margin: 0 }}
                  >
                    Ousmanou
                  </p>
                  <p
                    className="text-olive font-roundhand"
                    style={{
                      fontSize: "clamp(18px, 4.5vw, 32px)",
                      margin: "clamp(-16px, -1.2vw, -10px) 0",
                    }}
                  >
                    &amp;
                  </p>
                  <p
                    className="text-olive font-script leading-tight"
                    style={{ fontSize: "clamp(26px, 7vw, 44px)", margin: 0 }}
                  >
                    Mairama
                  </p>
                  <p
                    className="text-olive font-bogue font-semibold"
                    style={{
                      fontSize: "clamp(14px, 3.5vw, 28px)",
                      margin: 0,
                      paddingTop: "0.1em",
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
            onClick={!isOpen ? handleOpen : undefined}
            className={`absolute rounded-full flex items-center justify-center z-40 group transition-transform duration-300 focus:outline-none ${
              !isOpen ? "cursor-pointer" : "cursor-default"
            }`}
            style={{
              top: isOpen ? "clamp(68%, 71%, 73%)" : "55%",
              left: "49%",
              transform: "translate(-50%, -50%)",
              width: "clamp(80px, 22%, 130px)",
              aspectRatio: "1",
              // transition: "top 900ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div
              className={`absolute inset-[-3px] rounded-full border border-olive/30 animate-ping opacity-45 ${
                pulled || isOpening ? "opacity-0" : ""
              } ${!isOpen ? "group-hover:animate-none" : ""}`}
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
            onClick={handleOpen}
            className="font-bogue text-olive-dark tracking-[0.25em] uppercase hover:text-burgundy transition-all duration-300 flex flex-col items-center gap-1.5 group focus:outline-none"
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
