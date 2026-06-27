import { useState } from "react";
import Butterflies from "./Butterflies";

export default function GiftSection() {
  const [giftHovered, setGiftHovered] = useState(false);

  const GIFT_LINK = "https://ton-lien-cadeau.com";

  const DUA_PARAGRAPHS = [
    "Ya Allah, benis ce mariage et accorde Ta baraka et Ta miséricorde à ce couple.",
    "Accorde-leur bonheur, compréhension mutuelle, et un amour durable.",
    "Bénis-les avec de vertueux enfants, et remplis leur foyer de paix, d'amour et de baraka.",
    "Ameen ya Rabbal Alamin",
  ];

  return (
    <section
      className="relative w-full overflow-visible flex flex-col items-center py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 mb-10 sm:mb-3 md:mb-0"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      {/* Papillons */}
      <Butterflies
        count={5}
        size={{ min: 20, max: 32 }}
        speed={{ min: 16, max: 26 }}
        opacity={0.85}
        zone="full"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Titre */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-olive-dark font-script text-center mb-2 sm:mb-4 relative z-10">
        Gift for the newlyweds!
      </h2>

      {/* Section Carte cadeau */}
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center mb-4 sm:mb-6 md:mb-8">
        {/* Roses décoratives - version responsive */}
        <img
          src="/images/rose1.png"
          alt=""
          className="pointer-events-none absolute -top-28 sm:-top-40 md:-top-44 left-0 sm:-left-2 md:-left-16 w-[30%] sm:w-[35%] md:w-[40%] z-10 rotate-[120deg]"
          loading="lazy"
        />
        <img
          src="/images/rose1.png"
          alt=""
          className="pointer-events-none absolute -top-4 sm:-top-2 right-5 sm:-right-2 md:-right-16 w-[30%] sm:w-[35%] md:w-[40%] z-10 scale-x-[-1] rotate-[-40deg]"
          loading="lazy"
        />

        {/* Carte cadeau */}
        <div className="relative text-center mt-4 sm:mt-6 md:mt-8">
          <a
            href={GIFT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col items-center group"
            onMouseEnter={() => setGiftHovered(true)}
            onMouseLeave={() => setGiftHovered(false)}
          >
            <img
              src="/images/carte_olive.png"
              alt="Carte cadeau"
              className="pointer-events-none aspect-[1.45] w-[65%] sm:w-[70%] md:w-[75%] lg:w-[80%] transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <p
              className="absolute bottom-[-22%] sm:bottom-[-18%] md:bottom-[-15%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-olive font-script transition-all duration-300"
              style={{
                opacity: giftHovered ? 0.6 : 1,
                transform: giftHovered ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              click here
            </p>
          </a>
        </div>
      </div>

      {/* Section enveloppe + lettre */}
      <div className="relative w-full max-w-2xl mx-auto mt-6 sm:mt-8 md:mt-10">
        {/* Roses décoratives */}
        <img
          src="/images/rose3.png"
          alt=""
          className="pointer-events-none absolute -left-12 sm:-left-16 md:-left-20 -top-8 sm:-top-10 md:-top-14 lg:-top-8 w-[35%] sm:w-[40%] md:w-[45%] lg:w-[48%] z-10"
          style={{ transform: "rotate(10deg)" }}
          loading="lazy"
        />
        <img
          src="/images/rose2.png"
          alt=""
          className="pointer-events-none absolute rotate-[-7deg] right-2 sm:right-4 md:right-6 top-16 sm:top-20 md:top-28 lg:top-32 w-[40%] sm:w-[45%] md:w-[50%] lg:w-[56%] z-20"
          loading="lazy"
        />

        {/* Enveloppe */}
        <div className="relative flex justify-center items-center">
          <img
            src="/images/envelop_close2.png"
            alt="Enveloppe"
            className="w-[68%] sm:w-[70%] md:w-[72%] lg:w-[75%] rotate-[3deg] sm:rotate-[4deg] md:rotate-[5deg]"
            style={{
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))",
            }}
            loading="lazy"
          />
        </div>

        {/* Lettre / Dua'a - repositionnée pour mobile */}
        <div
          className="absolute top-[30%] sm:top-[35%] md:top-[42%] lg:top-[50%] left-[10%] sm:left-[8%] md:left-[-6%] lg:left-[-20%] bg-cream-light w-[65%] sm:w-[60%] md:w-[70%] lg:w-[75%] rotate-[-4deg] sm:rotate-[-3deg] md:rotate-[-4deg] z-10 rounded-2xl sm:rounded-3xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5"
          style={{
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)",
            border: "0.5px solid rgba(180,160,120,0.3)",
          }}
        >
          {/* Bismillah */}
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-olive-dark text-center w-full"
              style={{
                direction: "rtl",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          {/* Paragraphes Dua'a */}
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
            {DUA_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className={`font-title text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-olive-dark font-medium leading-relaxed text-center ${
                  i === DUA_PARAGRAPHS.length - 1 ? 'font-semibold' : ''
                }`}
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