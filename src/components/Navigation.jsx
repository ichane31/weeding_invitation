import React from 'react';

export default function Navigation({ activeTab, setActiveTab, resetEnvelope }) {
  return (
    <nav className="sticky top-0 z-40 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-cream-dark px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
      {/* Brand logo (Names) */}
      <button 
        onClick={resetEnvelope}
        className="font-title text-base md:text-lg text-burgundy font-semibold tracking-wide hover:opacity-80 transition-opacity duration-300"
      >
        Omar & Mariam
      </button>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 md:gap-8 font-title text-xs md:text-sm tracking-wider uppercase text-olive-dark">
        <button 
          onClick={() => setActiveTab('invitation')}
          className={`relative py-1 hover:text-burgundy transition-colors duration-300 ${
            activeTab === 'invitation' ? 'text-burgundy font-medium' : ''
          }`}
        >
          <span>The Invitation</span>
          {activeTab === 'invitation' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-burgundy rounded-full animate-fade-in-up"></span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('gift')}
          className={`relative py-1 hover:text-burgundy transition-colors duration-300 ${
            activeTab === 'gift' ? 'text-burgundy font-medium' : ''
          }`}
        >
          <span>Gift</span>
          {activeTab === 'gift' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-burgundy rounded-full animate-fade-in-up"></span>
          )}
        </button>
      </div>
    </nav>
  );
}
