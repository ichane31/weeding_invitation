import { useState, useEffect } from "react";
import Butterflies from "./Butterflies";

export default function Countdown() {
  const targetDate = new Date("2026-08-21T15:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNum = (num) => (num < 10 ? `0${num}` : num);

  const units = [
    { value: timeLeft.days,    label: "Jours" },
    { value: timeLeft.hours,   label: "Heures" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Secondes" },
  ];

  return (
    <div className="w-full flex flex-col items-center text-center select-none relative"
      style={{ padding: "0 clamp(12px, 4vw, 48px)", paddingTop: "clamp(20px, 6vw, 50px)" }}
    >
      <Butterflies size={{ min: 20, max: 30 }}/>
      {/* Titre */}
      <h3
        className="font-script text-olive-dark max-w-2xl w-full text-start"
        style={{ fontSize: "clamp(32px, 7vw, 72px)", marginBottom: "clamp(-16px, -2vw, -10px)" }}
      >
        Le compte à rebours
      </h3>

      {/* Chiffres */}
      <div className="w-full max-w-2xl flex items-center"
        style={{ gap: "clamp(4px, 2vw, 24px)" }}
      >
        {units.map((unit, i) => (
          <>
            <div key={unit.label} className="flex flex-col items-center" style={{ gap: "clamp(4px, 1vw, 8px)" }}>
              <span
                className="font-title font-semibold text-burgundy-dark leading-none"
                style={{ fontSize: "clamp(28px, 8vw, 62px)" }}
              >
                {formatNum(unit.value)}
              </span>
              <span
                className="text-olive font-semibold tracking-widest uppercase"
                style={{ fontSize: "clamp(7px, 1.5vw, 11px)" }}
              >
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                key={`sep-${i}`}
                className="font-title text-burgundy-dark leading-none"
                style={{ fontSize: "clamp(32px, 9vw, 72px)", padding: "0 clamp(2px, 0.5vw, 6px)" }}
              >
                :
              </span>
            )}
          </>
        ))}
      </div>

      {/* Carte lieu */}
      <div
        className="relative"
        style={{
          width: "clamp(280px, 88%, 620px)",
          marginTop: "clamp(4px, 2vw, 10px)",
        }}
      >
        <img
          src="/images/cadre10.png"
          alt="Cadre décoratif"
          className="w-full pointer-events-none z-10"
          style={{ aspectRatio: "1.6" }}
          loading="lazy"
        />

        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
          style={{ padding: "clamp(16px, 6%, 56px) clamp(16px, 5%, 40px)" }}
        >
          <h2
            className="font-script text-olive-dark"
            style={{ fontSize: "clamp(20px, 4.5vw, 48px)", marginBottom: "clamp(4px, 1.5vw, 20px)" }}
          >
            Lieu de la Réception
          </h2>

          <p
            className="font-title font-semibold tracking-wide uppercase text-olive-dark"
            style={{ fontSize: "clamp(10px, 2.2vw, 20px)", marginBottom: "clamp(4px, 1vw, 12px)" }}
          >
            VILLA RIMBA FLORA GOMBAK
          </p>

          <p
            className="font-title text-olive-dark leading-relaxed"
            style={{ fontSize: "clamp(9px, 2vw, 18px)" }}
          >
            9381, Jalan Gombak, Ulu Gombak,{" "}
            <span className="block">53100 Selangor</span>
          </p>

          <div
            className="flex flex-wrap justify-center relative z-10"
            style={{ gap: "clamp(6px, 2vw, 12px)", marginTop: "clamp(8px, 2.5vw, 24px)" }}
          >
            <a
              href="https://maps.google.com/?q=9381+Jalan+Gombak+Ulu+Gombak+53100+Selangor"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-olive-dark italic transition-all duration-300 hover:bg-olive-dark hover:text-cream hover:scale-105"
              style={{ fontSize: "clamp(9px, 2vw, 15px)", padding: "clamp(4px, 1vw, 8px) clamp(12px, 3vw, 20px)" }}
            >
              Google Maps
            </a>
            <a
              href="https://waze.com/ul?q=9381+Jalan+Gombak+Ulu+Gombak+53100+Selangor"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-olive-dark italic transition-all duration-300 hover:bg-olive-dark hover:text-cream hover:scale-105"
              style={{ fontSize: "clamp(9px, 2vw, 15px)", padding: "clamp(4px, 1vw, 8px) clamp(12px, 3vw, 20px)" }}
            >
              Waze
            </a>
          </div>
        </div>

        {/* Rose droite haut */}
      <img
        src="/images/rose_secondary1.png"
        alt="Rose décorative"
        className="absolute pointer-events-none z-10"
        style={{
          right: "clamp(-40px, -6%, -10px)",
          top: "clamp(-120px, -34%, -60px)",
          width: "clamp(90px, 38%, 220px)",
          transform: "rotate(325deg)",
        }}
        loading="lazy"
      />

      {/* Rose gauche bas */}
      <img
        src="/images/rose_secondary2.png"
        alt="Rose décorative"
        className="absolute pointer-events-none z-10"
        style={{
          left: "clamp(-20px, -5%, 0px)",
          bottom: "clamp(-60px, -16%, -20px)",
          width: "clamp(80px, 30%, 180px)",
          transform: "rotate(-10deg)",
        }}
        loading="lazy"
      />
      </div>

      
    </div>
  );
}