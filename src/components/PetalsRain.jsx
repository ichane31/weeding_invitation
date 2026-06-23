import React, { useEffect, useState } from 'react';

export default function PetalsRain() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate static list of elements with randomized parameters
    const items = [];
    
    // Spawning 30 rose petals
    for (let i = 0; i < 30; i++) {
      items.push({
        id: `petal-${i}`,
        type: 'petal',
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${8 + Math.random() * 12}s`,
        size: `${12 + Math.random() * 16}px`,
        opacity: 0.4 + Math.random() * 0.5,
        color: ['#6B1D2F', '#800020', '#A23E48', '#C70039'][Math.floor(Math.random() * 4)],
        horizontalMovement: `${-30 + Math.random() * 60}px`
      });
    }

    // Spawning 5 floating butterflies
    for (let i = 0; i < 5; i++) {
      items.push({
        id: `butterfly-${i}`,
        type: 'butterfly',
        left: `${Math.random() * 90}%`,
        top: `${30 + Math.random() * 60}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${15 + Math.random() * 15}s`,
        size: `${15 + Math.random() * 10}px`,
        opacity: 0.6 + Math.random() * 0.3
      });
    }

    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* CSS Keyframes injected directly */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes butterflyFloat {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(100px, -80px) scale(0.9) rotate(15deg);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(200px, -150px) scale(0.8) rotate(-10deg);
            opacity: 0;
          }
        }
        .animate-petal {
          animation: fall linear infinite;
        }
        .animate-butterfly {
          animation: butterflyFloat ease-in-out infinite;
        }
      `}} />

      {elements.map((el) => {
        if (el.type === 'petal') {
          return (
            <div
              key={el.id}
              className="absolute animate-petal"
              style={{
                left: el.left,
                top: '-20px',
                width: el.size,
                height: el.size,
                animationDelay: el.delay,
                animationDuration: el.duration,
                opacity: el.opacity,
              }}
            >
              {/* Petal SVG shape */}
              <svg viewBox="0 0 100 100" fill={el.color} className="w-full h-full">
                <path d="M50 0 C20 30 0 60 0 80 C0 95 20 100 50 100 C80 100 100 95 100 80 C100 60 80 30 50 0 Z" />
              </svg>
            </div>
          );
        } else {
          return (
            <div
              key={el.id}
              className="absolute animate-butterfly"
              style={{
                left: el.left,
                top: el.top,
                width: el.size,
                height: el.size,
                animationDelay: el.delay,
                animationDuration: el.duration,
                opacity: el.opacity,
              }}
            >
              {/* Butterfly SVG shape */}
              <svg viewBox="0 0 100 100" fill="#a23e48" className="w-full h-full animate-pulse">
                <path d="M 50 50 C 35 15, 5 20, 20 45 C 5 60, 30 75, 48 55 C 52 55, 75 70, 80 45 C 95 20, 65 15, 50 50 Z" />
              </svg>
            </div>
          );
        }
      })}
    </div>
  );
}
