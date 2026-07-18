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
import ProgressDots from "./components/ProgressDots";

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("invitation");
  const [guestbookTrigger, setGuestbookTrigger] = useState(0);
  const [shouldAnimateCard, setShouldAnimateCard] = useState(false);

  const invitationCardRef = useRef(null);
  const itineraryRef = useRef(null);
  const ourStoryRef = useRef(null);
  const rsvpRef = useRef(null);
  const guestbookRef = useRef(null);
  const giftRef = useRef(null);
  const contactRef = useRef(null);

  // Liste des sections pour les points de progression (ordre = ordre d'affichage)
  const sections = [
    { id: "invitation", label: "Invitation", ref: invitationCardRef },
    { id: "itinerary", label: "Itinéraire", ref: itineraryRef },
    { id: "story", label: "Notre histoire", ref: ourStoryRef },
    { id: "rsvp", label: "RSVP", ref: rsvpRef },
    { id: "guestbook", label: "Livre d'or", ref: guestbookRef },
    { id: "gift", label: "Cadeaux", ref: giftRef },
    { id: "contact", label: "Contact", ref: contactRef },
  ];

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
    }, 3300);
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
    <div className="min-h-screen flex flex-col relative select-none overflow-x-hidden">
    <Navigation activeTab={activeTab} setActiveTab={setActiveTab} resetEnvelope={handleResetEnvelope} />

    {/* Hero unique — fermé puis ouvert */}
    <EnvelopeHero onOpen={handleOpenEnvelope} />

    {/* Points de progression — visibles seulement une fois l'invitation ouverte */}
    <ProgressDots sections={sections} visible={isEnvelopeOpen} />

    {/* Contenu principal */}
    {isEnvelopeOpen && (
      <div className="flex-grow flex flex-col animate-fade-in-up duration-1000"
        style={{ backgroundImage: "url(/images/bg_primary.jpg)" }}
      >
        <main className="flex-grow flex flex-col items-center justify-start pb-2 relative">
          <div ref={invitationCardRef} id="invitation" className="w-full">
            <InvitationCard animateCard={shouldAnimateCard} />
          </div>
          <div ref={itineraryRef} id="itinerary" className="w-full">
            <Itinerary />
          </div>
          <div ref={ourStoryRef} id="story" className="w-full">
            <OurStory />
          </div>
          <div ref={rsvpRef} id="rsvp" className="w-full">
            <RSVP onResponseSubmitted={handleRsvpSubmitted} />
          </div>
          <div ref={guestbookRef} id="guestbook" className="w-full">
            <Guestbook refreshTrigger={guestbookTrigger} />
          </div>
          <div ref={giftRef} id="gift" className="w-full">
            <GiftSection />
          </div>
          <div ref={contactRef} id="contact" className="w-full">
            <ContactInfo />
          </div>
        </main>

        <footer className="w-full py-6 text-center text-[10px] text-black/90 font-sans tracking-widest uppercase border-t border-cream-dark/50 bg-[#fdfbf7]/40 relative z-20 mt-auto">
          <p>© 2026 Ousmanou & Mairama. Made with ♥</p>
        </footer>
      </div>
    )}
  </div>
  );
}