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
      className="relative w-full py-12 sm:py-16 md:py-20 px-3 sm:px-4 flex items-center justify-center"
      style={{ backgroundImage: "url(/images/bg_4.jpg)" }}
    >
      <div className="relative max-w-[89%] sm:max-w-xl w-full px-2 sm:px-0">
        {/* Cadre papier avec bordure ornementale */}
        <div
          className="relative flex items-center justify-center bg-[#f5efe2] aspect-[0.85] w-full bg-[#ebe3d1] px-6 sm:px-8 md:px-8 lg:px-10 py-12 sm:py-14 md:py-16 text-center shadow-2xl"
          style={{
            backgroundImage: "url(/images/bg_8.png)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >

          {/* Roses en haut à droite */}
          <img
            src="/images/rose_primary.png"
            alt="Décoration florale"
            className="pointer-events-none absolute rotate-[-30deg] -top-[6%] sm:-top-[8%] -right-[15%] sm:-right-[18%] md:-right-[20%] w-[40%] sm:w-[40%] md:w-[50%] lg:w-[55%] z-20 scale-x-[-1]"
            loading="lazy"
          />
          
          {/* Roses en bas à gauche */}
          <img
            src="/images/rose_primary.png"
            alt="Décoration florale"
            className="pointer-events-none absolute rotate-[-30deg] -bottom-[12%] sm:-bottom-[14%] md:-bottom-[16%] -left-[10%] sm:-left-[12%] md:-left-[15%] w-[40%] sm:w-[40%] md:w-[50%] lg:w-[55%] z-20 scale-y-[-1]"
            loading="lazy"
          />

          {/* Contenu principal */}
          <div className="relative z-10 w-full h-[95%] sm:h-[82%] md:h-[82%] flex flex-col items-center justify-center">
            {/* Titre avec décoration */}
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <h2 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-olive-dark">
                Programme
              </h2>
            </div>

            {/* Liste des événements */}
            <ul className="space-y-4 list-none sm:space-y-5 md:space-y-6 lg:space-y-7 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%]">
              {EVENTS.map((e, i) => (
                <li key={i} className="relative">                  
                  <div className="px-4 sm:px-5 md:px-6">
                    <p className="font-title text-sm sm:text-base md:text-lg lg:text-xl text-olive-dark leading-tight sm:leading-snug">
                      {e.title}
                    </p>
                    <p className="font-title text-[13px] sm:text-sm md:text-base lg:text-lg text-burgundy mt-0.5 sm:mt-1 font-medium">
                      {e.time}
                    </p>
                  </div>
                
                </li>
              ))}
            </ul>
          </div>

          {/* Petites fleurs décoratives en haut à gauche et bas à droite */}
          {/* <img
            src="/images/rose_secondary1.png"
            alt=""
            className="pointer-events-none absolute -top-[4%] -left-[8%] w-[15%] sm:w-[18%] md:w-[20%] z-20 opacity-60 rotate-12"
            loading="lazy"
          />
          <img
            src="/images/rose_secondary2.png"
            alt=""
            className="pointer-events-none absolute -bottom-[6%] -right-[10%] w-[15%] sm:w-[18%] md:w-[20%] z-20 opacity-60 rotate-45"
            loading="lazy"
          /> */}
        </div>
      </div>
    </section>
  );
}