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
      className={`fixed inset-0 flex items-center justify-center bg-[#fdfbf7] transition-all duration-1000 ease-in-out ${
        isOpenAnimation ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundImage: 'url(/images/bg_primary.jpg)' }}
    >
      <div className="relative flex flex-col items-center w-full max-w-[min(90vw,480px)] px-0 text-center">

        {/* Envelope Container */}
        <div className="relative w-full aspect-[1.55] flex items-center justify-center select-none">

          {/* Floral Left — plus grande, déborde plus à gauche et en haut */}
          <img
            src="/images/rose_primary.png"
            alt="Roses gauche"
            className="absolute pointer-events-none z-10 object-contain opacity-95"
            style={{
              width: 'clamp(180px, 65%, 340px)',
              top: 'clamp(-80px, -30%, -40px)',
              left: 'clamp(-90px, -30%, -60px)',
              transform: 'rotate(-40deg)',
            }}
            loading="lazy"
          />

          {/* Floral Right — plus grande, déborde plus à droite et en bas */}
          <img
            src="/images/rose_secondary.png"
            alt="Roses droite"
            className="absolute pointer-events-none z-10 object-contain opacity-95 scale-x-[-1]"
            style={{
              width: 'clamp(120px, 42%, 220px)',
              bottom: 'clamp(-70px, -28%, -30px)',
              right: 'clamp(-70px, -24%, -30px)',
            }}
            loading="lazy"
          />

          {/* Shadow */}
          <div className="absolute inset-x-6 bottom-3 h-4 bg-black/10 rounded-full blur-lg z-0" />

          {/* Envelope */}
          <img
            src="/images/envelop_close2.png"
            alt="Enveloppe fermée"
            className="w-full h-full object-contain relative z-0"
            loading="lazy"
          />

          {/* Wax Seal Button */}
          <button
            onClick={handleOpen}
            className="absolute top-[55%] left-[49%] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-20 group transition-transform duration-300 focus:outline-none"
            style={{ width: 'clamp(80px, 22%, 130px)', height: 'clamp(80px, 22%, 130px)' }}
          >
            <div className={`absolute inset-[-3px] rounded-full border border-olive/30 animate-ping opacity-45 group-hover:animate-none ${isOpenAnimation ? 'opacity-0' : ''}`} />
            <img
              src="/images/sceau1.png"
              alt="Sceau de cire OM"
              className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleOpen}
          className="mt-[clamp(12px,3vw,24px)] font-bogue text-olive-dark tracking-[0.25em] uppercase hover:text-burgundy transition-all duration-300 flex flex-col items-center gap-1.5 group focus:outline-none"
          style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
        >
          <span>Open Invitation</span>
          <span className="h-[1px] w-8 bg-olive-dark group-hover:w-20 group-hover:bg-burgundy transition-all duration-300" />
        </button>

      </div>
    </div>
  );
}