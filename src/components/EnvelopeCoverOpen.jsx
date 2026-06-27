import { useEffect, useState } from "react";

export default function EnvelopeCoverOpen({ open }) {
  const [pulled, setPulled] = useState(false);

 useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setPulled(false), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPulled(true), 600);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <div 
      className={`flex items-center justify-center bg-[#fdfbf7] py-12 sm:py-16 md:py-20 min-h-screen transition-all duration-100 ease-in-out opacity-100`}
      style={{
        backgroundImage: 'url(/images/bg_primary.jpg)',
      }}
    >
      {/* Main Envelope and Flower Wrapper */}
      <div className="relative flex flex-col items-center px-4 sm:px-6 md:px-8 max-w-xl md:max-w-2xl w-full text-center">
        
        {/* Envelope Container */}
        <div className="relative w-full aspect-[1.55] flex items-center justify-center select-none">
          
          {/* Decorative Floral Bouquet Left */}
          <img 
            src="/images/rose_primary.png" 
            alt="Roses gauche" 
            className="absolute rotate-[-40deg] left-[-15%] sm:left-[-20%] md:left-[-25%] top-[25%] sm:top-[20%] md:top-[20%] w-[60%] sm:w-[65%] md:w-[80%] object-contain opacity-95 pointer-events-none z-40"
            loading="lazy"
          />
          
          {/* Decorative Floral Bouquet Right */}
          <img 
            src="/images/rose_secondary.png" 
            alt="Roses droite" 
            className="absolute right-[-12%] sm:right-[-16%] md:right-[-20%] bottom-[-10%] sm:bottom-[-8%] md:bottom-[-5%] w-[40%] sm:w-[45%] md:w-[50%] scale-x-[-1] object-contain opacity-95 pointer-events-none z-40"
            loading="lazy"
          />

          {/* Envelope shadow - responsive */}
          <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-8 bottom-3 sm:bottom-4 md:bottom-6 h-3 sm:h-4 md:h-6 bg-black/10 rounded-full blur-md sm:blur-lg z-0"></div>

          {/* Closed Envelope Image */}
          <img 
            src="/images/envelop_open1.png" 
            alt="Enveloppe fermée" 
            className="w-full h-full object-contain relative z-0"
            loading="lazy"
          />
          
          {/* Envelope content - Clip path */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 z-20 overflow-hidden"
            style={{ 
              bottom: "6%", 
              width: "76%",
              height: "100%",
              clipPath: "inset(0 0 0 0)"
            }}
          >
            <div
              className={`transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                pulled ? "translate-y-[15%]" : "translate-y-[95%]"
              }`}
              style={{
                transform: pulled ? "translateY(15%)" : "translateY(85%)"
              }}
            >
              <img 
                src="/images/bg_5.png" 
                alt="Contenu de l'enveloppe" 
                className="w-full h-auto object-contain relative"
                loading="lazy"
                style={{ marginBottom: "-30%" }}
              />

              {/* Content texte - responsive */}
              <div className="absolute top-0 left-0 right-0 px-2 sm:px-4 py-[16%] sm:py-20 md:py-16 w-full h-full flex flex-col items-center gap-0.5 sm:gap-1">
                <p className="text-olive text-xl sm:text-2xl md:text-3xl lg:text-3xl font-medium font-bogue capitalize font-title py-1 sm:py-2 md:py-4">
                  Le mariage de 
                </p>
                <p className="text-olive m-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium font-script leading-tight">
                  Mairama 
                </p>
                <p className="text-olive text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium font-roundhand -my-1 sm:-my-2 md:-my-4">
                  &amp;
                </p>
                <p className="text-olive m-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium font-script leading-tight">
                  Ousmanou 
                </p>
                <p className="text-olive m-0 pt-1 sm:pt-2 md:pt-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold font-bogue">
                  <time dateTime="2026-08-21">21 . 08 . 2026</time>
                </p>
              </div>
            </div>
          </div>

          {/* Envelope front overlay */}
          <img
            src="/images/envelop-front.png"
            alt=""
            className="absolute left-0 right-0 bottom-0 w-full h-auto object-contain z-30 pointer-events-none select-none"
            style={{ 
              filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.08))",
              maxHeight: "100%"
            }}
            loading="lazy"
          />

          {/* Green Wax Seal - responsive */}
          <div 
            className="absolute top-[70%] sm:top-[71%] md:top-[72%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center z-40 group transition-transform duration-300 focus:outline-none"
          >
            {/* Pulsing ring responsive */}
            <div className={`absolute inset-[-3px] sm:inset-[-4px] rounded-full border-2 sm:border border-olive/30 animate-ping opacity-45 group-hover:animate-none ${
              pulled ? 'opacity-0' : ''
            }`}></div>
            
            <img 
              src="/images/sceau1.png" 
              alt="Sceau de cire OM" 
              className="w-full h-full rounded-full object-cover group-hover:scale-110 sm:group-hover:scale-115 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}