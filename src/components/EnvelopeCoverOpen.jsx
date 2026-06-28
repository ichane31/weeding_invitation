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
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: 'url(/images/bg_primary.jpg)',
        padding: 'clamp(48px, 10vw, 80px) 0',
      }}
    >
      {/* Wrapper centré — même max-width que EnvelopeCover */}
      <div
        className="relative flex flex-col items-center text-center w-full"
        style={{ maxWidth: 'min(80vw, 400px)' }}
      >

        {/* Envelope Container */}
        <div
          className="relative w-full flex items-center justify-center select-none"
          style={{ aspectRatio: '1.55' }}
        >

          {/* Fleur gauche — mêmes valeurs que EnvelopeCover mais repositionnée vers le bas pour l'état ouvert */}
          <img
            src="/images/rose_primary.png"
            alt="Roses gauche"
            className="absolute pointer-events-none z-40 object-contain opacity-95"
            style={{
              width: 'clamp(180px, 65%, 340px)',
              top: 'clamp(-10px, 20%, 90px)',
              left: 'clamp(-90px, -28%, -60px)',
              transform: 'rotate(-40deg)',
            }}
            loading="lazy"
          />

          {/* Fleur droite */}
          <img
            src="/images/rose_secondary.png"
            alt="Roses droite"
            className="absolute pointer-events-none z-40 object-contain opacity-95"
            style={{
              width: 'clamp(120px, 42%, 220px)',
              bottom: 'clamp(-70px, -28%, -30px)',
              right: 'clamp(-70px, -24%, -30px)',
              transform: 'scaleX(-1)',
            }}
            loading="lazy"
          />

          {/* Ombre */}
          <div
            className="absolute rounded-full z-0"
            style={{
              left: '4%', right: '4%',
              bottom: 'clamp(8px, 3%, 20px)',
              height: 'clamp(10px, 3%, 20px)',
              background: 'rgba(0,0,0,0.10)',
              filter: 'blur(10px)',
            }}
          />

          {/* Enveloppe ouverte */}
          <img
            src="/images/envelop_open1.png"
            alt="Enveloppe ouverte"
            className="w-full h-full object-contain relative z-0"
            loading="lazy"
          />

          {/* Carte qui sort — clip path */}
          <div
            className="absolute h-[96%] sm:h-[98%] md:h-[100%] left-1/2 -translate-x-1/2 z-20 overflow-hidden"
            style={{
              bottom: '6%',
              width: '76%',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            <div
              className="will-change-transform"
              style={{
                transition: 'transform 1600ms cubic-bezier(0.22,1,0.36,1)',
                transform: pulled ? 'translateY(15%)' : 'translateY(85%)',
              }}
            >
              <img
                src="/images/bg_5.png"
                alt="Contenu de l'enveloppe"
                className="w-full h-auto object-contain relative"
                style={{ marginBottom: '-30%' }}
                loading="lazy"
              />

              {/* Texte sur la carte */}
              <div
                className="absolute top-0 left-0 right-0 w-full h-full flex flex-col items-center"
                style={{
                  padding: 'clamp(12%, 16%, 20%) clamp(6px, 4%, 14px) 0',
                  gap: 'clamp(2px, 0.5vw, 6px)',
                }}
              >
                <p
                  className="text-olive font-bogue font-title capitalize"
                  style={{ fontSize: 'clamp(13px, 3.2vw, 22px)', margin: 0, paddingBottom: '0.2em' }}
                >
                  Le mariage de
                </p>
                <p
                  className="text-olive font-script leading-tight"
                  style={{ fontSize: 'clamp(26px, 7vw, 44px)', margin: 0 }}
                >
                  Mairama
                </p>
                <p
                  className="text-olive font-roundhand"
                  style={{ fontSize: 'clamp(18px, 4.5vw, 32px)', margin: 'clamp(-16px, -1.2vw, -10px) 0' }}
                >
                  &amp;
                </p>
                <p
                  className="text-olive font-script leading-tight"
                  style={{ fontSize: 'clamp(26px, 7vw, 44px)', margin: 0 }}
                >
                  Ousmanou
                </p>
                <p
                  className="text-olive font-bogue font-semibold"
                  style={{ fontSize: 'clamp(14px, 3.5vw, 28px)', margin: 0, paddingTop: '0.1em' }}
                >
                  <time dateTime="2026-08-21">21 . 08 . 2026</time>
                </p>
              </div>
            </div>
          </div>

          {/* Rabat avant */}
          <img
            src="/images/envelop-front.png"
            alt=""
            className="absolute left-0 right-0 bottom-0 w-full h-auto object-contain pointer-events-none select-none z-30"
            style={{
              maxHeight: '100%',
              filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.08))',
            }}
            loading="lazy"
          />

          {/* Sceau */}
          <div
            className="absolute rounded-full flex items-center justify-center z-40"
            style={{
              top: 'clamp(68%, 71%, 73%)',
              left: '49%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(80px, 22%, 130px)',
              aspectRatio: '1'
            }}
          >
            <div
              className={`absolute inset-[-3px] rounded-full border border-olive/30 animate-ping opacity-45 ${pulled ? 'opacity-0' : ''}`}
            />
            <img
              src="/images/sceau1.png"
              alt="Sceau de cire OM"
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </div>
  );
}