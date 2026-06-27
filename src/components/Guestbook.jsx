import { useState, useEffect, useMemo } from "react";

export default function Guestbook({ refreshTrigger }) {
  const [messages, setMessages] = useState([]);

  // Mock messages to display initially - mémorisé pour éviter les re-créations
  const defaultMessages = useMemo(() => [
    {
      id: "default-1",
      name: "Sarah & Karim",
      attendance: "yes",
      message:
        "Toutes nos félicitations aux magnifiques mariés ! Que votre vie commune soit remplie de joie, d'amour et de paix divine. Nous avons tellement hâte d'être à vos côtés pour ce grand jour.",
      date: "08 Juin 2026",
    },
    {
      id: "default-2",
      name: "La Famille Bennani",
      attendance: "yes",
      message:
        "Quelle immense joie de vous voir franchir cette belle étape ! Que cette union soit éternelle et bénie. Beaucoup de bonheur et d'amour.",
      date: "07 Juin 2026",
    },
    {
      id: "default-3",
      name: "Amine & Yasmine",
      attendance: "yes",
      message:
        "Félicitations Mariam et Soufiane ! Que votre amour continue de briller et d'inspirer tous ceux qui vous entourent. Nous serons là pour faire la fête avec vous !",
      date: "05 Juin 2026",
    },
  ], []);

  // Fonction pour récupérer les messages - définie en dehors de l'effet
  const fetchMessages = () => {
    try {
      const localResponses = JSON.parse(
        localStorage.getItem("rsvp_responses") || "[]",
      );
      // Only display responses that have a message
      const customMessages = localResponses.filter(
        (resp) => resp.message && resp.message.trim() !== "",
      );

      // Combine custom and default messages
      return [...customMessages, ...defaultMessages];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return defaultMessages;
    }
  };

  // Effet pour charger les messages initialement et au refresh
  useEffect(() => {
    // Récupération immédiate des messages
    const loadedMessages = fetchMessages();
    setMessages(loadedMessages);
  }, [refreshTrigger]); // Dépendance correcte


  return (
    <div
      className="w-full select-none z-20 py-6 sm:py-8 md:py-10 lg:py-12 relative"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h3 className="font-script font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-olive-dark mb-1">
            Livre d'Or <span className="font-roundhand font-thin">&</span> Vœux
          </h3>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 font-sans tracking-widest uppercase">
            Les messages de nos invités
          </p>
          <div className="h-[1px] w-10 sm:w-12 md:w-14 bg-gold mx-auto mt-2 sm:mt-3"></div>
        </div>

        {messages.length === 0 ? (
          <p className="text-center text-xs sm:text-sm text-gray-500 italic py-8">
            Aucun message pour le moment.
          </p>
        ) : (
          <div className="space-y-3 sm:space-y-4 max-h-[380px] sm:max-h-[400px] md:max-h-[450px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-olive/20 scrollbar-track-transparent hover:scrollbar-thumb-olive/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#fdfbf7]/80 sm:bg-[#fdfbf7]/60 backdrop-blur-sm border border-cream-dark p-4 sm:p-5 rounded-lg shadow-sm relative overflow-hidden group hover:border-burgundy/20 hover:shadow-md transition-all duration-300"
              >
                {/* Gold corners */}
                <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-gold"></div>
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-gold"></div>
                <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-gold"></div>
                <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-gold"></div>

                {/* Message Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 sm:mb-2 gap-0.5 sm:gap-0">
                  <span className="font-title text-xs sm:text-sm text-burgundy font-semibold">
                    {msg.name}
                  </span>
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-400 font-sans">
                    {msg.date}
                  </span>
                </div>

                {/* Message Content */}
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed font-sans italic text-left">
                  "{msg.message}"
                </p>

                {/* Tiny check mark if present */}
                {msg.attendance === "yes" && (
                  <span className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-[6px] sm:text-[7px] md:text-[8px] text-olive font-semibold font-sans tracking-wider uppercase opacity-60">
                    ✦ Sera présent(e)
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Petit message de fin */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-[8px] sm:text-[9px] text-gray-400 font-sans tracking-widest uppercase">
            — Que l'amour soit toujours votre guide —
          </p>
        </div>
      </div>
    </div>
  );
}