import React, { useState, useEffect } from "react";

export default function Countdown() {
  // Target date: August 21, 2026 at 15:30:00
  const targetDate = new Date("2026-08-21T15:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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

  // Format single digits with a leading zero
  const formatNum = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="w-full flex flex-col pt-6 items-center text-start mx-auto px-2 select-none relative">
      {/* Title */}
      <h3 className="font-script w-full text-start text-4xl md:text-6xl xl:text-8xl text-olive-dark mb-2">
        Counting Days
      </h3>

      {/* Grid container */}
      <div className="mx-auto  max-w-3xl flex w-full text-start justify-start ml-10 px-8">
        {/* Days Box */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-title text-start text-3xl md:text-5xl xl:text-6xl font-semibold text-burgundy-dark">
            {formatNum(timeLeft.days)}
          </span>
          <span className="text-[8px] md:text-[10px] text-olive font-semibold tracking-widest uppercase mt-1">
            Jours
          </span>
        </div>

        <span className="px-3 font-title text-start text-3xl md:text-5xl xl:text-6xl text-burgundy-dark">
          {" "}
          :{" "}
        </span>

        {/* Hours Box */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-title text-start text-3xl md:text-5xl xl:text-6xl text-burgundy-dark">
            {formatNum(timeLeft.hours)}
          </span>
          <span className="text-[8px] md:text-[10px] text-olive font-semibold tracking-widest uppercase mt-1">
            Heures
          </span>
        </div>

        <span className="px-3 font-title text-start text-3xl md:text-5xl xl:text-6xl text-burgundy-dark">
          {" "}
          :{" "}
        </span>

        {/* Minutes Box */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-title text-start text-3xl md:text-5xl xl:text-6xl text-burgundy-dark">
            {formatNum(timeLeft.minutes)}
          </span>
          <span className="text-[8px] md:text-[10px] text-olive font-semibold tracking-widest uppercase mt-1">
            Minutes
          </span>
        </div>

        <span className="px-3 font-title text-start text-3xl md:text-5xl xl:text-6xl text-burgundy-dark">
          {" "}
          :{" "}
        </span>

        {/* Seconds Box */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-title text-start text-3xl md:text-5xl xl:text-6xl text-burgundy-dark">
            {formatNum(timeLeft.seconds)}
          </span>
          <span className="text-[8px] md:text-[10px] text-olive font-semibold tracking-widest uppercase mt-1">
            Secondes
          </span>
        </div>
      </div>

      {/* Cadre content */}
      <div className="relative w-[77%]">
        <img
          src="/images/cadre10.png"
          alt="Fleurs bas"
          className="bottom-[-13%] w-full aspect-[1.6] pointer-events-none z-10"
        />
        <div className="absolute top-[10%] w-full h-[80%] px-8 py-10 md:py-16 xl:py-28 text-center flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-6xl mb-6 relative font-script text-olive-dark">
            Lieu de la Réception
          </h2>
          <p className="text-lg md:text-2xl font-semibold tracking-wide font-title uppercase text-olive-dark mb-3">
            VILLA RIMBA FLORA GOMBAK
          </p>

          <p className="text-md md:text-xl leading-relaxed font-title text-olive-dark">
            9381, Jalan Gombak, Ulu Gombak,
            <br />
            53100 Selangor
          </p>
          <div className="flex gap-3 justify-center mt-6 relative z-10">
            <a
              href="https://maps.google.com/?q=9381+Jalan+Gombak+Ulu+Gombak+53100+Selangor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-2 border-olive-dark text-md italic transition-colors hover:bg-olive-dark hover:text-cream"
            >
              Google Maps
            </a>
            <a
              href="https://waze.com/ul?q=9381+Jalan+Gombak+Ulu+Gombak+53100+Selangor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-2 border-olive-dark text-md italic transition-colors hover:bg-olive-dark hover:text-cream"
            >
              Waze
            </a>
          </div>
        </div>
      </div>

      <img
        src="/images/rose_secondary1.png"
        alt="Fleurs bas"
        className="absolute right-[-5%] rotate-[320deg] top-[-4%] w-[38%] pointer-events-none z-10"
      />

      <img
        src="/images/rose_secondary2.png"
        alt="Fleurs bas"
        className="absolute left-[0%] rotate-[-10deg] bottom-[-18%] w-[30%] pointer-events-none z-10"
      />
    </div>
  );
}
