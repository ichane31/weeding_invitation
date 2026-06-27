import { useState, useEffect } from "react";

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
    <div className="w-full flex flex-col items-center text-center px-3 sm:px-4 md:px-6 select-none relative">
      {/* Title */}
      <h3 className="font-script w-full text-center sm:text-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-olive-dark mb-2 sm:mb-3 md:mb-4">
        Counting Days
      </h3>

      {/* Countdown Grid */}
      <div className="w-full max-w-4xl mx-auto flex justify-center items-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 md:px-6">
        {/* Days */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-semibold text-burgundy-dark leading-none">
            {formatNum(timeLeft.days)}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-olive font-semibold tracking-widest uppercase">
            Jours
          </span>
        </div>

        <span className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-burgundy-dark leading-none px-0.5 sm:px-1">
          :
        </span>

        {/* Hours */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-semibold text-burgundy-dark leading-none">
            {formatNum(timeLeft.hours)}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-olive font-semibold tracking-widest uppercase">
            Heures
          </span>
        </div>

        <span className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-burgundy-dark leading-none px-0.5 sm:px-1">
          :
        </span>

        {/* Minutes */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-semibold text-burgundy-dark leading-none">
            {formatNum(timeLeft.minutes)}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-olive font-semibold tracking-widest uppercase">
            Minutes
          </span>
        </div>

        <span className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-burgundy-dark leading-none px-0.5 sm:px-1">
          :
        </span>

        {/* Seconds */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-semibold text-burgundy-dark leading-none">
            {formatNum(timeLeft.seconds)}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-olive font-semibold tracking-widest uppercase">
            Secondes
          </span>
        </div>
      </div>

      {/* Location Card with Frame */}
      <div className="relative w-[90%] sm:w-[85%] md:w-[80%] lg:w-[77%] mt-4 sm:mt-6 md:mt-8">
        <img
          src="/images/cadre10.png"
          alt="Cadre décoratif"
          className="w-full aspect-[1.6] pointer-events-none z-10"
          loading="lazy"
        />
        
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script text-olive-dark mb-1 sm:mb-3 md:mb-4 lg:mb-6">
            Lieu de la Réception
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-wide font-title uppercase text-olive-dark mb-1 sm:mb-3">
            VILLA RIMBA FLORA GOMBAK
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-title text-olive-dark">
            9381, Jalan Gombak, Ulu Gombak,
            <br className="hidden xs:block" />
            <span className="block xs:inline">53100 Selangor</span>
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-2 sm:mt-3 md:mt-5 lg:mt-6 relative z-10">
            <a
              href="https://maps.google.com/?q=9381+Jalan+Gombak+Ulu+Gombak+53100+Selangor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border-2 border-olive-dark text-sm sm:text-base italic transition-all duration-300 hover:bg-olive-dark hover:text-cream hover:scale-105"
            >
              Google Maps
            </a>
            <a
              href="https://waze.com/ul?q=9381+Jalan+Gombak+Ulu+Gombak+53100+Selangor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border-2 border-olive-dark text-sm sm:text-base italic transition-all duration-300 hover:bg-olive-dark hover:text-cream hover:scale-105"
            >
              Waze
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Roses */}
      <img
        src="/images/rose_secondary1.png"
        alt="Rose décorative"
        className="absolute right-[-8%] sm:right-[-6%] md:right-[-5%] rotate-[320deg] top-[8%] sm:top-[-3%] md:top-[-4%] w-[33%] sm:w-[35%] md:w-[38%] pointer-events-none z-10"
        loading="lazy"
      />

      <img
        src="/images/rose_secondary2.png"
        alt="Rose décorative"
        className="absolute left-[-5%] sm:left-[-3%] md:left-0 rotate-[-10deg] bottom-[-12%] sm:bottom-[-15%] md:bottom-[-18%] w-[28%] sm:w-[30%] md:w-[32%] pointer-events-none z-10"
        loading="lazy"
      />
    </div>
  );
}