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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttendanceChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      attendance: status,
    }));
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
        companions:
          formData.attendance === "yes"
            ? parseInt(formData.companions) || 1
            : 0,
        message: formData.message,
        date: new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };

      const existingResponses = JSON.parse(
        localStorage.getItem("rsvp_responses") || "[]"
      );
      existingResponses.unshift(newResponse);
      localStorage.setItem("rsvp_responses", JSON.stringify(existingResponses));

      if (formData.attendance === "yes") {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#800020", "#556b2f", "#d4af37"],
        });
      }

      setIsSubmitted(true);
      setLoading(false);

      if (onResponseSubmitted) {
        onResponseSubmitted();
      }
    }, 800);
  };

  return (
    <div
      className="relative flex flex-col items-center w-full pb-8 sm:pb-12 bg-cover bg-center bg-no-repeat overflow-visible"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      {/* Header */}
      <div className="max-w-[92%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] flex flex-col items-center gap-2 sm:gap-3 pb-4 sm:pb-5 md:pb-6 px-3 sm:px-4">
        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-olive-dark font-medium mb-1">
          RSVP
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-olive font-title text-center max-w-3xl">
          Votre présence à notre mariage nous ferait un immense honneur.
          <br className="hidden sm:block" />
          <span className="block sm:inline">
            En raison de la capacité du lieu, nous avons réservé une place
            spécialement pour vous.
          </span>
        </p>
      </div>

      <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-2 py-2 px-3 sm:px-4">
        {/* Left - Form Card */}
        <div className="relative w-full max-w-[90%] sm:max-w-xl lg:max-w-[500px] flex p-5 sm:p-7 md:p-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl z-30">
          {isSubmitted ? (
            <div className="text-center w-full py-6 sm:py-8 flex flex-col items-center justify-center animate-fade-in-up">
              <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-olive mb-3 sm:mb-4 animate-bounce" />
              <h4 className="font-title text-xl sm:text-2xl text-burgundy-dark font-semibold mb-2">
                Merci pour votre réponse !
              </h4>
              <div className="h-[1px] w-10 sm:w-12 bg-gold mb-3 sm:mb-4"></div>
              <p className="text-xs sm:text-sm text-gray-600 max-w-[280px] px-2">
                {formData.attendance === "yes"
                  ? "Nous sommes impatients de célébrer ce moment magique avec vous !"
                  : "Nous vous remercions d'avoir pris le temps de nous répondre. Vos pensées nous touchent beaucoup."}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-5 sm:mt-6 text-[10px] sm:text-xs text-olive font-title uppercase tracking-widest hover:text-burgundy transition-colors duration-300 border-b border-transparent hover:border-burgundy pb-1"
              >
                Modifier la réponse
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4.5 sm:space-y-5 md:space-y-6 w-full">
              <div className="space-y-3 sm:space-y-4 text-left">
                {/* Full Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-title tracking-wider text-olive-dark font-medium">
                    Nom Complet <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="M. et Mme. Dupont"
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none transition-all duration-300 shadow-inner focus:shadow-lg"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-title tracking-wider text-olive-dark font-medium">
                    Numéro de Téléphone <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="06 12 34 56 78"
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none transition-all duration-300 shadow-inner focus:shadow-lg"
                  />
                </div>

                {/* Attendance Button Toggle */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-title tracking-wider text-olive-dark font-medium">
                    Serez-vous présent(e) ?
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange("yes")}
                      className={`py-2.5 sm:py-3 rounded-lg font-title text-[10px] sm:text-xs uppercase tracking-widest border transition-all duration-300 ${
                        formData.attendance === "yes"
                          ? "bg-burgundy text-cream border-burgundy shadow-lg shadow-burgundy/20"
                          : "bg-transparent text-gray-500 border-cream-dark hover:border-burgundy hover:text-burgundy hover:bg-burgundy/5"
                      }`}
                    >
                      Oui, Présent(e)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange("no")}
                      className={`py-2.5 sm:py-3 rounded-lg font-title text-[10px] sm:text-xs uppercase tracking-widest border transition-all duration-300 ${
                        formData.attendance === "no"
                          ? "bg-burgundy text-cream border-burgundy shadow-lg shadow-burgundy/20"
                          : "bg-transparent text-gray-500 border-cream-dark hover:border-burgundy hover:text-burgundy hover:bg-burgundy/5"
                      }`}
                    >
                      Non, Absent(e)
                    </button>
                  </div>
                </div>

                {/* Companions Count */}
                {formData.attendance === "yes" && (
                  <div className="animate-fade-in-up space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-title tracking-wider text-olive-dark font-medium">
                      Nombre de personnes (vous inclus)
                    </label>
                    <select
                      name="companions"
                      value={formData.companions}
                      onChange={handleChange}
                      className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none transition-all duration-300 focus:shadow-lg"
                    >
                      <option value="1">1 Personne</option>
                      <option value="2">2 Personnes</option>
                      <option value="3">3 Personnes</option>
                      <option value="4">4 Personnes</option>
                      <option value="5">5 Personnes</option>
                    </select>
                  </div>
                )}

                {/* Message */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-title tracking-wider text-olive-dark font-medium">
                    Message pour les mariés
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Félicitations pour votre mariage..."
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none transition-all duration-300 shadow-inner resize-none focus:shadow-lg"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-olive text-cream-light font-title text-xs sm:text-sm tracking-widest py-2.5 sm:py-3 rounded-lg hover:bg-olive-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-olive/20 hover:shadow-xl hover:shadow-olive/30 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
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
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Envoyer la Réponse</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right - Decorative Side - MAINTENANT VISIBLE SUR TOUS LES ÉCRANS */}
        <div className="relative w-full max-w-[400px] sm:max-w-[380px] md:max-w-[370px] lg:max-w-[320px] lg:mt-[5%] md:ml-[-9%] z-30 mt-2 sm:mt-0">
          {/* Conteneur avec hauteur fixe pour garantir la visibilité sur mobile */}
          <div className="relative w-full h-[370px] md:h-[350px] lg:h-[300px]">
            
            {/* Roses décoratives - adaptées pour mobile */}
            <div className="absolute w-[80%] sm:w-[70%] md:w-[80%] lg:w-[100%] -top-[2%] sm:-top-[5%] md:-top-[10%] lg:top-[3%] left-[20%] sm:left-[25%] md:left-[28%] lg:left-[20%] rotate-[-20deg] pointer-events-none flex items-center justify-center">
              <img
                src="/images/rose_primary.png"
                alt="Décoration florale"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="absolute w-[80%] sm:w-[70%] md:w-[80%] lg:w-[100%] -top-[0%] sm:-top-[0%] md:-top-[5%] lg:-top-[2%] left-[18%] sm:left-[22%] md:left-[26%] lg:left-[18%] rotate-[190deg] pointer-events-none flex items-center justify-center">
              <img
                src="/images/rose_primary.png"
                alt="Décoration florale"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Sceau - adapté pour mobile */}
            <div className="absolute w-[60px] sm:w-[65px] md:w-[75px] lg:w-[90px] z-40 top-[18%] sm:top-[17%] md:top-[10%] lg:top-[18%] left-[33%] sm:left-[35%] md:left-[42%] rotate-[10deg]">
              <img
                src="/images/sceau1.png"
                alt="Sceau"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Message Card - adapté pour mobile */}
            <div className="absolute flex items-center justify-center w-[45%] sm:w-[50%] md:w-[58%] lg:w-[67%] aspect-[1.4] top-[30%] sm:top-[28%] md:top-[25%] lg:top-[42%] left-[35%] sm:left-[35%] md:left-[40%] lg:left-[40%] rotate-[12deg] md:rotate-[15deg] lg:rotate-[20deg] z-20 pointer-events-none bg-cream py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 rounded-lg shadow-lg border border-olive/10">
              <p className="text-[11px] sm:text-xs md:text-[13px] lg:text-sm font-title text-center leading-tight text-olive-dark">
                Afin de vous réserver le meilleur accueil, merci de nous contacter pour toute demande d'invité supplémentaire
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}