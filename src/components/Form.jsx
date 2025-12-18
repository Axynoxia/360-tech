import { useState, useEffect } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";

const Form = ({ selectedOffer }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lock body scroll when loading overlay is visible
  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [loading]);

  const paymentMethods = [
    "D17",
    "Mybiat",
    "UIB App",
    "Attijari Bank App",
    "Versement Bancaire",
    "Versement Postal",
    "Flouci",
  ];
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [subscriptionDuration, setSubscriptionDuration] = useState("1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new URLSearchParams({
      prenom: e.target.prenom.value,
      nom: e.target.nom.value,
      email: e.target.email.value,
      telephone: e.target.telephone.value,
      whatsapp: e.target.whatsapp.value,
      offre: selectedOffer?.name || "",
      categorie: selectedOffer?.category || "",
      prix: selectedOffer?.price || "",
      details: (selectedOffer?.features || []).join(", "),
      paiement: paymentMethod,
      duree: subscriptionDuration,
    });

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyqBB9FB7EGqPXgiYKgEla64Uz_QDuFQL8gBw9Yd2jr66DKL3C9C6vYJDPt_fiEzwkS/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 mx-auto text-center bg-gray-900 rounded-box shadow-2xl max-w-4xl">
        <FiCheckCircle className="text-6xl text-cyan-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2 text-white">Merci !</h2>
        <p className="text-xl mb-6 text-gray-300">
          Votre commande a été reçue. Nous vous contacterons bientôt avec les
          détails d’activation.
        </p>
        <button
          className="btn bg-cyan-600 hover:bg-cyan-500 border-none text-white shadow-lg hover:shadow-cyan-500/30 px-8 py-3 text-lg"
          onClick={() => setSubmitted(false)}
        >
          Passer une autre commande
        </button>
      </div>
    );
  }

  return (
    <form
      id="order-form"
      onSubmit={handleSubmit}
      className="p-10 max-w-4xl mx-auto bg-gray-800 rounded-box shadow-2xl border border-gray-700"
    >
      {loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
            <p className="text-white text-lg">Veuillez patienter...</p>
          </div>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
        Finalisez votre commande
      </h2>

      {selectedOffer && (
        <div className="mb-8 p-6 bg-gray-700 text-white rounded-box shadow-md border border-cyan-500">
          <h3 className="text-2xl font-bold text-cyan-400 mb-2">
            Offre sélectionnée : {selectedOffer.name}
          </h3>
          <p className="text-lg">Catégorie : {selectedOffer.category}</p>
          <p className="text-lg font-semibold mt-2">
            Prix : {selectedOffer.price}
          </p>
          <ul className="list-disc ml-6 mt-2 text-sm">
            {selectedOffer.features?.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg flex items-center text-gray-300">
              <FiUser className="mr-2 text-cyan-400" /> Prénom
            </span>
          </label>
          <input
            name="prenom"
            type="text"
            placeholder="Prénom"
            className="input input-bordered w-full text-lg bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg flex items-center text-gray-300">
              <FiUser className="mr-2 text-cyan-400" /> Nom
            </span>
          </label>
          <input
            name="nom"
            type="text"
            placeholder="Nom"
            className="input input-bordered w-full text-lg bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text text-lg flex items-center text-gray-300">
              <FiMail className="mr-2 text-cyan-400" /> Adresse e-mail de votre
              compte
            </span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="exemple@email.com"
            className="input input-bordered w-full text-lg bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text text-lg flex items-center text-gray-300">
              <FiPhone className="mr-2 text-cyan-400" /> Numéro de téléphone
            </span>
          </label>
          <input
            name="telephone"
            type="tel"
            placeholder="+216 XX XXX XXX"
            className="input input-bordered w-full text-lg bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text text-lg flex items-center text-gray-300">
              <FiPhone className="mr-2 text-cyan-400" /> Numéro WhatsApp
            </span>
          </label>
          <input
            name="whatsapp"
            type="tel"
            placeholder="+216 XX XXX XXX"
            className="input input-bordered w-full text-lg bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text text-lg flex items-center text-gray-300">
              <FiCalendar className="mr-2 text-cyan-400" /> Durée de
              l'abonnement
            </span>
          </label>
          <select
            value={subscriptionDuration}
            onChange={(e) => setSubscriptionDuration(e.target.value)}
            className="select select-bordered w-full text-lg bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500"
            required
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month} {month === 1 ? "mois" : "mois"}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text text-lg flex items-center text-gray-300">
              <FiCreditCard className="mr-2 text-cyan-400" /> Méthode de
              paiement
            </span>
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="select select-bordered w-full text-lg bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500"
            required
          >
            {paymentMethods.map((method, idx) => (
              <option key={idx} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          type="submit"
          disabled={loading}
          className="btn bg-cyan-600 hover:bg-cyan-500 border-none text-white shadow-lg hover:shadow-cyan-500/30 px-10 py-3 text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Envoi en cours..." : "Confirmer la commande"}
        </button>
      </div>
    </form>
  );
};

export default Form;
