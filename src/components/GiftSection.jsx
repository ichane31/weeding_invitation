import { useRef, useState } from "react";
import Butterflies from "./Butterflies";

export default function GiftSection() {
  const [giftHovered, setGiftHovered] = useState(false);

  const GIFT_LINK = "https://ton-lien-cadeau.com";

  // 2. Texte dua'a → traduire en français si besoin
  const DUA_PARAGRAPHS = [
    "Ya Allah, benis ce mariage et accorde Ta baraka et Ta miséricorde à ce couple.",
    "Accorde-leur bonheur, compréhension mutuelle, et un amour durable.",
    "Bénis-les avec de vertueux enfants, et remplis leur foyer de paix, d'amour et de baraka.",
    "Ameen ya Rabbal Alamin",
  ];

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center py-3 px-4"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      {/* ── Papillons ── */}
      <Butterflies
        count={5}
        size={{ min: 20, max: 32 }}
        speed={{ min: 16, max: 26 }}
        opacity={0.85}
        zone="full"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      <h2 className="text-4xl md:text-5xl lg:text-6xl text-olive-dark font-script">
        Gift for the newlyweds!
      </h2>

      {/* ── Guirlande de roses haut ── */}
      <div className="relative w-full max-w-xl mb-2">
        <img
          src="/images/rose1.png"
          alt=""
          className="pointer-events-none rotate-[120deg] absolute -top-40 -left-16 w-[40%] z-10"
        />
        <img
          src="/images/rose1.png"
          alt=""
          className="pointer-events-none scale-x-[-1] rotate-[-40deg] absolute -top-2 -right-20 w-[40%] z-10"
        />

        {/* ── Titre ── */}
        <div className="relative text-center">
          <a
            href={GIFT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col items-center mt-8 mb-2 group"
            onMouseEnter={() => setGiftHovered(true)}
            onMouseLeave={() => setGiftHovered(false)}
          >
            <img
              src="/images/carte_olive.png"
              alt=""
              className="pointer-events-none aspect-[1.45] w-[75%]"
            />
          </a>
          <p
            className="mt-3 text-3xl md:text-4xl lg:text-5xl text-olive font-script transition-opacity duration-300"
            style={{
              opacity: giftHovered ? 0.7 : 1,
            }}
          >
            click here
          </p>
        </div>
      </div>

      {/* ── Section enveloppe + lettre ── */}
      <div className="relative w-full max-w-lg mt-4 h-[500px]">
        {/* Roses gauche bas */}
        <img
          src="/images/rose3.png"
          alt=""
          className="pointer-events-none absolute -left-20 -top-14 w-[50%] z-10"
          style={{ transform: "rotate(10deg)" }}
        />
        {/* Roses droite bas */}
        <img
          src="/images/rose2.png"
          alt=""
          className="pointer-events-none absolute rotate-[-7deg] right-6 top-28 w-[60%] z-20 "
        />

        {/* Enveloppe ouverte */}
        <div className="relative flex justify-center">
          <img
            src="/images/envelop_close2.png"
            alt="Enveloppe"
            className="w-[80%] rotate-[5deg]"
            style={{
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))",
            }}
          />
        </div>

        {/* Lettre / carte dua'a */}
        <div
          className="absolute top-40 right-64 bg-cream-light w-[80%] rotate-[-4deg] z-10 rounded-3xl px-6 py-4"
          style={{
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)",
            border: "0.5px solid rgba(180,160,120,0.3)",
          }}
        >

          <div className="flex items-center gap-2 mb-3">
            <p
              className="text-xl md:text-2xl text-olive-dark text-center w-full"
              style={{
                direction: "rtl",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          <div className="space-y-3">
            {DUA_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className={`${i === DUA_PARAGRAPHS.length - 1 ? '' : ''} font-title text-sm text-olive-dark font-medium leading-relaxed text-center`}
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
