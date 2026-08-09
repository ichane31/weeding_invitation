import { useState } from "react";
import { MapPin } from "lucide-react";
import Butterflies from "./Butterflies";

const PROGRAM = [
  {
    day: "Mercredi 19 août",
    events: [
      {
        title: "Bangourdé (présentation du trousseau de la mariée)",
        time: "16h00",
        location: "Marouaré - Domicile Alhadji Souaibou Idrissou",
      },
    ],
  },
  {
    day: "Jeudi 20 août",
    events: [
      {
        title: "Dambordou (cérémonie du henné)",
        time: "20h00",
        location: "Marouaré - Domicile Alhadji Souaibou Idrissou",
      },
    ],
  },
  {
    day: "Vendredi 21 août",
    events: [
      {
        title: "DOA et Tégal (mariage religieux)",
        time: "13h30",
        location: "Marouaré - Domicile Alhadji Souaibou Idrissou",
      },
      {
        title: "Yiwordou (lavage du henné de la mariée)",
        time: "15h30",
        location: "Marouaré - Domicile Alhadji Souaibou Idrissou",
      },
      {
        title: "Soudditordou (présentation de la mariée à sa belle famille)",
        time: "16h30",
        location: "Marouaré - Domicile Alhadji Sali Ousman Sambo (ASOS)",
      },
      {
        title: "Accompagnement de la mariée au domicile conjugal",
        time: "17h30",
        location: "Garoua - Marouaré",
      },
    ],
  },
  {
    day: "Samedi 22 août",
    events: [
      {
        title: "Mariage civil",
        time: "10h00",
        location: "Motel plazza",
      },
    ],
  },
  {
    day: "Dimanche 23 août",
    events: [
      {
        title: "Retour définitif",
        time: "10h00",
        location: "Garoua - Marouaré",
      },
    ],
  },
];

export default function Itinerary() {
  const [frameLoaded, setFrameLoaded] = useState(false);

  return (
    <section
      id="itinerary"
      className="hero-section relative w-full flex items-center justify-center"
      style={{
        backgroundImage: "url(/images/bg_4.jpg)",
        padding: "clamp(40px, 6vw, 66px) clamp(12px, 4vw, 32px)",
      }}
    >
      <Butterflies count={5} size={{ min: 20, max: 30 }} loading="lazy" />
      <div
        className="relative w-full"
        style={{ maxWidth: "clamp(300px, 99%, 600px)" }}
      >
        {/* Cadre */}
        <div className="relative w-full shadow-2xl">
          {/* Placeholder pour le cadre */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: "#fdfbf7",
              opacity: frameLoaded ? 0 : 1,
              transition: "opacity 300ms ease-in-out",
            }}
          />
          <img
            src="/images/cadre_itinerary.png"
            alt="Cadre du programme"
            className="absolute inset-0 w-full h-full z-0 object-fill"
            loading="lazy"
            onLoad={() => setFrameLoaded(true)}
          />

          {/* Conteneur pour le contenu, superposé sur l'image */}
          <div
            className="relative z-10 w-full h-full flex items-center justify-center"
            style={{ padding: "clamp(30px, 16%, 80px) clamp(24px, 6.5%, 36px)" }}
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
            loading="lazy" // Cette image est décorative et peut être chargée paresseusement
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
            loading="lazy" // Idem pour celle-ci
          />

          {/* Contenu */}
          <div
            className="w-full flex flex-col items-center justify-center"
            style={{ gap: "clamp(2px, 3vw, 10px)" }}
          >
            {/* Titre */}
            <h2
              className="font-script text-olive-dark"
              style={{ fontSize: "clamp(32px, 7vw, 64px)", marginTop: "-10px" }}
            >
              Programme
            </h2>

            {/* Jours + événements */}
            <div
              className="w-full"
              style={{
                maxWidth: "clamp(260px, 95%, 680px)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px, 2vw, 14px)",
                margin: "0 auto",
              }}
            >
              {PROGRAM.map((day, dayIndex) => (
                <div
                  key={`day-${dayIndex}-${dayIndex}`}
                  className="text-center"
                >
                  {/* Nom du jour : souligné, gras, vert foncé */}
                  <p
                    className="font-title text-burgundy-dark font-bold underline"
                    style={{
                      fontSize: "clamp(15px, 3vw, 23px)",
                      margin: "0 0 clamp(6px, 1vw, 8px)",
                    }}
                  >
                    {day.day}
                  </p>

                  {/* Liste des événements du jour */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "clamp(6px, 2vw, 10px)",
                    }}
                  >
                    {day.events.map((e, eventIndex) => (
                      <div key={`${e.time}-${e.title}-${eventIndex}`}>
                        {/* Titre de l'événement */}
                        <p
                          className="font-title font-semibold text-olive-dark leading-snug"
                          style={{
                            fontSize: "clamp(12px, 2.2vw, 15px)",
                            margin: 0,
                          }}
                        >
                          {e.title}
                        </p>
                        {/* Heure : doré, gras */}
                        <p
                          className="font-bogue font-medium text-gold uppercase"
                          style={{
                            fontSize: "clamp(14px, 2.5vw, 18px)",
                            margin: "clamp(2px, 0.5vw, 4px) 0 0",
                          }}
                        >
                          {e.time}
                        </p>
                        {/* Lieu : italique, plus petit, avec pin */}
                        {e.location && (
                          // <p
                          //   className="italic text-black"
                          //   style={{
                          //     fontSize: "clamp(9.5px, 1.8vw, 13px)",
                          //     margin: "clamp(1px, 0.3vw, 3px) 0 0",
                          //   }}
                          // >
                          //   {e.location}
                          // </p>
                          <p
                            className="italic font-semibold text-black text-center"
                            style={{
                              fontSize: "clamp(10px, 1.8vw, 14px)",
                              margin: "clamp(1px, 0.3vw, 3px) 0 0",
                            }}
                          >
                            <MapPin
                              className="inline-block flex-shrink-0"
                              style={{
                                width: "clamp(9px, 1.8vw, 13px)",
                                height: "clamp(9px, 1.8vw, 13px)",
                                verticalAlign: "-2px",
                                marginRight: "3px",
                              }}
                            />
                            {e.location}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
