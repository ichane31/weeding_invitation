import { useState, useEffect, useMemo } from "react";

export default function Guestbook({ refreshTrigger }) {
  const [messages, setMessages] = useState([]);

  const defaultMessages = useMemo(() => [
    {
      id: "default-1",
      name: "Sarah & Karim",
      attendance: "yes",
      message: "Toutes nos félicitations aux magnifiques mariés ! Que votre vie commune soit remplie de joie, d'amour et de paix divine. Nous avons tellement hâte d'être à vos côtés pour ce grand jour.",
      date: "08 Juin 2026",
    },
    {
      id: "default-2",
      name: "La Famille Bennani",
      attendance: "yes",
      message: "Quelle immense joie de vous voir franchir cette belle étape ! Que cette union soit éternelle et bénie. Beaucoup de bonheur et d'amour.",
      date: "07 Juin 2026",
    },
    {
      id: "default-3",
      name: "Amine & Yasmine",
      attendance: "yes",
      message: "Félicitations Mariam et Soufiane ! Que votre amour continue de briller et d'inspirer tous ceux qui vous entourent. Nous serons là pour faire la fête avec vous !",
      date: "05 Juin 2026",
    },
  ], []);

  const getMessages = (defaults) => {
    try {
      const localResponses = JSON.parse(localStorage.getItem("rsvp_responses") || "[]");
      const customMessages = localResponses.filter((r) => r.message && r.message.trim() !== "");
      return [...customMessages, ...defaults];
    } catch {
      return defaults;
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setMessages(getMessages(defaultMessages)), 0);
    return () => clearTimeout(t);
  }, [refreshTrigger]);

  return (
    <div
      className="w-full select-none z-20 relative"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
        // padding: "clamp(24px, 6vw, 56px) 0",
      }}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "clamp(280px, 88%, 560px)",
          padding: "clamp(16px, 4vw, 36px) clamp(12px, 4vw, 28px)",
        }}
      >
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "clamp(20px, 5vw, 44px)" }}>
          <h3
            className="font-script font-medium text-olive-dark"
            style={{ fontSize: "clamp(30px, 7vw, 64px)", marginBottom: "clamp(2px, 0.5vw, 6px)" }}
          >
            Livre d'Or <span className="font-roundhand font-thin">&</span> Vœux
          </h3>
          <p
            className="text-gray-400 font-sans tracking-widest uppercase"
            style={{ fontSize: "clamp(7px, 1.4vw, 10px)" }}
          >
            Les messages de nos invités
          </p>
          <div
            className="bg-gold mx-auto"
            style={{ height: "1px", width: "clamp(32px, 5vw, 56px)", marginTop: "clamp(6px, 1.5vw, 12px)" }}
          />
        </div>

        {/* Messages */}
        {messages.length === 0 ? (
          <p
            className="text-center text-gray-500 italic"
            style={{ fontSize: "clamp(11px, 2.2vw, 14px)", padding: "clamp(20px, 5vw, 36px) 0" }}
          >
            Aucun message pour le moment.
          </p>
        ) : (
          <div
            className="overflow-y-auto scrollbar-thin scrollbar-thumb-olive/20 scrollbar-track-transparent hover:scrollbar-thumb-olive/40"
            style={{
              maxHeight: "clamp(320px, 55vw, 480px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px, 2.5vw, 18px)",
              paddingRight: "clamp(2px, 0.5vw, 8px)",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#fdfbf7]/70 backdrop-blur-sm border border-cream-dark rounded-lg shadow-sm relative group hover:border-burgundy/20 hover:shadow-md transition-all duration-300"
                style={{ padding: "clamp(14px, 2.5vw, 20px)" }}
              >
                {/* Coins dorés */}
                {[
                  "top-1.5 left-1.5 border-t border-l",
                  "top-1.5 right-1.5 border-t border-r",
                  "bottom-1.5 left-1.5 border-b border-l",
                  "bottom-1.5 right-1.5 border-b border-r",
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-1.5 h-1.5 border-gold ${cls}`} />
                ))}

                {/* En-tête */}
                <div
                  className="flex items-start justify-between"
                  style={{ marginBottom: "clamp(4px, 1vw, 8px)", gap: "clamp(4px, 1vw, 8px)" }}
                >
                  <span
                    className="font-title text-burgundy font-semibold"
                    style={{ fontSize: "clamp(10px, 2.2vw, 14px)" }}
                  >
                    {msg.name}
                  </span>
                  <span
                    className="text-gray-400 font-sans shrink-0"
                    style={{ fontSize: "clamp(7px, 1.3vw, 9px)" }}
                  >
                    {msg.date}
                  </span>
                </div>

                {/* Message */}
                <p
                  className="text-gray-600 leading-relaxed font-sans italic text-left"
                  style={{ fontSize: "clamp(9px, 1.9vw, 13px)" }}
                >
                  "{msg.message}"
                </p>

                {/* Présence */}
                {msg.attendance === "yes" && (
                  <span
                    className="absolute bottom-2 right-2 text-olive font-semibold font-sans tracking-wider uppercase opacity-60"
                    style={{ fontSize: "clamp(6px, 1.2vw, 8px)" }}
                  >
                    ✦ Sera présent(e)
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Message de fin */}
        <div className="text-center" style={{ marginTop: "clamp(14px, 3vw, 28px)" }}>
          <p
            className="text-gray-400 font-sans tracking-widest uppercase"
            style={{ fontSize: "clamp(7px, 1.4vw, 9px)" }}
          >
            — Que l'amour soit toujours votre guide —
          </p>
        </div>
      </div>
    </div>
  );
}