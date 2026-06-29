import Butterflies from "./Butterflies";

const EVENTS = [
  { title: "Accueil des invités", time: "18h00 – 19h00" },
  { title: "L'amour commence son merveilleux voyage", time: "19h30" },
  { title: "Dîner pour célébrer l'amour", time: "20h30" },
  { title: "La soirée s'éteindra, mais notre amour vivra", time: "22h00" },
];

export default function Itinerary() {
  return (
    <section
      id="itinerary"
      className="relative w-full flex items-center justify-center"
      style={{
        backgroundImage: "url(/images/bg_4.jpg)",
        padding: "clamp(40px, 6vw, 66px) clamp(12px, 4vw, 32px)",
      }}
    >
      <Butterflies size={{ min: 20, max: 30 }}/>
      <div
        className="relative w-full"
        style={{ maxWidth: "clamp(280px, 89%, 520px)" }}
      >
        {/* Cadre */}
        <div
          className="relative flex items-center justify-center w-full shadow-2xl"
          style={{
            aspectRatio: "0.85",
            backgroundImage: "url(/images/bg_8.png)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            padding: "clamp(32px, 8%, 72px) clamp(28px, 7%, 48px)",
          }}
        >
          {/* Rose haut droite */}
          <img
            src="/images/rose_primary.png"
            alt="Décoration florale"
            className="pointer-events-none absolute z-20"
            style={{
              width: "clamp(170px, 50%, 300px)",
              top: "clamp(-38px, -8%, -30px)",
              right: "clamp(-50px, -18%, -24px)",
              transform: "rotate(-30deg) scaleX(-1)",
            }}
            loading="lazy"
          />

          {/* Rose bas gauche */}
          <img
            src="/images/rose_primary.png"
            alt="Décoration florale"
            className="pointer-events-none absolute z-20"
            style={{
              width: "clamp(170px, 50%, 300px)",
              bottom: "clamp(-80px, -16%, -50px)",
              left: "clamp(-40px, -12%, -16px)",
              transform: "rotate(-30deg) scaleY(-1)",
            }}
            loading="lazy"
          />

          {/* Contenu */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center" style={{ gap: "clamp(2px, 3vw, 20px)" }}>

            {/* Titre */}
            <h2
              className="font-script text-olive-dark"
              style={{ fontSize: "clamp(32px, 7vw, 64px)" }}
            >
              Programme
            </h2>

            {/* Événements */}
            <ul
              className="list-none w-full"
              style={{
                maxWidth: "clamp(200px, 85%, 380px)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(12px, 3vw, 28px)",
                margin: "0 auto",
                padding: 0,
              }}
            >
              {EVENTS.map((e, i) => (
                <li key={i} className="relative text-center">
                  <p
                    className="font-title text-olive-dark leading-snug"
                    style={{ fontSize: "clamp(11px, 2.4vw, 18px)", margin: 0 }}
                  >
                    {e.title}
                  </p>
                  <p
                    className="font-title text-burgundy font-medium"
                    style={{ fontSize: "clamp(10px, 2.2vw, 16px)", margin: "clamp(2px, 0.5vw, 6px) 0 0" }}
                  >
                    {e.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}