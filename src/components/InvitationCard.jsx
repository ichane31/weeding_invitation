import { useEffect, useState, useRef } from "react";
import { Pause, Play } from "lucide-react";
import Countdown from "./Countdown";
import Butterflies from "./Butterflies";

export default function InvitationCard({ animateCard = false }) {
  const [pulled, setPulled] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const musicUrl = "https://assets.mixkit.co/music/preview/mixkit-wedding-piano-1224.mp3";

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

  // Lance la musique dès que animateCard passe à true (l'utilisateur vient de cliquer sur l'enveloppe)
  useEffect(() => {
    if (!animateCard || !audioRef.current) return;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Toujours bloqué — l'utilisateur devra cliquer sur le disque
        setIsPlaying(false);
      });
  }, [animateCard]);

  // Sync play/pause quand l'utilisateur clique sur le disque
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  console.log(isPlaying)

  return (
    <div
      className="relative flex flex-col items-center w-full select-none"
      style={{ backgroundImage: "url(/images/bg_primary.jpg)" }}
    >
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      <Butterflies count={4} size={{ min: 20, max: 30 }} />

      {/* ── Enveloppe ouverte ── */}
      <div
        className="w-full flex items-center justify-center !pb-6"
        style={{
          backgroundImage: "url(/images/bg_primary.jpg)",
          padding: "clamp(32px, 6vw, 64px) 0",
        }}
      >
        <div
          className="relative flex flex-col items-center text-center w-full"
          style={{ maxWidth: "min(80vw, 400px)" }}
        >
          <div
            className="relative w-full flex items-center justify-center select-none"
            style={{ aspectRatio: "1.55" }}
          >
            {/* Fleur gauche */}
            <img
              src="/images/rose_primary.png"
              alt="Roses gauche"
              className="absolute pointer-events-none z-30 object-contain opacity-95"
              style={{
                width: "clamp(180px, 65%, 340px)",
                top: "clamp(-10px, 20%, 90px)",
                left: "clamp(-90px, -30%, -60px)",
                transform: "rotate(-40deg)",
              }}
              loading="lazy"
            />

            {/* Fleur droite */}
            <img
              src="/images/rose_secondary.png"
              alt="Roses droite"
              className="absolute pointer-events-none z-30 object-contain opacity-95"
              style={{
                width: "clamp(120px, 42%, 220px)",
                bottom: "clamp(-70px, -28%, -30px)",
                right: "clamp(-70px, -24%, -30px)",
                transform: "scaleX(-1)",
              }}
              loading="lazy"
            />

            {/* Ombre */}
            <div
              className="absolute rounded-full z-0"
              style={{
                left: "4%", right: "4%",
                bottom: "clamp(8px, 3%, 20px)",
                height: "clamp(10px, 3%, 20px)",
                background: "rgba(0,0,0,0.10)",
                filter: "blur(10px)",
              }}
            />

            {/* Enveloppe */}
            <img
              src="/images/envelop_open1.png"
              alt="Enveloppe ouverte"
              className="w-full h-full object-contain relative z-0"
              loading="lazy"
            />

            {/* Carte qui sort */}
            <div
              className="absolute left-1/2 h-[96%] sm:h-[92%] -translate-x-1/2 z-20 overflow-hidden"
              style={{ bottom: "8%", width: "80%" }}
            >
              <div
                className="will-change-transform"
                style={{
                  transition: "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
                  transform: pulled ? "translateY(12%)" : "translateY(75%)",
                }}
              >
                <img
                  src="/images/cadre41.png"
                  alt="Contenu enveloppe"
                  className="w-full h-auto object-contain relative"
                  loading="lazy"
                />
                <div
                  className="absolute top-0 w-full h-full flex flex-col items-center justify-start"
                  style={{ paddingTop: "20%", paddingLeft: "18%", paddingRight: "18%" }}
                >
                  <p
                    className="text-olive font-script leading-tight"
                    style={{ fontSize: "clamp(24px, 7.5vw, 40px)", margin: 0 }}
                  >
                    The Beginning of Forever starts here
                  </p>
                </div>
              </div>
            </div>

            {/* Rabat avant */}
            <img
              src="/images/envelop-front.png"
              alt=""
              className="absolute left-0 right-0 bottom-0 w-full h-auto object-contain z-20 pointer-events-none select-none"
              style={{
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.08))",
                maxHeight: "100%",
              }}
              loading="lazy"
            />

            {/* Sceau */}
            <div
              className="absolute rounded-full flex items-center justify-center z-40"
              style={{
                top: "72%", left: "49%",
                transform: "translate(-50%, -50%)",
                width: "clamp(80px, 22%, 130px)",
                aspectRatio: '1'
              }}
            >
              <div className="absolute inset-[-3px] rounded-full border border-olive/30 animate-ping opacity-45" />
              <img
                src="/images/sceau1.png"
                alt="Sceau de cire OM"
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Disque vinyle */}
            <button
              className="absolute pointer-events-auto z-30 cursor-pointer group bg-transparent border-0 p-0"
              style={{
                left: "clamp(-5%, -10%, -15%)",
                bottom: "clamp(-10%, -15%, -20%)",
                width: "clamp(100px, 30%, 180px)",
              }}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <img
                src="/images/disque.png"
                alt="Disque vinyle"
                className="w-full relative z-0 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-black/80 rounded-full p-3 backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
                  {isPlaying
                    ? <Pause size={32} color="white" fill="white" />
                    : <Play  size={32} color="white" fill="white" />
                  }
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
                    d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  />
                </defs>
                <text style={{ fontSize: 13 }} className="tracking-wider fill-white">
                  <textPath href="#curved-text-path" startOffset="20%" textAnchor="middle">
                    {isPlaying ? "En lecture..." : "Cliquez pour jouer"}
                  </textPath>
                </text>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Cartes invitation + date ── */}
      <div
        className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-0 pb-8 lg:pb-16 overflow-visible"
        style={{ backgroundImage: "url(/images/bg_primary.jpg)" }}
      >
        <Butterflies count={8} size={{ min: 20, max: 30 }} />

        {/* Carte invitation */}
        <div
          className={`relative w-full flex items-center justify-center transition-all duration-1000 ease-out z-30 ${
            cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{ maxWidth: "clamp(280px, 85vw, 480px)" }}
        >
          <div
            className="relative w-full flex items-center justify-center"
            style={{ aspectRatio: "1 / 1.45" }}
          >
            <img
              src="/images/bg_5.png"
              alt="Fleurs fond"
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              loading="lazy"
            />

            <div
              className="relative z-30 flex flex-col items-center justify-center text-center gap-2"
              style={{ width: "70%", height: "75%" }}
            >
              <div className="w-full flex flex-col items-center gap-1">
                <span
                  className="font-script text-olive tracking-widest font-semibold block"
                  style={{ fontSize: "clamp(14px, 3.5vw, 32px)" }}
                >
                  بِسْماللَّهِالرَّحْمَٰنِالرَّحِيمِ
                </span>
                <span
                  className="font-title text-olive/80 tracking-wide"
                  style={{ fontSize: "clamp(9px, 1.8vw, 13px)" }}
                >
                  Au nom d'Allah SWT, le Très Miséricordieux, le Tout Miséricordieux
                </span>
              </div>

              <p
                className="font-title text-olive/80 tracking-wide leading-relaxed"
                style={{ fontSize: "clamp(9px, 1.8vw, 13px)", maxWidth: "240px" }}
              >
                Nous avons l'honneur de vous inviter à célébrer le mariage de
              </p>

              <div className="flex flex-col items-center font-title gap-1">
                <h2 className="font-script text-olive-dark leading-none" style={{ fontSize: "clamp(18px, 4.5vw, 36px)" }}>
                  Ousmanou SALIHOU
                </h2>
                <p className="text-olive font-medium tracking-wider flex flex-col items-center gap-0.5" style={{ fontSize: "clamp(8px, 1.6vw, 12px)" }}>
                  <span>Fils de</span>
                  <span className="uppercase">Salihou Ousmanou Sambo</span>
                  <span>❀</span>
                  <span className="uppercase">Salihou Ousmanou Sambo</span>
                </p>
              </div>

              <span className="font-roundhand font-thin text-gold-dark" style={{ fontSize: "clamp(20px, 4vw, 36px)" }}>
                &amp;
              </span>

              <div className="flex flex-col items-center font-title gap-1">
                <h2 className="font-script text-olive-dark leading-none" style={{ fontSize: "clamp(18px, 4.5vw, 36px)" }}>
                  Mairama SOUAIBOU
                </h2>
                <p className="text-olive font-medium tracking-wider flex flex-col items-center gap-0.5" style={{ fontSize: "clamp(8px, 1.6vw, 12px)" }}>
                  <span>Fille de</span>
                  <span className="uppercase">SOUAIBOU Idrissou</span>
                  <span>❀</span>
                  <span className="uppercase">SOUAIBOU Idrissou</span>
                </p>
              </div>
            </div>

            <img
              src="/images/rose_primary.png"
              alt="Fleurs décoratives"
              className="absolute pointer-events-none z-40"
              style={{
                left: "clamp(2px, 1%, 10px)",
                bottom: "-2%",
                width: "clamp(80px, 45%, 210px)",
                transform: "rotate(300deg)",
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Carte date */}
        <div
          className={`relative transition-all duration-1000 ease-out z-30 lg:ml-[-50px] ${
            cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{ width: "clamp(200px, 55vw, 280px)" }}
        >
          <div className="lg:mt-[34%]">
            <div
              className="absolute pointer-events-none z-40 flex items-center justify-center"
              style={{
                width: "clamp(100px, 70%, 180px)",
                top: "clamp(-70px, -30%, -45px)",
                left: "20%",
                transform: "rotate(-90deg)",
              }}
            >
              <img src="/images/rose_secondary1.png" alt="" className="w-full h-full object-contain" loading="lazy" />
            </div>

            <div
              className="absolute pointer-events-none z-40 flex items-center justify-center"
              style={{
                width: "clamp(100px, 70%, 180px)",
                bottom: "clamp(-85px, -30%, -65px)",
                left: "-20%",
                transform: "rotate(-40deg)",
              }}
            >
              <img src="/images/rose_secondary1.png" alt="" className="w-full h-full object-contain" loading="lazy" />
            </div>

            <div
              className="relative bg-[#fdfbf7] border-2 rounded-sm shadow-lg flex flex-col items-center text-center overflow-hidden"
              style={{ aspectRatio: "0.72" }}
            >
              <img
                src="/images/cadre2.png"
                alt="Cadre décoratif"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                loading="lazy"
              />
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2 py-3 px-3">
                <span className="font-script font-medium text-olive tracking-widest" style={{ fontSize: "clamp(20px, 5vw, 36px)" }}>
                  Vendredi
                </span>
                <span className="font-script text-olive-dark font-semibold leading-none" style={{ fontSize: "clamp(30px, 7vw, 50px)" }}>
                  21
                </span>
                <span className="font-script font-medium text-olive tracking-widest" style={{ fontSize: "clamp(20px, 5vw, 36px)" }}>
                  Août 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Countdown ── */}
      <div
        className="relative w-full flex items-center justify-center py-2"
        style={{ backgroundImage: "url(/images/bg_4.jpg)" }}
      >
        <div className="w-[90%] max-w-3xl">
          <Countdown />
        </div>
      </div>
    </div>
  );
}