import Butterflies from "./Butterflies";

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

export default function OurStory() {

  return (
    <div
      className="w-full flex flex-col items-center justify-center mx-auto select-none relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/bg_4.jpg)",
        padding: "clamp(30px, 8vw, 76px) clamp(12px, 4vw, 32px)",
      }}
    >


      {/* Titre */}
      <div className="relative z-20 text-center w-full" style={{ marginBottom: "clamp(20px, 5vw, 48px)" }}>
        <h2
          className="font-script font-medium text-olive-dark"
          style={{
            fontSize: "clamp(32px, 7vw, 72px)",
            textShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: "0 clamp(8px, 3vw, 24px)",
          }}
        >
          Notre Histoire d'Amour
        </h2>
        <div className="flex items-center justify-center" style={{ gap: "clamp(8px, 2vw, 16px)", marginTop: "clamp(6px, 1.5vw, 14px)" }}>
          <div className="h-px bg-olive" style={{ width: "clamp(32px, 5vw, 64px)" }} />
          <span className="text-olive" style={{ fontSize: "clamp(14px, 2vw, 22px)" }}>✦</span>
          <div className="h-px bg-olive" style={{ width: "clamp(32px, 5vw, 64px)" }} />
        </div>
      </div>
      <Butterflies size={{ min: 20, max: 30 }} />

      {/* Paragraphes */}
      <div
        className="relative z-20 text-center w-full mx-auto"
        style={{
          maxWidth: "clamp(280px, 88%, 600px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10px, 2.5vw, 24px)",
        }}
      >
        {PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            className="italic font-title text-olive-dark leading-relaxed"
            style={{ fontSize: "clamp(12px, 2.2vw, 18px)", margin: 0 }}
          >
            {p}
          </p>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
    </div>
  );
}