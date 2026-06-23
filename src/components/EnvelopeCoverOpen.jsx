import { useEffect, useState } from "react";

export default function EnvelopeCoverOpen({open}) {

  const [pulled, setPulled] = useState(false);

  useEffect(() => {
    if (!open) { setPulled(false); return; }
    const t = setTimeout(() => setPulled(true), 600);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <div 
      className={`flex items-center justify-center bg-[#fdfbf7] py-20 min-h-screen transition-all duration-100 ease-in-out opacity-100`}
      style={{
        backgroundImage: 'url(/images/bg_primary.jpg)',
      }}
    >
      {/* Main Envelope and Flower Wrapper */}
      <div className="relative flex flex-col items-center px-4 max-w-2xl w-full text-center">
        
        {/* Envelope Container */}
        <div className="relative w-full aspect-[1.55] flex items-center justify-center select-none">
          
          {/* Decorative Floral Bouquet Left (Burgundy Roses) */}
          <img 
            src="/images/rose_primary.png" 
            alt="Roses gauche" 
            className="absolute rotate-[-40deg] left-[-25%] top-[20%] w-[80%] object-contain opacity-95 pointer-events-none z-40"
          />
          
          {/* Decorative Floral Bouquet Right (Burgundy Roses) */}
          <img 
            src="/images/rose_secondary.png" 
            alt="Roses droite" 
            className="absolute right-[-20%] bottom-[-5%] w-[50%] scale-x-[-1] object-contain opacity-95 pointer-events-none z-40"
          />

          {/* Envelope shadow */}
          <div className="absolute inset-x-8 bottom-6 h-6 bg-black/10 rounded-full blur-lg z-0"></div>

          {/* Closed Envelope Image (PNG transparent) */}
          <img 
            src="/images/envelop_open1.png" 
            alt="Enveloppe fermée" 
            className="w-full h-full object-contain relative z-0"
          />
          
          {/* Envelope content - Clip path pour cacher ce qui dépasse */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 z-20 overflow-hidden"
            style={{ 
              bottom: "8%", 
              width: "78%",
              height: "100%", // Ajustez cette valeur selon vos besoins
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
                style={{ marginBottom: "-30%" }} // Pour réduire l'espace en bas
              />

              {/* Content texte */}
              <div className="absolute top-0 left-0 right-0 py-16 w-full h-full flex flex-col gap-1">
                <p className="text-olive text-2xl md:text-3xl font-medium font-bogue capitalize font-title py-2 md:py-4">
                  Le mariage de 
                </p>
                <p className="text-olive m-0 text-5xl md:text-7xl font-medium font-script">
                  Mairama 
                </p>
                <p className="text-olive text-4xl md:text-6xl font-medium font-roundhand -my-2 md:-my-4">&</p>
                <p className="text-olive m-0 text-5xl md:text-7xl font-medium font-script">
                  Ousmanou 
                </p>
                <p className="text-olive m-0 pt-2 md:pt-4 text-3xl md:text-5xl font-semibold font-bogue">
                  <time dateTime="2026-08-21">21 . 08 . 2026</time>
                </p>
              </div>
            </div>
          </div>

          <img
            src="/images/envelop-front.png"
            alt=""
            className="absolute left-0 right-0 bottom-0 w-full h-auto object-contain z-30 pointer-events-none select-none"
            style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.08))" }}
          />

          {/* Green Wax Seal */}
          <div 
            className="absolute top-[72%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center z-40 group transition-transform duration-300 focus:outline-none"
          >
            <div className="absolute inset-[-4px] rounded-full border border-olive/30 animate-ping opacity-45 group-hover:animate-none"></div>
            
            <img 
              src="/images/sceau1.png" 
              alt="Sceau de cire OM" 
              className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

      </div>
    </div>
  );
}