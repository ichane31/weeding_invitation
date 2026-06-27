import { useState, useEffect } from 'react';

/**
 * EnvelopeScene — remplace EnvelopeCover + EnvelopeCoverOpen
 *
 * États internes :
 *   idle      → enveloppe fermée, sceau visible, CTA affiché
 *   opening   → swap image fermée→ouverte + carte qui monte (1 600 ms)
 *   exiting   → tout le bloc monte hors écran vers le haut (900 ms)
 *   done      → composant retiré du DOM (onOpen() appelé)
 */
export default function EnvelopeScene({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | opening | exiting | done

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');

    // Après que la carte soit bien visible, on fait monter le tout
    setTimeout(() => setPhase('exiting'), 1800);
    // On notifie le parent une fois la sortie terminée
    setTimeout(() => {
      setPhase('done');
      onOpen();
    }, 2700);
  };

  const isOpen    = phase === 'opening' || phase === 'exiting';
  const isExiting = phase === 'exiting';
  const isIdle    = phase === 'idle';

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: 'url(/images/bg_primary.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // Montée vers le haut + fondu à la sortie
        transition: 'transform 900ms cubic-bezier(0.4,0,0.2,1), opacity 900ms ease',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        opacity:   isExiting ? 0 : 1,
      }}
    >
      {/* Wrapper centré responsive */}
      <div
        className="relative flex flex-col items-center text-center w-full"
        style={{ maxWidth: 'min(90vw, 480px)', padding: '0 0 clamp(48px, 8vw, 80px)' }}
      >

        {/* ── Envelope Container ── */}
        <div
          className="relative w-full flex items-center justify-center select-none"
          style={{ aspectRatio: '1.55' }}
        >

          {/* Fleur gauche */}
          <img
            src="/images/rose_primary.png"
            alt="Roses gauche"
            className="absolute pointer-events-none z-40 object-contain opacity-95"
            style={{
              width: 'clamp(110px, 50%, 240px)',
              left:  'clamp(-60px, -20%, -24px)',
              // Fermée : en haut / Ouverte : descend un peu
              top: isOpen
                ? 'clamp(-10px, 18%, 60px)'
                : 'clamp(-60px, -20%, -24px)',
              transform: 'rotate(-40deg)',
              transition: 'top 900ms cubic-bezier(0.22,1,0.36,1)',
            }}
            loading="lazy"
          />

          {/* Fleur droite */}
          <img
            src="/images/rose_secondary.png"
            alt="Roses droite"
            className="absolute pointer-events-none z-40 object-contain opacity-95"
            style={{
              width:  'clamp(70px, 28%, 140px)',
              right:  'clamp(-44px, -16%, -18px)',
              bottom: isOpen
                ? 'clamp(-40px, -14%, -16px)'
                : 'clamp(-50px, -18%, -20px)',
              transform: 'scaleX(-1)',
              transition: 'bottom 900ms cubic-bezier(0.22,1,0.36,1)',
            }}
            loading="lazy"
          />

          {/* Ombre */}
          <div
            className="absolute rounded-full"
            style={{
              left: '5%', right: '5%', bottom: '3%',
              height: 'clamp(10px, 3%, 20px)',
              background: 'rgba(0,0,0,0.10)',
              filter: 'blur(10px)',
              zIndex: 0,
            }}
          />

          {/* ── Image enveloppe : swap fermée ↔ ouverte ── */}

          {/* Fermée — disparaît au clic */}
          <img
            src="/images/envelop_close2.png"
            alt="Enveloppe fermée"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              zIndex: 1,
              transition: 'opacity 300ms ease',
              opacity: isOpen ? 0 : 1,
              pointerEvents: 'none',
            }}
            loading="lazy"
          />

          {/* Ouverte base */}
          <img
            src="/images/envelop_open1.png"
            alt="Enveloppe ouverte"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              zIndex: 1,
              transition: 'opacity 300ms ease',
              opacity: isOpen ? 1 : 0,
              pointerEvents: 'none',
            }}
            loading="lazy"
          />

          {/* ── Carte qui sort ── */}
          <div
            className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
            style={{
              bottom: '6%',
              width: '76%',
              height: '100%',
              clipPath: 'inset(0 0 0 0)',
              zIndex: 20,
            }}
          >
            <div
              style={{
                transition: 'transform 1600ms cubic-bezier(0.22,1,0.36,1)',
                transform: isOpen ? 'translateY(15%)' : 'translateY(85%)',
                willChange: 'transform',
              }}
            >
              <img
                src="/images/bg_5.png"
                alt="Contenu de l'enveloppe"
                className="w-full h-auto object-contain"
                style={{ marginBottom: '-30%' }}
                loading="lazy"
              />

              {/* Texte sur la carte */}
              <div
                className="absolute top-0 left-0 right-0 w-full h-full flex flex-col items-center gap-0.5"
                style={{ padding: 'clamp(12%, 16%, 20%) clamp(8px, 4%, 16px) 0' }}
              >
                <p className="text-olive font-bogue font-title capitalize"
                   style={{ fontSize: 'clamp(14px, 3.5vw, 24px)', paddingBottom: '0.25em' }}>
                  Le mariage de
                </p>
                <p className="text-olive font-script leading-tight"
                   style={{ fontSize: 'clamp(28px, 7vw, 56px)', margin: 0 }}>
                  Mairama
                </p>
                <p className="text-olive font-roundhand"
                   style={{ fontSize: 'clamp(20px, 5vw, 40px)', margin: '-0.2em 0' }}>
                  &amp;
                </p>
                <p className="text-olive font-script leading-tight"
                   style={{ fontSize: 'clamp(28px, 7vw, 56px)', margin: 0 }}>
                  Ousmanou
                </p>
                <p className="text-olive font-bogue font-semibold"
                   style={{ fontSize: 'clamp(16px, 4vw, 32px)', paddingTop: '0.3em' }}>
                  <time dateTime="2026-08-21">21 . 08 . 2026</time>
                </p>
              </div>
            </div>
          </div>

          {/* Rabat avant (overlay) */}
          <img
            src="/images/envelop-front.png"
            alt=""
            className="absolute inset-x-0 bottom-0 w-full h-auto object-contain pointer-events-none select-none"
            style={{
              zIndex: 30,
              maxHeight: '100%',
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 300ms ease',
            }}
            loading="lazy"
          />

          {/* ── Sceau ── */}
          <button
            onClick={handleOpen}
            disabled={!isIdle}
            className="absolute rounded-full flex items-center justify-center group transition-transform duration-300 focus:outline-none disabled:pointer-events-none"
            style={{
              // Fermée : centre / Ouverte : descend sur le rabat avant
              top:  isOpen ? '70%' : '55%',
              left: '49%',
              transform: 'translate(-50%, -50%)',
              width:  'clamp(72px, 20%, 120px)',
              height: 'clamp(72px, 20%, 120px)',
              zIndex: 40,
              transition: 'top 900ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Anneau pulsant */}
            {isIdle && (
              <div
                className="absolute inset-[-3px] rounded-full border border-olive/30 animate-ping opacity-45"
              />
            )}

            <img
              src="/images/sceau1.png"
              alt="Sceau de cire OM"
              className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </button>

        </div>

        {/* ── CTA texte ── */}
        <button
          onClick={handleOpen}
          disabled={!isIdle}
          className="font-bogue text-olive-dark tracking-[0.25em] uppercase hover:text-burgundy transition-all duration-300 flex flex-col items-center gap-1.5 group focus:outline-none disabled:opacity-0"
          style={{
            marginTop: 'clamp(10px, 3vw, 20px)',
            fontSize: 'clamp(10px, 2vw, 13px)',
            transition: 'opacity 400ms ease, color 300ms',
          }}
        >
          <span>Open Invitation</span>
          <span
            className="bg-olive-dark group-hover:bg-burgundy"
            style={{
              display: 'block',
              height: '1px',
              width: isIdle ? '2rem' : '0',
              transition: 'width 300ms ease, background-color 300ms',
            }}
          />
        </button>

      </div>
    </div>
  );
}