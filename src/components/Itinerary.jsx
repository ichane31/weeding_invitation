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
      className="relative w-full py-20 px-4 flex items-center justify-center"
      style={{ backgroundImage: "url(/images/bg_4.jpg)" }}
    >
      <div className="relative max-w-xl w-full">
        {/* Cadre papier avec bordure ornementale */}
        <div
          className="relative flex items-center justify-center bg-[#f5efe2] aspect-[0.85] bg-[#ebe3d1] px-8 py-14 md:px-14 md:py-16 text-center shadow-2xl"
          style={{
            backgroundImage: "url(/images/bg_8.png)",
            backgroundSize: "100% 100%",
          }}
        >
          {/* Roses en haut à droite */}
          <img
            src={"/images/rose_primary.png"}
            alt=""
            className="pointer-events-none absolute rotate-[-30deg] -top-[8%] -right-[20%] w-[50%] md:w-[64%] z-20 scale-x-[-1]"
          />
          {/* Roses en bas à gauche */}
          <img
            src={"/images/rose_primary.png"}
            alt=""
            className="pointer-events-none absolute rotate-[-30deg] -bottom-[16%] -left-[15%] w-[50%] md:w-[64%] z-20 scale-y-[-1]"
          />

          <div className="h-[80%]">
            <h2 className="font-script text-5xl md:text-6xl text-olive-dark mb-10">
              Programme
            </h2>

            <ul className="space-y-7">
              {EVENTS.map((e, i) => (
                <li key={i}>
                  <p className="font-title text-lg md:text-xl text-olive-dark">
                    {e.title}
                  </p>
                  <p className="font-title text-base md:text-lg text-burgundy mt-1">
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
