import { useState, useRef } from "react";
import Navigation from "./components/Navigation";
import EnvelopeCover from "./components/EnvelopeCover";
import InvitationCard from "./components/InvitationCard";
import Countdown from "./components/Countdown";
import OurStory from "./components/OurStory";
import RSVP from "./components/RSVP";
import Guestbook from "./components/Guestbook";
import GiftSection from "./components/GiftSection";
import PetalsRain from "./components/PetalsRain";
import EnvelopeCoverOpen from "./components/EnvelopeCoverOpen";
import Itinerary from "./components/Itinerary";
import ContactInfo from "./components/ContactInfo";

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("invitation");
  const [guestbookTrigger, setGuestbookTrigger] = useState(0);
  const [shouldAnimateCard, setShouldAnimateCard] = useState(false);

  const invitationCardRef = useRef(null);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Start music on user interaction
    setIsPlaying(true);

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
    setIsPlaying(false);
    setActiveTab("invitation");
    setShouldAnimateCard(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      setIsPlaying(true);
    }
  };

  const handleRsvpSubmitted = () => {
    // Trigger Guestbook update
    setGuestbookTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col relative select-none">
      {/* Sticky Navigation Header - Visible all the time */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        resetEnvelope={handleResetEnvelope}
      />

      {/* 1. Closed Envelope Cover (Overlay screen) */}
      {!isEnvelopeOpen && <EnvelopeCover onOpen={handleOpenEnvelope} />}

      {/* 2. Main Site content once opened */}
      {isEnvelopeOpen && (
        <div
          className="flex-grow flex flex-col animate-fade-in-up duration-1000"
          style={{
            backgroundImage: "url(/images/bg_primary.jpg)",
          }}
        >
          {/* Falling Rose Petals and Butterflies background effects */}
          <PetalsRain />

          <EnvelopeCoverOpen open={isEnvelopeOpen} />

          {/* Tab content viewports */}
          <main className="flex-grow flex flex-col items-center justify-start pb-2 relative">
            {activeTab === "invitation" && (
              /* Invitation View */
              <div className="w-full flex flex-col items-center">
                {/* 1. Main Invitation Card & Date Card */}
                <div ref={invitationCardRef} className="w-full">
                  <InvitationCard animateCard={shouldAnimateCard} />
                </div>

                {/* 3. Program Agenda & Calendar Links */}
                <OurStory />

                {/* Itinerary */}
                <Itinerary />

                {/* 4. RSVP Attendance Form */}
                <RSVP onResponseSubmitted={handleRsvpSubmitted} />

                {/* 5. Guestbook wishes list */}
                <Guestbook refreshTrigger={guestbookTrigger} />

                {/* Gift */}
                <GiftSection />

                {/* Contact Info */}
                <ContactInfo />
              </div>
            )}
          </main>

          {/* Elegant Footer */}
          <footer className="w-full py-6 text-center text-[10px] text-gray-400 font-sans tracking-widest uppercase border-t border-cream-dark/50 bg-[#fdfbf7]/40 relative z-20 mt-auto">
            <p>© 2026 Mariam & Soufiane. Made with ♥</p>
          </footer>
        </div>
      )}
    </div>
  );
}
