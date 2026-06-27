import { useEffect, useRef } from "react";

const PARAGRAPHS = [
  "Peut-être étions-nous écrits l'un dans l'histoire de l'autre bien avant de savoir que l'autre existait.",
  "Deux âmes qui se croisaient silencieusement, comme des étrangers, sans jamais savoir qu'un jour l'autre deviendrait maison.",
  "Ce qui commença par de simples moments, des cercles partagés, du temps qui passe, devint lentement quelque chose de plus profond, de plus doux, de plus vrai.",
  "Et quelque part, à travers les rires et les jours ordinaires, l'amour arriva si naturellement que nous remarquâmes à peine sa première lueur.",
  "La vie nous apprit aussi la tendresse — combien les cœurs peuvent être fragiles. Certains que nous aimions ont quitté ce monde, pourtant leur présence reste doucement parmi nous.",
  "C'est peut-être pour cela que nous nous tenons différemment l'un à l'autre — avec patience, avec compréhension, avec une empathie silencieuse.",
  "À travers le deuil et le réconfort, à travers chaque sommet et chaque creux, nous avons appris que l'amour ne se trouve pas seulement — il se construit à deux.",
  "D'étrangers à refuge, du hasard à la certitude.",
  "Et ceci n'est que le début de toutes les vies que nous vivrons encore ensemble.",
];

// Papillons adaptés pour être responsifs
const BUTTERFLIES = [
  // top — gros papillon symétrique
  { id: 1, img: "/images/butterfly.png", type: "top", size: { xs: 28, sm: 35, md: 40, lg: 44 }, startX: 8, startY: 12, ampX: 22, ampY: 18, periodX: 9, periodY: 6, driftUp: 0.6, baseRot: 0, delay: 0 },
  { id: 2, img: "/images/butterfly.png", type: "top", size: { xs: 20, sm: 25, md: 28, lg: 30 }, startX: 88, startY: 70, ampX: 14, ampY: 12, periodX: 7, periodY: 5, driftUp: 0.4, baseRot: 0, delay: 1.2 },

  // side — profil incliné vers la droite
  { id: 3, img: "/images/butterfly1.png", type: "side", size: { xs: 25, sm: 30, md: 35, lg: 38 }, startX: 72, startY: 20, ampX: 10, ampY: 14, periodX: 8, periodY: 5, driftUp: 0.3, baseRot: -8, delay: 0.5 },
  { id: 4, img: "/images/butterfly1.png", type: "side", size: { xs: 18, sm: 22, md: 25, lg: 28 }, startX: 18, startY: 78, ampX: 8, ampY: 10, periodX: 6, periodY: 4, driftUp: 0.5, baseRot: -12, delay: 2.4 },

  // side — profil incliné vers la gauche
  { id: 5, img: "/images/butterfly2.png", type: "side", size: { xs: 22, sm: 28, md: 32, lg: 34 }, startX: 45, startY: 35, ampX: 12, ampY: 10, periodX: 7, periodY: 4.5, driftUp: 0.4, baseRot: 8, delay: 3.1, flip: true },
  { id: 6, img: "/images/butterfly2.png", type: "side", size: { xs: 16, sm: 20, md: 24, lg: 26 }, startX: 5, startY: 50, ampX: 9, ampY: 12, periodX: 6.5, periodY: 5, driftUp: 0.45, baseRot: 10, delay: 4.2, flip: true },

  { id: 7, img: "/images/butterfly.png", type: "top", size: { xs: 16, sm: 20, md: 22, lg: 24 }, startX: 92, startY: 45, ampX: 10, ampY: 8, periodX: 5, periodY: 3.5, driftUp: 0.55, baseRot: 0, delay: 5 },
];

const WING_INTERVAL = 0.18;

export default function OurStory() {
  const refs = useRef([]);

  // Fonction pour obtenir la taille responsive
  const getSize = (sizeObj, windowWidth) => {
    if (windowWidth < 640) return sizeObj.xs;
    if (windowWidth < 768) return sizeObj.sm;
    if (windowWidth < 1024) return sizeObj.md;
    return sizeObj.lg;
  };

  useEffect(() => {
    const rafs = [];
    const t0 = performance.now();

    const tick = (now) => {
      const t = (now - t0) / 1000;

      BUTTERFLIES.forEach((b, i) => {
        const el = refs.current[i];
        if (!el) return;
        const localT = Math.max(0, t - b.delay);

        // Déplacement borné
        const loopPeriod = 30;
        const tt = localT % loopPeriod;

        const x = b.startX + Math.sin((tt / b.periodX) * Math.PI * 2) * b.ampX;
        const drift = (tt * b.driftUp) - (loopPeriod * b.driftUp) / 2;
        const y = b.startY + Math.cos((tt / b.periodY) * Math.PI * 2) * b.ampY - drift * 0.6;

        el.style.left = `${x}%`;
        el.style.top = `${y}%`;

        // Animation des ailes
        if (b.type === "top") {
          const wingOpen = Math.floor(localT / WING_INTERVAL) % 2 === 0;
          const scaleX = wingOpen ? 1 : 0.4;
          el.style.transform = `scaleX(${scaleX})`;
        } else {
          const rot = b.baseRot + Math.sin(localT * 6) * 6;
          const scaleY = 1 - Math.abs(Math.sin(localT * 9)) * 0.15;
          const flip = b.flip ? -1 : 1;
          el.style.transform = `scaleX(${flip}) rotate(${rot * flip}deg) scaleY(${scaleY})`;
        }
      });

      rafs[0] = requestAnimationFrame(tick);
    };

    rafs[0] = requestAnimationFrame(tick);
    return () => rafs.forEach((id) => cancelAnimationFrame(id));
  }, []);

  // Effet pour mettre à jour les tailles des papillons
  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      BUTTERFLIES.forEach((b, i) => {
        const el = refs.current[i];
        if (!el) return;
        const size = getSize(b.size, width);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      });
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center justify-center mx-auto py-12 sm:py-16 md:py-20 px-3 sm:px-4 select-none relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/bg_4.jpg)" }}
    >
      {/* Papillons */}
      {BUTTERFLIES.map((b, i) => (
        <div
          key={b.id}
          ref={(el) => (refs.current[i] = el)}
          className="absolute pointer-events-none"
          style={{
            width: b.size.xs,
            height: b.size.xs,
            left: `${b.startX}%`,
            top: `${b.startY}%`,
            zIndex: 10,
            willChange: "transform, left, top",
            transition: "transform 120ms ease-in-out",
          }}
          aria-hidden="true"
        >
          <img
            src={b.img}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            draggable={false}
            loading="lazy"
          />
        </div>
      ))}

      {/* Titre */}
      <div className="relative z-20 mb-6 sm:mb-8 md:mb-10 text-center w-full">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-medium text-olive-dark font-script px-3"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          Notre Histoire d'Amour
        </h2>
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3">
          <div className="h-px w-10 sm:w-14 md:w-16 bg-olive" />
          <span className="text-olive text-base sm:text-lg md:text-xl">✦</span>
          <div className="h-px w-10 sm:w-14 md:w-16 bg-olive" />
        </div>
      </div>

      {/* Texte */}
      <div className="relative z-20 max-w-[90%] sm:max-w-xl px-3 sm:px-4 w-full mx-auto space-y-3 sm:space-y-4 md:space-y-5 text-center">
        {PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed md:leading-relaxed italic font-title text-olive-dark px-1"
          >
            {p}
          </p>
        ))}
      </div>

      {/* Décoration de fond */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
    </div>
  );
}