import Butterflies from "./Butterflies";

const PARAGRAPHS = [
  "Peut-être étions-nous écrits l'un dans l'histoire de l'autre bien avant de le savoir. Deux âmes qui se croisaient sans savoir qu'un jour l'autre deviendrait maison.",
  "Ce qui commença par de simples moments devint lentement quelque chose de plus profond. L'amour arriva si naturellement que nous en remarquâmes à peine la première lueur.",
  "La vie nous apprit aussi la tendresse, et combien les cœurs peuvent être fragiles. Certains que nous aimions nous ont quittés, mais leur présence reste doucement parmi nous.",
  "À travers chaque sommet et chaque creux, nous avons appris que l'amour ne se trouve pas — il se construit à deux. D'étrangers à refuge, du hasard à la certitude.",
  "Et ceci n'est que le début de toutes les vies que nous vivrons encore ensemble.",
];

export default function OurStory() {

  return (
    <div
      className="w-full flex flex-col items-center justify-center mx-auto select-none relative overflow-hidden"
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
            fontSize: "clamp(33px, 7vw, 72px)",
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
      <Butterflies count={6} size={{ min: 20, max: 30 }} />

      {/* Paragraphes */}
      <div
        className="relative z-20 text-center w-full mx-auto"
        style={{
          maxWidth: "clamp(280px, 96%, 600px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10px, 2.5vw, 24px)",
        }}
      >
        {PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            className="italic font-title text-olive-dark leading-relaxed"
            style={{ fontSize: "clamp(13px, 2.2vw, 18px)", margin: 0 }}
          >
            {p}
          </p>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
    </div>
  );
}