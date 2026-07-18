export default function ContactInfo() {
  const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/FknDOQ4jRCF0djfOqLhiP3";

  return (
    <section
      className="relative w-full overflow-visible flex flex-col items-center"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
        padding: "clamp(28px, 7vw, 60px) clamp(12px, 4vw, 32px)",
      }}
    >
      {/* Titre */}
      <h2
        className="text-olive-dark font-script text-center relative z-10"
        style={{
          fontSize: "clamp(36px, 7vw, 72px)",
          marginBottom: "clamp(12px, 3vw, 20px)",
        }}
      >
        Restons connectés
      </h2>

      <p
        className="text-olive-dark text-center relative z-10"
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(12px, 3vw, 16px)",
          letterSpacing: "0.06em",
          maxWidth: "clamp(240px, 70vw, 480px)",
          lineHeight: 1.6,
          marginBottom: "clamp(24px, 6vw, 48px)",
        }}
      >
        Rejoignez notre groupe WhatsApp pour recevoir toutes les informations
        du mariage et partager les photos du grand jour.
      </p>

      {/* Cœur central */}
      <div
        className="relative flex flex-col items-center transition-transform duration-300 hover:scale-102 z-10"
        style={{ width: "clamp(280px, 54vw, 380px)" }}
      >
        <img
          src="/images/heart1.png"
          alt="Groupe WhatsApp du mariage"
          className="w-full pointer-events-none"
          style={{
            filter:
              "drop-shadow(0 12px 24px rgba(0,0,0,0.20)) drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
          }}
          loading="lazy"
        />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ marginTop: "clamp(-20px, -5%, -12px)" }}
        >
          <p
            className="text-olive-dark font-script leading-tight"
            style={{
              fontSize: "clamp(25px, 5.6vw, 38px)",
              padding: "0 clamp(12px, 3%, 20px)",
              textAlign: "center",
            }}
          >
            Groupe du mariage
          </p>

          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rejoindre le groupe WhatsApp du mariage"
            style={{ marginTop: "clamp(8px, 2vw, 16px)" }}
          >
            <div
              className="flex items-center justify-center gap-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg"
              style={{
                padding: "clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)",
                background: "#25D366",
                boxShadow: "0 4px 12px rgba(37,211,102,0.4)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                style={{
                  width: "clamp(16px, 3.5vw, 22px)",
                  height: "clamp(16px, 3.5vw, 22px)",
                }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.371l-.36-.214-3.713.961.99-3.617-.236-.374A9.818 9.818 0 1 1 12 21.818z" />
              </svg>
              <span
                className="text-white font-semibold uppercase tracking-wide"
                style={{ fontSize: "clamp(10px, 2vw, 13px)" }}
              >
                Rejoindre
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}