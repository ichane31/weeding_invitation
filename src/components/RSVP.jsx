import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle2 } from "lucide-react";

export default function RSVP({ onResponseSubmitted }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendance: "yes", // 'yes' or 'no'
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
      // Create new response object
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

      // Retrieve existing responses from localStorage
      const existingResponses = JSON.parse(
        localStorage.getItem("rsvp_responses") || "[]",
      );
      existingResponses.unshift(newResponse); // Add to the top
      localStorage.setItem("rsvp_responses", JSON.stringify(existingResponses));

      // Trigger Confetti Celebrations if attending!
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
      className="relative flex flex-col items-center w-full pb-8"
      style={{
        backgroundImage: "url(/images/bg_primary.jpg)",
      }}
    >
      {/* Header */}
      <div className="max-w-[90%] flex flex-col items-center gap-2 pb-5">
        <h2 className="font-title text-4xl md:text-5xl xl:text-7xl text-olive-dark font-medium mb-1">
          RSVP
        </h2>
        <p className="text-xl text-olive font-title text-center">
          Votre présence à notre mariage nous ferait un immense honneur.
          <br />
          En raison de la capacité du lieu, nous avons réservé une place
          spécialement pour vous.
        </p>
      </div>

      <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-2 py-2">
        {/* Left */}
        <div className="relative w-full max-w-[500px] flex p-8 bg-white">
          {isSubmitted ? (
            <div className="text-center w-full py-8 flex flex-col items-center justify-center animate-fade-in-up">
              <CheckCircle2 className="w-16 h-16 text-olive mb-4 animate-bounce" />
              <h4 className="font-title text-2xl text-burgundy-dark font-semibold mb-2">
                Merci pour votre réponse !
              </h4>
              <div className="h-[1px] w-12 bg-gold mb-4"></div>
              <p className="text-sm text-gray-600 max-w-[280px]">
                {formData.attendance === "yes"
                  ? "Nous sommes impatients de célébrer ce moment magique avec vous !"
                  : "Nous vous remercions d'avoir pris le temps de nous répondre. Vos pensées nous touchent beaucoup."}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-xs text-olive font-title uppercase tracking-widest hover:text-burgundy transition-colors duration-300"
              >
                Modifier la réponse
              </button>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="space-y-4 text-left">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-title tracking-wider">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="M. et Mme. Dupont"
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded px-4 py-2.5 text-sm outline-none transition-all duration-300 shadow-inner"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-title tracking-wider">
                    Numéro de Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="06 12 34 56 78"
                    className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded px-4 py-2.5 text-sm outline-none transition-all duration-300 shadow-inner"
                  />
                </div>

                {/* Attendance Button Toggle */}
                <div className="space-y-2">
                  <label className="block text-sm font-title tracking-wider">
                    Serez-vous présent(e) ?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange("yes")}
                      className={`py-3 rounded font-title text-xs uppercase tracking-widest border transition-all duration-300 ${
                        formData.attendance === "yes"
                          ? "bg-burgundy text-cream border-burgundy shadow"
                          : "bg-transparent text-gray-500 border-cream-dark hover:border-burgundy hover:text-burgundy"
                      }`}
                    >
                      Oui, Présent(e)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange("no")}
                      className={`py-3 rounded font-title text-xs uppercase tracking-widest border transition-all duration-300 ${
                        formData.attendance === "no"
                          ? "bg-burgundy text-cream border-burgundy shadow"
                          : "bg-transparent text-gray-500 border-cream-dark hover:border-burgundy hover:text-burgundy"
                      }`}
                    >
                      Non, Absent(e)
                    </button>
                  </div>
                </div>

                {/* Companions Count (Only shown if attending) */}
                {formData.attendance === "yes" && (
                  <div className="animate-fade-in-up space-y-2">
                    <label className="block text-sm font-title tracking-wider">
                      Nombre de personnes (vous inclus)
                    </label>
                    <select
                      name="companions"
                      value={formData.companions}
                      onChange={handleChange}
                      className="w-full bg-[#fdfbf7] border border-cream-dark focus:border-burgundy rounded px-4 py-2.5 text-sm outline-none transition-all duration-300"
                    >
                      <option value="1">1 Personne</option>
                      <option value="2">2 Personnes</option>
                      <option value="3">3 Personnes</option>
                      <option value="4">4 Personnes</option>
                      <option value="5">5 Personnes</option>
                    </select>
                  </div>
                )}

                {/* Congratulations Message */}
                <div className="space-y-2">
                  <label className="block text-sm font-title tracking-wider">
                    Message pour les mariés
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Félicitations pour votre mariage..."
                    className="w-full bg-[#fdfbf7] border border-cream-dark rounded px-4 py-2.5 text-sm outline-none transition-all duration-300 shadow-inner resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-olive text-cream-light font-title text-sm tracking-widest py-2.5 rounded hover:bg-olive-dark transition-colors duration-300 flex items-center justify-center gap-2 shadow"
              >
                {loading ? (
                  <span>Validation en cours...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer la Réponse</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right */}
        <div className="relative w-full max-w-[320px] lg:mt-[5%] md:ml-[-9%] z-20">
          <div className="absolute w-[100%] -top-[40%] left-[28%] rotate-[-20deg] pointer-events-none flex items-center justify-center">
            <img
              src="/images/rose_primary.png"
              alt="Fleurs date"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute w-[100%] -top-[35%] left-[26%] rotate-[190deg] pointer-events-none flex items-center justify-center">
            <img
              src="/images/rose_primary.png"
              alt="Fleurs date"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute w-[90px] z-40 mt-[10%] left-[42%] rotate-[10deg]">
            <img
              src="/images/sceau1.png"
              alt="Fleurs date"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute w-[65%] aspect-[1.4] mt-[30%] left-[45%] rotate-[20deg] z-20 pointer-events-none flex items-center justify-center bg-cream py-3 px-2 md:px-3 ">
            <p className="text-sm font-title text-center leading-1">Afin de vous réserver le meilleur accueil, merci de nous contacter pour toute demande d'invité supplémentaire</p>
          </div>
        </div>
      </div>
    </div>
  );
}
