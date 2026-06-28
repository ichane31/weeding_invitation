import { useState } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle2 } from "lucide-react";

export default function RSVP({ onResponseSubmitted }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendance: "yes",
    companions: 1,
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttendanceChange = (status) => {
    setFormData((prev) => ({ ...prev, attendance: status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const newResponse = {
        id: Date.now().toString(),
        name: formData.name,
        attendance: formData.attendance,
        companions: formData.attendance === "yes" ? parseInt(formData.companions) || 1 : 0,
        message: formData.message,
        date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      };

      const existingResponses = JSON.parse(localStorage.getItem("rsvp_responses") || "[]");
      existingResponses.unshift(newResponse);
      localStorage.setItem("rsvp_responses", JSON.stringify(existingResponses));

      if (formData.attendance === "yes") {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#800020", "#556b2f", "#d4af37"] });
      }

      setIsSubmitted(true);
      setLoading(false);
      if (onResponseSubmitted) onResponseSubmitted();
    }, 800);
  };

  return (
    <div
      className="relative flex flex-col items-center w-full overflow-visible"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
        paddingBottom: "clamp(20px, 6vw, 30px)",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col items-center text-center"
        style={{
          maxWidth: "clamp(280px, 88%, 720px)",
          gap: "clamp(6px, 1.5vw, 14px)",
          padding: "clamp(24px, 5vw, 48px) clamp(12px, 4vw, 32px) clamp(12px, 3vw, 28px)",
        }}
      >
        <h2
          className="font-title text-olive-dark font-medium"
          style={{ fontSize: "clamp(28px, 6vw, 64px)" }}
        >
          RSVP
        </h2>
        <p
          className="font-title text-olive text-center"
          style={{ fontSize: "clamp(11px, 2.2vw, 16px)", }}
        >
          Votre présence à notre mariage nous ferait un immense honneur.
          <br />
          En raison de la capacité du lieu, nous avons réservé une place spécialement pour vous.
        </p>
      </div>

      {/* Formulaire + déco */}
      <div
        className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center"
        style={{
          gap: "clamp(16px, 3vw, 24px)",
          padding: "clamp(8px, 2vw, 16px) clamp(12px, 4vw, 32px)",
        }}
      >
        {/* Carte formulaire */}
        <div
          className="relative w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl z-30"
          style={{
            maxWidth: "clamp(280px, 90vw, 500px)",
            padding: "clamp(20px, 5vw, 30px)",
          }}
        >
          {isSubmitted ? (
            <div className="text-center w-full flex flex-col items-center justify-center animate-fade-in-up"
              style={{ padding: "clamp(20px, 5vw, 40px) 0" }}
            >
              <CheckCircle2 style={{ width: "clamp(48px, 10vw, 64px)", height: "clamp(48px, 10vw, 64px)" }} className="text-olive animate-bounce" style2={{ marginBottom: "clamp(10px, 2vw, 18px)" }} />
              <h4
                className="font-title text-burgundy-dark font-semibold"
                style={{ fontSize: "clamp(16px, 3.5vw, 24px)", marginBottom: "clamp(6px, 1.5vw, 10px)" }}
              >
                Merci pour votre réponse !
              </h4>
              <div className="bg-gold" style={{ height: "1px", width: "clamp(32px, 6vw, 48px)", margin: "0 auto clamp(10px, 2vw, 18px)" }} />
              <p
                className="text-gray-600"
                style={{ fontSize: "clamp(10px, 2vw, 13px)", maxWidth: "280px" }}
              >
                {formData.attendance === "yes"
                  ? "Nous sommes impatients de célébrer ce moment magique avec vous !"
                  : "Nous vous remercions d'avoir pris le temps de nous répondre. Vos pensées nous touchent beaucoup."}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-title uppercase tracking-widest text-olive hover:text-burgundy transition-colors duration-300 border-b border-transparent hover:border-burgundy"
                style={{ fontSize: "clamp(9px, 1.8vw, 12px)", marginTop: "clamp(16px, 4vw, 28px)", paddingBottom: "2px" }}
              >
                Modifier la réponse
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full" style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 3vw, 24px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2.5vw, 20px)" }}>

                {/* Nom */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px, 1vw, 8px)" }}>
                  <label className="font-title tracking-wider text-olive-dark font-medium text-left"
                    style={{ fontSize: "clamp(10px, 2vw, 14px)" }}>
                    Nom Complet <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="M. et Mme. Dupont"
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg outline-none transition-all duration-300 shadow-inner focus:shadow-lg"
                    style={{ fontSize: "clamp(10px, 2vw, 14px)", padding: "clamp(8px, 1.5vw, 12px) clamp(10px, 2vw, 16px)" }}
                  />
                </div>

                {/* Téléphone */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px, 1vw, 8px)" }}>
                  <label className="font-title tracking-wider text-olive-dark font-medium text-left"
                    style={{ fontSize: "clamp(10px, 2vw, 14px)" }}>
                    Numéro de Téléphone <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    placeholder="06 12 34 56 78"
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg outline-none transition-all duration-300 shadow-inner focus:shadow-lg"
                    style={{ fontSize: "clamp(10px, 2vw, 14px)", padding: "clamp(8px, 1.5vw, 12px) clamp(10px, 2vw, 16px)" }}
                  />
                </div>

                {/* Présence */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px, 1vw, 8px)" }}>
                  <label className="font-title tracking-wider text-olive-dark font-medium text-left"
                    style={{ fontSize: "clamp(10px, 2vw, 14px)" }}>
                    Serez-vous présent(e) ?
                  </label>
                  <div className="grid grid-cols-2" style={{ gap: "clamp(6px, 1.5vw, 16px)" }}>
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleAttendanceChange(val)}
                        className={`rounded-lg font-title uppercase tracking-widest border transition-all duration-300 ${
                          formData.attendance === val
                            ? "bg-burgundy text-cream border-burgundy shadow-lg shadow-burgundy/20"
                            : "bg-transparent text-gray-500 border-cream-dark hover:border-burgundy hover:text-burgundy hover:bg-burgundy/5"
                        }`}
                        style={{ fontSize: "clamp(9px, 1.8vw, 12px)", padding: "clamp(8px, 1.5vw, 12px)" }}
                      >
                        {val === "yes" ? "Oui, Présent(e)" : "Non, Absent(e)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nombre */}
                {formData.attendance === "yes" && (
                  <div className="animate-fade-in-up" style={{ display: "flex", flexDirection: "column", gap: "clamp(4px, 1vw, 8px)" }}>
                    <label className="font-title tracking-wider text-olive-dark font-medium text-left"
                      style={{ fontSize: "clamp(10px, 2vw, 14px)" }}>
                      Nombre de personnes (vous inclus)
                    </label>
                    <select
                      name="companions" value={formData.companions} onChange={handleChange}
                      className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg outline-none transition-all duration-300 focus:shadow-lg"
                      style={{ fontSize: "clamp(10px, 2vw, 14px)", padding: "clamp(8px, 1.5vw, 12px) clamp(10px, 2vw, 16px)" }}
                    >
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Personne{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>
                )}

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px, 1vw, 8px)" }}>
                  <label className="font-title tracking-wider text-olive-dark font-medium text-left"
                    style={{ fontSize: "clamp(10px, 2vw, 14px)" }}>
                    Message pour les mariés
                  </label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} rows="3"
                    placeholder="Félicitations pour votre mariage..."
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg outline-none transition-all duration-300 shadow-inner resize-none focus:shadow-lg"
                    style={{ fontSize: "clamp(10px, 2vw, 14px)", padding: "clamp(8px, 1.5vw, 12px) clamp(10px, 2vw, 16px)" }}
                  />
                </div>
              </div>

              {/* Bouton submit */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-olive text-cream-light font-title tracking-widest rounded-lg hover:bg-olive-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-olive/20 hover:shadow-xl hover:shadow-olive/30 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ fontSize: "clamp(10px, 2vw, 14px)", padding: "clamp(10px, 2vw, 14px)" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Validation en cours...
                  </span>
                ) : (
                  <>
                    <Send style={{ width: "clamp(12px, 2vw, 16px)", height: "clamp(12px, 2vw, 16px)" }} />
                    <span>Envoyer la Réponse</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Déco droite */}
        <div
          className="relative z-30 lg:ml-[-5%]"
          style={{
            width: "clamp(200px, 60vw, 360px)",
            marginTop: "clamp(0px, 2vw, 0px)",
          }}
        >
          <div className="lg:mt-[32%]">
            <div
              className="relative w-full pointer-events-none lg:ml-rsvp-offset"
              style={{ height: "clamp(260px, 45vw, 360px)"}}
            >
              {/* Rose haut */}
              <div
                className="absolute lg:left-[20%] pointer-events-none flex items-center justify-center"
                style={{
                  width: "clamp(200px, 75%, 290px)",
                  top: "clamp(-16px, -4%, -8px)",
                  transform: "rotate(-20deg)",
                }}
              >
                <img src="/images/rose_primary.png" alt="" className="w-full h-full object-contain" loading="lazy" />
              </div>

              {/* Rose bas inversée */}
              <div
                className="absolute lg:left-[18%] pointer-events-none flex items-center justify-center"
                style={{
                  width: "clamp(200px, 75%, 290px)",
                  top: "clamp(10px, 4%, 20px)",
                  transform: "rotate(190deg)",
                }}
              >
                <img src="/images/rose_primary.png" alt="" className="w-full h-full object-contain" loading="lazy" />
              </div>

              {/* Sceau */}
              <div
                className="absolute z-40 left-[13%] lg:left-[33%]"
                style={{
                  width: "clamp(45px, 17%, 80px)",
                  top: "18%",
                  transform: "rotate(10deg)",
                }}
              >
                <img src="/images/sceau1.png" alt="Sceau" className="w-full h-full object-contain" loading="lazy" />
              </div>

              {/* Carte message */}
              <div
                className="absolute left-[15%] md:left-[15%] lg:left-[35%] flex items-center justify-center z-20 pointer-events-none bg-cream rounded-lg shadow-lg border border-olive/10"
                style={{
                  width: "clamp(120px, 44%, 200px)",
                  aspectRatio: "1.4",
                  top: "30%",
                  transform: "rotate(15deg)",
                  padding: "clamp(8px, 2vw, 16px)",
                }}
              >
                <p
                  className="font-title text-center leading-tight text-olive-dark"
                  style={{ fontSize: "clamp(9px, 1.2vw, 13px)" }}
                >
                  Afin de vous réserver le meilleur accueil, merci de nous contacter pour toute demande d'invité supplémentaire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}