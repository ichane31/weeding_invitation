import { useState, useRef } from "react";
import Navigation from "./components/Navigation";
import InvitationCard from "./components/InvitationCard";
import OurStory from "./components/OurStory";
import RSVP from "./components/RSVP";
import Guestbook from "./components/Guestbook";
import GiftSection from "./components/GiftSection";
import Itinerary from "./components/Itinerary";
import ContactInfo from "./components/ContactInfo";
import EnvelopeHero from "./components/EnvelopeHero";

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("invitation");
  const [guestbookTrigger, setGuestbookTrigger] = useState(0);
  const [shouldAnimateCard, setShouldAnimateCard] = useState(false);

  const invitationCardRef = useRef(null);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);

    // Après 2 secondes, scroll et déclenche l'animation
    setTimeout(() => {
      if (invitationCardRef.current) {
        invitationCardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setShouldAnimateCard(true);
    }, 2000);
  };

  const handleResetEnvelope = () => {
    setIsEnvelopeOpen(false);
    setActiveTab("invitation");
    setShouldAnimateCard(false);
  };

  const handleRsvpSubmitted = () => {
    // Trigger Guestbook update
    setGuestbookTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col relative select-none">
    <Navigation activeTab={activeTab} setActiveTab={setActiveTab} resetEnvelope={handleResetEnvelope} />

    {/* Hero unique — fermé puis ouvert */}
    <EnvelopeHero onOpen={handleOpenEnvelope} />

    {/* Contenu principal */}
    {isEnvelopeOpen && (
      <div className="flex-grow flex flex-col animate-fade-in-up duration-1000"
        style={{ backgroundImage: "url(/images/bg_primary.jpg)" }}
      >
        <main className="flex-grow flex flex-col items-center justify-start pb-2 relative">
          <div ref={invitationCardRef} className="w-full">
            <InvitationCard animateCard={shouldAnimateCard} />
          </div>
          <OurStory />
          <Itinerary />
          <RSVP onResponseSubmitted={handleRsvpSubmitted} />
          <Guestbook refreshTrigger={guestbookTrigger} />
          <GiftSection />
          <ContactInfo />
        </main>

        <footer className="w-full py-6 text-center text-[10px] text-gray-400 font-sans tracking-widest uppercase border-t border-cream-dark/50 bg-[#fdfbf7]/40 relative z-20 mt-auto">
          <p>© 2026 Mariam & Ousmanou. Made with ♥</p>
        </footer>
      </div>
    )}
  </div>
  );
}
