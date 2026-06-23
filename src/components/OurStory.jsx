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

// type: "top"  = vue de dessus (battement d'ailes via scaleX)
// type: "side" = vue de profil (oscillation rotation + flottement)
const BUTTERFLIES = [
  // top — gros papillon symétrique
  { id: 1, img: "/images/butterfly.png",  type: "top",  size: 44, startX: 8,  startY: 12, ampX: 22, ampY: 18, periodX: 9,  periodY: 6,  driftUp: 0.6, baseRot: 0,   delay: 0 },
  { id: 2, img: "/images/butterfly.png",  type: "top",  size: 30, startX: 88, startY: 70, ampX: 14, ampY: 12, periodX: 7,  periodY: 5,  driftUp: 0.4, baseRot: 0,   delay: 1.2 },

  // side — profil incliné vers la droite (butterfly1)
  { id: 3, img: "/images/butterfly1.png", type: "side", size: 38, startX: 72, startY: 20, ampX: 10, ampY: 14, periodX: 8,  periodY: 5,  driftUp: 0.3, baseRot: -8,  delay: 0.5 },
  { id: 4, img: "/images/butterfly1.png", type: "side", size: 28, startX: 18, startY: 78, ampX: 8,  ampY: 10, periodX: 6,  periodY: 4,  driftUp: 0.5, baseRot: -12, delay: 2.4 },

  // side — profil incliné vers la gauche (butterfly2) → on miroir avec scaleX(-1)
  { id: 5, img: "/images/butterfly2.png", type: "side", size: 34, startX: 45, startY: 35, ampX: 12, ampY: 10, periodX: 7,  periodY: 4.5,driftUp: 0.4, baseRot: 8,   delay: 3.1, flip: true },
  { id: 6, img: "/images/butterfly2.png", type: "side", size: 26, startX: 5,  startY: 50, ampX: 9,  ampY: 12, periodX: 6.5,periodY: 5,  driftUp: 0.45,baseRot: 10,  delay: 4.2, flip: true },

  { id: 7, img: "/images/butterfly.png",  type: "top",  size: 24, startX: 92, startY: 45, ampX: 10, ampY: 8,  periodX: 5,  periodY: 3.5,driftUp: 0.55,baseRot: 0,   delay: 5 },
];

const WING_INTERVAL = 0.18; // période de battement d'ailes (s)

export default function OurStory() {
  const refs = useRef([]);

  useEffect(() => {
    const rafs = [];
    const t0 = performance.now();

    const tick = (now) => {
      const t = (now - t0) / 1000;

      BUTTERFLIES.forEach((b, i) => {
        const el = refs.current[i];
        if (!el) return;
        const localT = Math.max(0, t - b.delay);

        // Déplacement borné : oscillation autour de startX/startY +
        // dérive verticale lente qui boucle proprement modulo période
        const loopPeriod = 30; // s — durée d'une "remontée" complète avant reboot
        const tt = localT % loopPeriod;

        const x = b.startX + Math.sin((tt / b.periodX) * Math.PI * 2) * b.ampX;
        // y descend doucement puis reboucle (mouvement de bas en haut visuel)
        const drift = (tt * b.driftUp) - (loopPeriod * b.driftUp) / 2; // centré
        const y = b.startY + Math.cos((tt / b.periodY) * Math.PI * 2) * b.ampY - drift * 0.6;

        el.style.left = `${x}%`;
        el.style.top  = `${y}%`;

        // Animation des ailes / corps
        if (b.type === "top") {
          // battement net via scaleX : 1 (ouvertes) ↔ 0.35 (fermées)
          const wingOpen = Math.floor(localT / WING_INTERVAL) % 2 === 0;
          const scaleX = wingOpen ? 1 : 0.4;
          el.style.transform = `scaleX(${scaleX})`;
        } else {
          // profil : douce oscillation rotation + petit "flap" via scaleY
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

  return (
    <div
      className="w-full flex flex-col text-start mx-auto py-20 px-2 select-none z-25 relative overflow-hidden"
      style={{ backgroundImage: "url(/images/bg_4.jpg)" }}
    >
      {/* Papillons */}
      {BUTTERFLIES.map((b, i) => (
        <div
          key={b.id}
          ref={(el) => (refs.current[i] = el)}
          className="absolute pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
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
          />
        </div>
      ))}

      {/* Titre */}
      <div className="relative z-20 mb-10 text-center w-full">
        <h2
          className="text-5xl xl:text-7xl font-medium text-olive-dark font-script"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          Notre Histoire d'Amour
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="h-px w-16 bg-olive text-xl" />
          <span className="text-olive text-xl">✦</span>
          <div className="h-px w-16 bg-olive text-xl" />
        </div>
      </div>

      {/* Texte */}
      <div className="relative z-20 max-w-xl px-2 w-full mx-auto space-y-5 text-center">
        {PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            className="text-md md:text-lg leading-relaxed italic font-title text-olive-dark"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
