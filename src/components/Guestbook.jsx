import { useState, useEffect } from "react";

export default function Guestbook({ refreshTrigger }) {
  const [messages, setMessages] = useState([]);

  // Mock messages to display initially
  const defaultMessages = [
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
  ];

  const fetchMessages = () => {
    const localResponses = JSON.parse(
      localStorage.getItem("rsvp_responses") || "[]",
    );
    // Only display responses that have a message
    const customMessages = localResponses.filter(
      (resp) => resp.message && resp.message.trim() !== "",
    );

    // Combine custom and default messages
    setMessages([...customMessages, ...defaultMessages]);
  };

  useEffect(() => {
    fetchMessages();
  }, [refreshTrigger]);

  return (
    <div
      className="w-full select-none z-20 py-8 relative"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      <div className="w-full max-w-xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h3 className="font-script font-medium text-4xl md:text-5xl lg:text-6xl text-olive-dark mb-1">
            Livre d'Or <span className="font-roundhand font-thin">&</span> Vœux
          </h3>
          <p className="text-[10px] text-gray-400 font-sans tracking-widest uppercase">
            Les messages de nos invités
          </p>
          <div className="h-[1px] w-12 bg-gold mx-auto mt-3"></div>
        </div>

        {messages.length === 0 ? (
          <p className="text-center text-sm text-gray-500 italic">
            Aucun message pour le moment.
          </p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#fdfbf7]/60 backdrop-blur-sm border border-cream-dark p-5 rounded-lg shadow-sm relative overflow-hidden group hover:border-burgundy/20 transition-all duration-300"
              >
                {/* Gold corners */}
                <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-gold"></div>
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-gold"></div>
                <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-gold"></div>
                <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-gold"></div>

                {/* Message Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-title text-sm text-burgundy font-semibold">
                    {msg.name}
                  </span>
                  <span className="text-[9px] text-gray-400 font-sans">
                    {msg.date}
                  </span>
                </div>

                {/* Message Content */}
                <p className="text-xs text-gray-600 leading-relaxed font-sans italic text-left">
                  "{msg.message}"
                </p>

                {/* Tiny check mark if present */}
                {msg.attendance === "yes" && (
                  <span className="absolute bottom-2 right-2 text-[8px] text-olive font-semibold font-sans tracking-wider uppercase opacity-60">
                    Sera présent(e)
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
