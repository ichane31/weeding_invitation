import { useState } from 'react';

export default function EnvelopeCover({ onOpen }) {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);

  const handleOpen = () => {
    setIsOpenAnimation(true);
    // Let the animation play for 1 second before calling the parent onOpen handler
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
      {/* Main Envelope and Flower Wrapper */}
      <div className="relative flex flex-col items-center px-4 max-w-2xl w-full text-center">
        
        {/* Envelope Container */}
        <div className="relative w-full aspect-[1.55] flex items-center justify-center select-none">
          
          {/* Decorative Floral Bouquet Left (Burgundy Roses) */}
          <img 
            src="/images/rose_primary.png" 
            alt="Roses gauche" 
            className="absolute rotate-[-40deg] left-[-25%] top-[-25%] w-[80%] object-contain opacity-95 pointer-events-none z-10"
          />
          
          {/* Decorative Floral Bouquet Right (Burgundy Roses) */}
          <img 
            src="/images/rose_secondary.png" 
            alt="Roses droite" 
            className="absolute right-[-20%] bottom-[-25%] w-[50%] scale-x-[-1] object-contain opacity-95 pointer-events-none z-10"
          />

          {/* Envelope shadow */}
          <div className="absolute inset-x-8 bottom-6 h-6 bg-black/10 rounded-full blur-lg z-0"></div>

          {/* Closed Envelope Image (PNG transparent) */}
          <img 
            src="/images/envelop_close2.png" 
            alt="Enveloppe fermée" 
            className="w-full h-full object-contain relative z-0"
          />

          {/* Green Wax Seal (OM.jpg) in the center of the envelope flap */}
          <button 
            onClick={handleOpen}
            className="absolute top-[55%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 w- h-40 md:w-40 md:h-40 rounded-full flex items-center justify-center z-20 group transition-transform duration-300 focus:outline-none"
          >
            {/* Pulsing ring behind the seal */}
            <div className="absolute inset-[-4px] rounded-full border border-olive/30 animate-ping opacity-45 group-hover:animate-none"></div>
            
            {/* Round Green Wax Seal Image */}
            <img 
              src="/images/sceau1.png" 
              alt="Sceau de cire OM" 
              className="w-full h-full rounded-full object-cover group-hover:scale-115 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Bottom Call to Action (Open Invitation) */}
        <button 
          onClick={handleOpen}
          className="mt-2 font-bogue text-sm md:text-base text-olive-dark tracking-[0.25em] uppercase hover:text-burgundy transition-all duration-300 flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <span>Open Invitation</span>
          <span className="h-[1px] w-10 bg-olive-dark group-hover:w-24 group-hover:bg-burgundy transition-all duration-300"></span>
        </button>

      </div>
    </div>
  );
}

