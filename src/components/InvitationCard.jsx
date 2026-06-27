import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import Countdown from "./Countdown";
import Butterflies from "./Butterflies";

export default function InvitationCard({ animateCard = false }) {
  const [pulled, setPulled] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    if (!animateCard) {
      const t = setTimeout(() => setPulled(false), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPulled(true), 600);
    return () => clearTimeout(t);
  }, [animateCard]);

  useEffect(() => {
    if (animateCard) {
      const t = setTimeout(() => setCardVisible(true), 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCardVisible(false), 0);
    return () => clearTimeout(t);
  }, [animateCard]);

  return (
    <div
      className="relative flex flex-col items-center w-full select-none"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      <Butterflies count={4} size={{ min: 25, max: 40 }} />

      <div
        className={`w-full flex items-center justify-center bg-[#fdfbf7] py-10 transition-all duration-100 ease-in-out opacity-100`}
        style={{
          backgroundImage: "url(/images/bg_primary.jpg)",
        }}
      >
        {/* Main Envelope and Flower Wrapper */}
        <div className="relative flex flex-col items-center px-4 max-w-xl md:max-w-2xl w-full text-center">
          {/* Envelope Container */}
          <div className="relative w-full aspect-[1.55] flex items-center justify-center select-none">
            {/* Decorative Floral Bouquet Left */}
            <img
              src="/images/rose_primary.png"
              alt="Roses gauche"
              className="absolute rotate-[-40deg] left-[-15%] sm:left-[-20%] md:left-[-25%] top-[25%] sm:top-[20%] md:top-[20%] w-[60%] sm:w-[65%] md:w-[80%]] object-contain opacity-95 pointer-events-none z-30"
              loading="lazy"
            />

            {/* Decorative Floral Bouquet Right */}
            <img
              src="/images/rose_secondary.png"
              alt="Roses droite"
              className="absolute right-[-12%] sm:right-[-16%] md:right-[-20%] bottom-[-10%] sm:bottom-[-8%] md:bottom-[-5%] w-[40%] sm:w-[45%] md:w-[50%] scale-x-[-1] object-contain opacity-95 pointer-events-none z-30"
              loading="lazy"
            />

            {/* Envelope shadow */}
            <div className="absolute inset-x-8 bottom-6 h-6 bg-black/10 rounded-full blur-lg z-0"></div>

            {/* Closed Envelope Image */}
            <img
              src="/images/envelop_open1.png"
              alt="Enveloppe fermée"
              className="w-full h-full object-contain relative z-0"
              loading="lazy"
            />

            {/* Envelope content */}
            <div
              className="absolute w-[80%] md:w-[90%] lg:w-[95%] left-1/2 -translate-x-1/2 z-20 overflow-hidden"
              style={{
                bottom: "8%",
                height: "95%",
              }}
            >
              <div
                className={`transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  pulled ? "translate-y-[12%]" : "translate-y-[75%]"
                }`}
              >
                <img
                  src="/images/cadre41.png"
                  alt="Contenu enveloppe"
                  className="w-full h-auto object-contain relative"
                  loading="lazy"
                />

                <div className="absolute top-0 pt-[23%] md:pt-32 w-full h-full flex flex-col gap-1 px-[18%] sm:px-28 md:px-32">
                  <p className="text-olive m-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium font-script leading-2xl">
                    The Beginning of Ferever starts here
                  </p>
                </div>
              </div>
            </div>

            <img
              src="/images/envelop-front.png"
              alt=""
              className="absolute left-0 right-0 bottom-0 w-full h-auto object-contain z-20 pointer-events-none select-none"
              style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.08))" }}
              loading="lazy"
            />

            {/* Green Wax Seal */}
            <div className="absolute top-[72%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center z-40 group transition-transform duration-300 focus:outline-none">
              <div className="absolute inset-[-4px] rounded-full border border-olive/30 animate-ping opacity-45 group-hover:animate-none"></div>
              <img
                src="/images/sceau1.png"
                alt="Sceau de cire OM"
                className="w-full h-full rounded-full object-cover group-hover:scale-115 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Disque - MODIFICATION : z-30 au lieu de z-40 pour être en dessous */}
            <div className="absolute left-[-5%] md:left-[-15%] bottom-[-15%] w-36 md:w-60 lg:w-72 opacity-95 pointer-events-auto z-30 cursor-pointer group">
              <img
                src="/images/disque.png"
                alt="Disque vinyle"
                className="w-full relative z-0 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-black/80 rounded-full p-3 md:p-4 backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
                  <Play size={40} color="white" fill="white" />
                </div>
              </div>

              <svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="curved-text-path"
                    fill="none"
                    d="M 100, 100 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  />
                </defs>
                <text className="text-sm md:text-md tracking-wider fill-white">
                  <textPath
                    href="#curved-text-path"
                    startOffset="20%"
                    textAnchor="middle"
                  >
                    Cliquez pour jouer
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout Container - avec animation d'apparition */}
      <div
        className={`relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-2 py-4 lg:py-8 transition-all duration-1000 ease-out bg-no-repeat`}
        style={{
          backgroundImage: "url(/images/bg_primary.jpg)",
        }}
      >
        <Butterflies count={8} size={{ min: 25, max: 40 }} />

        {/* LEFT/CENTER: The Main Invitation Card */}
        <div
          className={`relative w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[800px] aspect-[1/1.5] sm:aspect-[1/1.4] rounded-xl flex items-center justify-center px-4 sm:px-6 md:px-8 bg-cover bg-center z-50 transition-all duration-1000 ease-out ${
            cardVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          {/* Background Image */}
          <img
            src="/images/bg_5.png"
            alt="Fleurs fond"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            loading="lazy"
          />

          {/* Invitation Text Content */}
          <div className="relative z-10 w-full max-w-[75%] sm:max-w-[73%] md:max-w-[75%] lg:max-w-[70%] h-[85%] sm:h-[80%] md:h-[75%] lg:h-[70%] flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-center text-center py-2 sm:py-3 md:py-4">
            {/* Header Section */}
            <div className="w-full flex flex-col text-center gap-1 sm:gap-2">
              <span className="font-script text-md sm:text-base md:text-2xl lg:text-3xl xl:text-5xl text-olive tracking-widest font-semibold block mb-0.5 sm:mb-1">
                بِسْماللَّهِالرَّحْمَٰنِالرَّحِيمِ
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-title text-olive/80 tracking-wide">
                Au nom d'Allah SWT, <br className="sm:hidden" />
                <span className="hidden sm:inline">—</span> le Très
                Miséricordieux, le Tout Miséricordieux
              </span>
            </div>

            <p className="font-title text-[10px] sm:text-xs md:text-sm lg:text-base text-olive/80 tracking-wide leading-relaxed max-w-[200px] sm:max-w-[240px] md:max-w-[280px] my-1 sm:my-2">
              Nous avons l'honneur de vous inviter à célébrer le mariage de
            </p>

            {/* Groom Section */}
            <div className="flex flex-col items-center font-title gap-1 sm:gap-2">
              <h2 className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-olive-dark leading-none">
                Ousmanou SALIHOU
              </h2>
              <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm flex flex-col items-center text-olive font-medium tracking-wider gap-0.5 sm:gap-1">
                <span>Fils de</span>
                <span className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-sm font-medium uppercase">
                  salihou Ousmanou sambo
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm">❀</span>
                <span className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-sm font-medium uppercase">
                  salihou Ousmanou sambo
                </span>
              </p>
            </div>

            {/* Separator */}
            <span className="font-roundhand font-thin text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gold-dark my-0 sm:my-1">
              &
            </span>

            {/* Bride Section */}
            <div className="flex flex-col items-center font-title gap-1 sm:gap-2">
              <h2 className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-olive-dark leading-none">
                Mairama SOUAIBOU
              </h2>
              <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm flex flex-col items-center text-olive font-medium tracking-wider gap-0.5 sm:gap-1">
                <span>Fille de</span>
                <span className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-sm font-medium uppercase">
                  SOUAIBOU Idrissou
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm">❀</span>
                <span className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-sm font-medium uppercase">
                  SOUAIBOU Idrissou
                </span>
              </p>
            </div>

            {/* Footer */}
            <p className="font-sans text-[7px] sm:text-[8px] md:text-[9px] text-gray-400 tracking-widest uppercase mt-1 sm:mt-2">
              — Union Sacrée —
            </p>
          </div>

          {/* Decorative Rose */}
          <img
            src="/images/rose_primary.png"
            alt="Fleurs décoratives"
            className="absolute left-[5px] sm:left-[10px] rotate-[315deg] bottom-[-2%] w-[40%] sm:w-[45%] lg:w-[50%] pointer-events-none z-10"
            loading="lazy"
          />
        </div>

        {/* RIGHT: Separate Date Card */}
        <div
          className={`relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-[0.72] mb-[5%] md:mb-[2%] lg:mb-0 lg:mt-[15%] lg:ml-[-8%] z-50 transition-all duration-1000 ease-out ${
            cardVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          {/* Decorative Roses for Date Card */}
          <div className="absolute w-[70%] sm:w-[75%] lg:w-[90%] -top-[30%] sm:-top-[38%] lg:-top-[58%] left-[25%] sm:left-[20%] z-40 rotate-[-90deg] pointer-events-none flex items-center justify-center">
            <img
              src="/images/rose_secondary1.png"
              alt="Fleurs décoratives"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="absolute w-[70%] sm:w-[75%] lg:w-[90%] left-[-25%] sm:left-[30%] rotate-[-40deg] sm:rotate-[230deg] -bottom-[20%] sm:-bottom-[40%] lg:bottom-[-70%] z-40 pointer-events-none flex items-center justify-center">
            <img
              src="/images/rose_secondary1.png"
              alt="Fleurs décoratives"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Date Card Content */}
          <div className="relative bg-[#fdfbf7] border-2 rounded-sm shadow-lg flex flex-col items-center text-center h-full overflow-hidden">
            <img
              src="/images/cadre2.png"
              alt="Cadre décoratif"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              loading="lazy"
            />
            {/* <div className="absolute inset-0 bg-[#fdfbf7]/30 backdrop-blur-[1px]"></div> */}

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 py-3 sm:py-4 px-3 sm:px-4">
              <span className="font-script font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-olive tracking-widest">
                Vendredi
              </span>
              <span className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-olive-dark font-semibold leading-none">
                21
              </span>
              <span className="font-script font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-olive tracking-widest">
                Août 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown  and address card */}
      <div
        className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-2 py-2 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: "url(/images/bg_4.jpg)",
        }}
      >
        <div className="w-[90%] max-w-4xl">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
