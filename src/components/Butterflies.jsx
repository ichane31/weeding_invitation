import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// 🦋 Butterflies Component — réutilisable
//
// Usage basique :   <Butterflies />
//
// Usage personnalisé :
//   <Butterflies
//     count={8}
//     size={{ min: 40, max: 60 }}
//     speed={{ min: 14, max: 28 }}
//     wingSpeed={280}
//     opacity={0.9}
//     zone="full"
//     className="absolute inset-0 pointer-events-none"
//   />
// ─────────────────────────────────────────────────────────

const IMGS = {
  flat:  "/images/butterfly.png",
  right: "/images/butterfly1.png",
  left:  "/images/butterfly2.png",
};

const TYPES = ["flat", "fly-right", "fly-left"];

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Positions entièrement déterministes — pas de Math.random() ici
function buildButterflies(count, size, speed, zone) {
  const rand = seededRand(42 + count);

  return Array.from({ length: count }, (_, i) => {
    const r1 = rand(), r2 = rand(), r3 = rand(),
          r4 = rand(), r5 = rand(), r6 = rand();

    // Position de départ selon la zone
    let startX, startY;
    switch (zone) {
      case "top":
        startX = (i / count) * 85 + 5;
        startY = r2 * 30 + 5;
        break;
      case "bottom":
        startX = (i / count) * 85 + 5;
        startY = r2 * 30 + 65;
        break;
      case "sides":
        startX = i % 2 === 0 ? r1 * 15 : 82 + r1 * 15;
        startY = r2 * 80 + 10;
        break;
      default: // full
        startX = (i / count) * 85 + 5;
        startY = r2 * 80 + 10;
    }

    return {
      id:       i,
      type:     TYPES[Math.floor(r3 * TYPES.length)],
      startX,
      startY,
      size:     size.min  + r4 * (size.max  - size.min),
      speed:    speed.min + r5 * (speed.max - speed.min),
      delay:    r6 * 5,           // délai max réduit à 5s (était 8s)
      rotation: (rand() - 0.5) * 30,
      phase:    rand() * Math.PI * 2,
    };
  });
}

// ── Papillon individuel ──
function ButterflyItem({ data, wingSpeed, opacity }) {
  const wrapRef  = useRef(null);
  const imgRef   = useRef(null);
  const frameRef = useRef(null);

  // Position courante — persistée entre frames via ref
  const posRef = useRef({ x: data.startX, y: data.startY });

  const dataRef      = useRef(data);
  const wingSpeedRef = useRef(wingSpeed);
  useEffect(() => { dataRef.current      = data;      }, [data]);
  useEffect(() => { wingSpeedRef.current = wingSpeed; }, [wingSpeed]);

  useEffect(() => {
    const el  = wrapRef.current;
    const img = imgRef.current;
    if (!el || !img) return;

    let startTime = null;

    function animate(timestamp) {
      const d  = dataRef.current;
      const ws = wingSpeedRef.current;

      // Initialiser le temps de départ au premier frame
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // secondes écoulées

      // ── Trajectoire ──
      // Oscillation horizontale
      const drift  = Math.sin(elapsed / d.speed * 5 + d.phase) * 14;
      // Montée continue + légère oscillation verticale
      const rise   = (elapsed / d.speed) * 18;
      const wobble = Math.cos(elapsed / d.speed * 3 + d.phase) * 4;

      let x = d.startX + drift;
      let y = d.startY - rise + wobble;

      // ── Rebouclage : quand sort en haut → revient en bas ──
      // On recalcule startTime pour repartir de y=100% 
      if (y < -15) {
        startTime = timestamp;
        posRef.current.x = d.startX;
        posRef.current.y = 100;
        x = d.startX;
        y = 100;
      }
      // Rebouclage horizontal
      if (x > 110) x = -10;
      if (x < -12) x = 108;

      posRef.current = { x, y };
      el.style.left = `${x}%`;
      el.style.top  = `${y}%`;

      // ── Battement d'ailes ──
      const wingOpen = ((timestamp) % (ws * 2)) < ws;

      if (d.type === "flat") {
        img.style.transform  = `rotate(${d.rotation}deg) scaleX(${wingOpen ? 1 : 0.2})`;
        img.style.transition = `transform ${ws * 0.75}ms ease-in-out`;
      } else {
        const goLeft = d.type === "fly-left";
        const suffix = wingOpen ? "butterfly1.png" : "butterfly2.png";
        if (!img.src.endsWith(suffix)) {
          img.src = wingOpen ? IMGS.right : IMGS.left;
        }
        img.style.transform  = `rotate(${d.rotation}deg) scaleX(${goLeft ? -1 : 1})`;
        img.style.transition = "none";
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    // Délai de départ puis animation infinie
    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, data.delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:      "absolute",
        width:         data.size,
        height:        data.size,
        left:          `${data.startX}%`,
        top:           `${data.startY}%`,
        opacity,
        willChange:    "left, top, transform",
        pointerEvents: "none",
      }}
    >
      <img
        ref={imgRef}
        src={data.type === "flat" ? IMGS.flat : IMGS.right}
        alt=""
        draggable={false}
        style={{
          width:           "100%",
          height:          "100%",
          objectFit:       "contain",
          transformOrigin: "center center",
          filter:          "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
          userSelect:      "none",
        }}
      />
    </div>
  );
}

// ── Composant principal exporté ──
export default function Butterflies({
  count     = 7,
  size      = { min: 24, max: 44 },
  speed     = { min: 14, max: 28 },
  wingSpeed = 280,
  opacity   = 0.9,
  zone      = "full",
  className = "absolute inset-0 pointer-events-none overflow-hidden",
}) {
  const butterflies = buildButterflies(count, size, speed, zone);

  return (
    <div className={className} style={{ zIndex: 30 }}>
      {butterflies.map((b) => (
        <ButterflyItem
          key={b.id}
          data={b}
          wingSpeed={wingSpeed}
          opacity={opacity}
        />
      ))}
    </div>
  );
}