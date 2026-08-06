import { useState, useEffect, useMemo } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw9yPUp-p7RDtjItUIUkHL-9VZp_hw-t9ZKUMBJx41wK43N_rBNGweBZa6__6w6GWwy/exec";

// Create these components outside the Guestbook component
const LoadingState = () => (
  <p
    className="text-center text-gray-500 italic"
    style={{
      fontSize: "clamp(11px, 2.2vw, 14px)",
      padding: "clamp(20px, 5vw, 36px) 0",
    }}
  >
    Chargement des messages...
  </p>
);

const EmptyState = () => (
  <p
    className="text-center text-gray-500 italic"
    style={{
      fontSize: "clamp(11px, 2.2vw, 14px)",
      padding: "clamp(20px, 5vw, 36px) 0",
    }}
  >
    Aucun message pour le moment.
  </p>
);

const MessagesList = ({ messages }) => (
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
        {/* Message content */}
      </div>
    ))}
  </div>
);

export default function Guestbook({ refreshTrigger }) {
  const [messages, setMessages] = useState([]);
  const [loadedTrigger, setLoadedTrigger] = useState(null);

  const defaultMessages = useMemo(
    () => [
      {
        id: "default-1",
        name: "Amine & Yasmine",
        attendance: "yes",
        message:
          "Félicitations Maïrama et Ousmanou ! Que votre amour continue de briller et d'inspirer tous ceux qui vous entourent. Nous serons là pour faire la fête avec vous !",
        date: "2026-06-05",
      },
    ],
    [],
  );

  const loading = loadedTrigger !== refreshTrigger;

  useEffect(() => {
    let isCancelled = false;

    fetch(GOOGLE_SCRIPT_URL)
      .then((res) => res.json())
      .then((sheetMessages) => {
        if (isCancelled) return;
        const sorted = [...sheetMessages].reverse();
        setMessages([...sorted, ...defaultMessages]);
        setLoadedTrigger(refreshTrigger);
      })
      .catch((err) => {
        console.error("Erreur de chargement des messages :", err);
        if (!isCancelled) {
          setMessages(defaultMessages);
          setLoadedTrigger(refreshTrigger);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [refreshTrigger, defaultMessages]);

  return (
    <div
      className="hero-section w-full select-none z-20 relative"
      style={{ backgroundImage: "url(/images/bg_primary.jpg)" }}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "clamp(280px, 98%, 560px)",
          padding: "clamp(16px, 4vw, 36px) clamp(12px, 4vw, 20px)",
        }}
      >
        <div
          className="text-center"
          style={{ marginBottom: "clamp(20px, 5vw, 44px)" }}
        >
          <h3
            className="font-script font-medium text-olive-dark"
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              marginBottom: "clamp(2px, 0.5vw, 6px)",
            }}
          >
            Livre d'Or <span className="font-roundhand font-thin">&</span> Vœux
          </h3>
          <p
            className="text-black/90 font-sans tracking-widest uppercase"
            style={{ fontSize: "clamp(10px, 3vw, 14px)" }}
          >
            Les messages de nos invités
          </p>
          <div
            className="bg-gold mx-auto"
            style={{
              height: "1px",
              width: "clamp(32px, 5vw, 56px)",
              marginTop: "clamp(6px, 1.5vw, 12px)",
            }}
          />
        </div>

        {loading && <LoadingState />}
        {!loading && messages.length === 0 && <EmptyState />}
        {!loading && messages.length > 0 && (
          <MessagesList messages={messages} />
        )}

        <div
          className="text-center"
          style={{ marginTop: "clamp(14px, 3vw, 28px)" }}
        >
          <p
            className="text-black/90 font-sans tracking-widest uppercase"
            style={{ fontSize: "clamp(8.5px, 2.8vw, 11px)" }}
          >
            — Que l'amour soit toujours votre guide —
          </p>
        </div>
      </div>
    </div>
  );
}
