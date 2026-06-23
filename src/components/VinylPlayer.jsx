import React, { useRef, useEffect, useState } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';

export default function VinylPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(true);

  // Default romantic wedding piano music from Mixkit
  const musicUrl = "https://assets.mixkit.co/music/preview/mixkit-wedding-piano-1224.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Autoplay blocked by browser. User interaction required:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowTooltip(false);
  };

  return (
    <div className="fixed left-4 bottom-24 md:bottom-8 z-30 flex items-center gap-3">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={musicUrl} loop />

      {/* Floating Vinyl Record Button */}
      <button 
        onClick={togglePlay}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#121212] flex items-center justify-center shadow-lg border-2 border-cream focus:outline-none focus:ring-2 focus:ring-burgundy active:scale-95 transition-transform duration-200"
      >
        {/* Vinyl Grooves (Vinyl texture using CSS radial gradient) */}
        <div 
          className={`absolute inset-1 rounded-full border border-neutral-800 flex items-center justify-center ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
          style={{
            backgroundImage: 'repeating-radial-gradient(circle, #222, #111 2px, #222 4px)'
          }}
        >
          {/* Record Center Sticker */}
          <div className="w-5 h-5 rounded-full bg-cream-light border border-gold flex items-center justify-center">
            {/* Tiny center spindle hole */}
            <div className="w-1 h-1 rounded-full bg-[#121212]"></div>
          </div>
        </div>

        {/* Small Speaker Icon overlay */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center shadow border border-cream-light">
          {isPlaying ? (
            <Volume2 className="w-3 h-3 animate-bounce" />
          ) : (
            <VolumeX className="w-3 h-3" />
          )}
        </div>
      </button>

      {/* "click to play music" Tooltip */}
      {showTooltip && (
        <div 
          onClick={togglePlay}
          className="bg-[#121212]/80 backdrop-blur-sm text-cream-light text-[10px] md:text-xs font-title tracking-wider px-3 py-1.5 rounded-lg border border-cream/20 shadow-md animate-bounce cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
        >
          <Music className="w-3 h-3 text-gold" />
          <span>Click to play music</span>
        </div>
      )}

      {/* Animated Music Notes Floating when playing */}
      {isPlaying && (
        <div className="absolute top-[-20px] left-[20px] pointer-events-none flex gap-1">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes noteFloat {
              0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
              50% { opacity: 0.8; }
              100% { transform: translateY(-30px) scale(1.1) rotate(15deg); opacity: 0; }
            }
            .note-anim-1 { animation: noteFloat 2s ease-in-out infinite; }
            .note-anim-2 { animation: noteFloat 2s ease-in-out infinite 0.7s; }
          `}} />
          <span className="note-anim-1 text-burgundy text-xs">♪</span>
          <span className="note-anim-2 text-olive text-sm">♫</span>
        </div>
      )}
    </div>
  );
}
