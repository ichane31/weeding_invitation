import Butterflies from "./Butterflies";
import { useState } from "react";

export default function GiftSection() {

  const [envelopeLoaded, setEnvelopeLoaded] = useState(false);

  const DUA_PARAGRAPHS = [
  "Ya Allah, bénis ce mariage et accorde Ta baraka et Ta miséricorde à ce couple.",
  "Accorde-leur bonheur, compréhension mutuelle et un amour durable, et bénis-les avec de vertueux enfants.",
  "Ameen ya Rabbal Alamin",
];

  return (
    <section
      id="gift"
      className="hero-section relative w-full overflow-visible flex flex-col items-center"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
        padding: "clamp(24px, 6vw, 56px) clamp(12px, 4vw, 32px)",
      }}
    >
      <Butterflies
        count={5}
        size={{ min: 20, max: 32 }}
        speed={{ min: 16, max: 26 }}
        opacity={0.85}
        zone="full"
        loading="lazy"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Titre */}
      {/* <h2
        className="text-olive-dark font-script text-center relative z-10"
        style={{
          fontSize: "clamp(32px, 7vw, 72px)",
          marginBottom: "clamp(8px, 2vw, 20px)",
        }}
      >
        Cadeau pour les mariés !
      </h2> */}

      {/* ── Carte cadeau ── */}
      {/* <div
        className="relative w-full mx-auto flex flex-col items-center"
        style={{
          maxWidth: "clamp(280px, 85vw, 640px)",
          marginBottom: "clamp(16px, 4vw, 40px)",
        }}
      >
        <img
          src="/images/rose1.png"
          alt=""
          className="pointer-events-none absolute z-10"
          style={{
            width: "clamp(80px, 32%, 200px)",
            top: "clamp(-80px, -28%, -40px)",
            left: 0,
            transform: "rotate(120deg)",
          }}
          loading="lazy"
        />

        <img
          src="/images/rose1.png"
          alt=""
          className="pointer-events-none absolute z-10"
          style={{
            width: "clamp(80px, 32%, 200px)",
            top: "clamp(-16px, -4%, -4px)",
            right: "clamp(8px, 2%, 16px)",
            transform: "scaleX(-1) rotate(40deg)",
          }}
          loading="lazy"
        />

        <a
          href={GIFT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-col items-center group"
          style={{ marginTop: "clamp(16px, 4vw, 36px)" }}
          onMouseEnter={() => setGiftHovered(true)}
          onMouseLeave={() => setGiftHovered(false)}
        >
          <img
            src="/images/carte_olive.png"
            alt="Carte cadeau"
            className="pointer-events-none transition-transform duration-300 group-hover:scale-101"
            style={{ width: "clamp(160px, 68%, 380px)", aspectRatio: "1.45" }}
            loading="lazy"
          />
          <p
            className="absolute text-olive font-script transition-all duration-300"
            style={{
              bottom: "clamp(-50px, -20%, -24px)",
              fontSize: "clamp(18px, 4.5vw, 40px)",
              opacity: giftHovered ? 0.6 : 1,
              transform: giftHovered ? "scale(0.95)" : "scale(1)",
            }}
          >
            Cliquer ici
          </p>
        </a>
      </div> */}

      {/* ── Enveloppe + lettre ── */}
      <div
        className="relative w-full lg:mx-auto -mr-8"
        style={{
          maxWidth: "clamp(280px, 85vw, 640px)",
          marginTop: "clamp(32px, 8vw, 64px)",
        }}
      >
        {/* Rose gauche enveloppe */}
        <img
          src="/images/rose3.png"
          alt=""
          className="pointer-events-none absolute z-10"
          style={{
            width: "clamp(110px, 38%, 220px)",
            left: "clamp(-40px, -12%, -20px)",
            top: "clamp(-30px, -10%, -16px)",
            transform: "rotate(10deg)",
          }}
          loading="lazy"
        /> 
        {/* Rose droite enveloppe */}
        <img
          src="/images/rose2.png"
          alt=""
          className="pointer-events-none absolute z-20"
          style={{
            width: "clamp(130px, 44%, 260px)",
            right: "clamp(30px, 12%, 80px)",
            top: "clamp(70px, 27%, 130px)",
            transform: "rotate(-7deg)",
          }}
          loading="lazy"
        /> 

        {/* Enveloppe */}
        <div className="relative flex justify-center items-center">
          {/* Placeholder pour l'enveloppe */}
          <div
            className="absolute z-0 rounded-lg"
            style={{
              backgroundColor: "#fdfbf7", // Couleur de fond du placeholder
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))", // Ombre gérée par le placeholder
              maskImage: "url(/images/envelop_close2.png)",
              maskSize: "100% 100%", // Pour remplir l'élément
              maskRepeat: "no-repeat",
              opacity: envelopeLoaded ? 0 : 1,
              transition: "opacity 300ms ease-in-out",
              // Assurez-vous que le placeholder correspond à la taille et à la transformation de l'image
              width: "clamp(190px, 80%, 420px)",
              transform: "rotate(4deg)",
            }}
          />
          <img
            src="/images/envelop_close2.png"
            alt="Enveloppe"
            className="relative"
            style={{
              width: "clamp(190px, 80%, 420px)",
              transform: "rotate(4deg)",
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.0))", // Ombre retirée de l'image, gérée par le placeholder
            }}
            loading="lazy"
            onLoad={() => setEnvelopeLoaded(true)}
          />
        </div>

        {/* Lettre / Dua'a */}
        <div
          className="absolute z-10 bg-cream-light rounded-2xl"
          style={{
            width: "clamp(200px, 62%, 420px)",
            top: "clamp(28%, 38%, 46%)",
            left: "clamp(-20px, -5%, 30px)",
            transform: "rotate(-4deg)",
            padding: "clamp(10px, 3vw, 24px) clamp(12px, 3.5vw, 28px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)",
            border: "0.5px solid rgba(180,160,120,0.3)",
          }}
        >
          {/* Bismillah */}
          <p
            className="text-olive-dark text-center w-full"
            style={{
              direction: "rtl",
              fontSize: "clamp(14px, 3.5vw, 28px)",
              marginBottom: "clamp(3px, 1vw, 6px)",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Paragraphes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px, 1vw, 6px)" }}>
            {DUA_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className={`font-title text-olive-dark leading-relaxed text-center ${
                  i === DUA_PARAGRAPHS.length - 1 ? "font-semibold" : "font-medium"
                }`}
                style={{ fontSize: "clamp(9px, 1.8vw, 14px)", margin: 0 }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}