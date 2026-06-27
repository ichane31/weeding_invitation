import { useState } from 'react';

export default function EnvelopeCover({ onOpen }) {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);

  const handleOpen = () => {
    setIsOpenAnimation(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-[#fdfbf7] pt-[72px] transition-all duration-1000 ease-in-out ${
        isOpenAnimation ? 'transform -translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'url(/images/bg_primary.jpg)',
      }}
    >
      <div className="relative flex flex-col items-center px-4 sm:px-6 md:px-8 max-w-xl w-full text-center">
        
        {/* Envelope Container */}
        <div className="relative w-full aspect-[1.55] flex items-center justify-center select-none">
          
          {/* Decorative Floral Bouquet Left */}
          <img 
            src="/images/rose_primary.png" 
            alt="Roses gauche" 
            className="absolute rotate-[-40deg] left-[-15%] sm:left-[-20%] md:left-[-25%] top-[-15%] sm:top-[-20%] md:top-[-25%] w-[50%] sm:w-[65%] md:w-[80%] object-contain opacity-95 pointer-events-none z-10"
            loading="lazy"
          />
          
          {/* Decorative Floral Bouquet Right */}
          <img 
            src="/images/rose_secondary.png" 
            alt="Roses droite" 
            className="absolute right-[-12%] sm:right-[-16%] md:right-[-20%] bottom-[-15%] sm:bottom-[-20%] md:bottom-[-25%] w-[30%] sm:w-[40%] md:w-[50%] scale-x-[-1] object-contain opacity-95 pointer-events-none z-10"
            loading="lazy"
          />

          {/* Envelope shadow - responsive */}
          <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-8 bottom-3 sm:bottom-4 md:bottom-6 h-3 sm:h-4 md:h-6 bg-black/10 rounded-full blur-md sm:blur-lg z-0"></div>

          {/* Closed Envelope Image */}
          <img 
            src="/images/envelop_close2.png" 
            alt="Enveloppe fermée" 
            className="w-full h-full object-contain relative z-0"
            loading="lazy"
          />

          {/* Green Wax Seal */}
          <button 
            onClick={handleOpen}
            className="absolute top-[55%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center z-20 group transition-transform duration-300 focus:outline-none"
          >
            {/* Pulsing ring - responsive sizing */}
            <div className={`absolute inset-[-3px] sm:inset-[-4px] rounded-full border-2 sm:border border-olive/30 animate-ping opacity-45 group-hover:animate-none ${
              isOpenAnimation ? 'opacity-0' : ''
            }`}></div>
            
            {/* Round Green Wax Seal Image */}
            <img 
              src="/images/sceau1.png" 
              alt="Sceau de cire OM" 
              className="w-full h-full rounded-full object-cover group-hover:scale-110 sm:group-hover:scale-115 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        </div>

        {/* Bottom Call to Action */}
        <button 
          onClick={handleOpen}
          className="mt-3 sm:mt-4 md:mt-6 font-bogue text-xs sm:text-sm md:text-base text-olive-dark tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:text-burgundy transition-all duration-300 flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <span className="text-xs sm:text-sm md:text-base">Open Invitation</span>
          <span className="h-[1px] w-8 sm:w-10 bg-olive-dark group-hover:w-16 sm:group-hover:w-24 group-hover:bg-burgundy transition-all duration-300"></span>
        </button>

      </div>
    </div>
  );
}