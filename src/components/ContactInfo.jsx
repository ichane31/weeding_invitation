export default function ContactInfo() {
  const CONTACTS = [
    { name: "Mairama", family: "Famille de la Mariée", phone: "+212600000001" },
    { name: "Ousmanou", family: "Famille du Marié", phone: "+212600000002" },
  ];

  return (
    <section
      className="relative w-full overflow-visible flex flex-col items-center py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      {/* Titre */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-olive-dark font-script text-center mb-6 sm:mb-8 md:mb-10 relative z-10">
        Contact
      </h2>

      {/* Conteneur des contacts */}
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 w-full max-w-5xl mx-auto">
        {CONTACTS.map((c, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Cœur dentelle */}
            <div className="relative w-[220px] sm:w-[260px] md:w-[280px] lg:w-[300px] transition-transform duration-300 hover:scale-105">
              {/* Image cœur */}
              <img
                src="/images/heart1.png"
                alt={`Contact ${c.name}`}
                className="w-full pointer-events-none"
                style={{
                  filter:
                    "drop-shadow(0 12px 24px rgba(0,0,0,0.20)) drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
                }}
                loading="lazy"
              />

              {/* Contenu centré sur l'image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 sm:gap-1 -mt-4 sm:-mt-5 md:-mt-6">
                {/* Nom */}
                <p className="text-3xl sm:text-4xl md:text-5xl leading-tight text-olive-dark font-script h-10 sm:h-12 md:h-14 flex items-center">
                  {c.name}
                </p>

                {/* Famille */}
                <p
                  className="text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] tracking-widest text-center text-olive px-2 sm:px-3 md:px-4 leading-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {c.family}
                </p>

                {/* Bouton WhatsApp */}
                <a
                  href={`https://wa.me/${c.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${c.name}`}
                  className="mt-0.5 sm:mt-1"
                >
                  <div
                    className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg"
                    style={{
                      background: "#25D366",
                      boxShadow: "0 4px 12px rgba(37,211,102,0.4)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
                      fill="white"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.371l-.36-.214-3.713.961.99-3.617-.236-.374A9.818 9.818 0 1 1 12 21.818z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}