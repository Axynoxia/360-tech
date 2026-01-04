import { useState, useEffect } from "react";
import { FiCheckCircle, FiAward } from "react-icons/fi";

const BASE = import.meta.env.BASE_URL;

const categoriesData = [
  {
    name: "Netflix",
    image: `${BASE}netflix.png`,
    subcategories: [
      "1 Profil dédié – 1 mois",
      "Basic – 1 mois",
      "Standard – 1 mois",
      "Premium – 1 mois",
    ],
  },
  {
    name: "ChatGPT",
    image: `${BASE}chatgpt.png`,
    subcategories: ["Compte individuel – 1 mois"],
  },
  {
    name: "Claude",
    image: `${BASE}claude.png`,
    subcategories: ["Compte individuel – 1 mois", "Compte partagé – 1 mois"],
  },
  {
    name: "Canva Pro",
    image: `${BASE}canva.png`,
    subcategories: ["Canva – Abonnement 1 an", "Abonnement 3 ans"],
  },
  {
    name: "Capcut Pro",
    image: `${BASE}capcut.png`,
    subcategories: ["Abonnement 1 mois", "Capcut – Abonnement 1 an"],
  },
  {
    name: "Carte Steam",
    image: `${BASE}steam.png`,
    subcategories: [
      "Carte 5 $",
      "Carte 10 $",
      "Carte 20 $",
      "Carte 50 $",
      "Carte 100 $",
    ],
  },
];

const allPackages = {
  "1 Profil dédié – 1 mois": {
    price: "15 DT",
    features: [
      "Code PIN : Profil verrouillé (usage exclusif)",
      "Qualité vidéo : Ultra HD 4K + HDR",
      "Écrans simultanés : 4 (1 seul utilisé)",
      "Téléchargements : jusqu’à 6 appareils",
      "Audio : son spatial disponible",
      "Idéal pour : 1 seul profil personnel dans un compte partagé",
    ],
  },
  "Basic – 1 mois": {
    price: "35 DT",
    features: [
      "Qualité vidéo : HD (720p)",
      "Écrans simultanés : 1",
      "Téléchargements : 1 appareil",
      "Publicités : Non",
      "Idéal pour : une personne seule, usage simple",
    ],
  },
  "Standard – 1 mois": {
    price: "50 DT",
    features: [
      "Qualité vidéo : Full HD (1080p)",
      "Écrans simultanés : 2",
      "Téléchargements : 2 appareils",
      "Publicités : Non",
      "Idéal pour : un couple ou une petite famille",
    ],
  },
  "Premium – 1 mois": {
    price: "55 DT",
    features: [
      "Qualité vidéo : Ultra HD 4K + HDR",
      "Écrans simultanés : 4",
      "Téléchargements : jusqu’à 6 appareils",
      "Audio : son spatial disponible",
      "Idéal pour : familles nombreuses ou partage entre amis",
    ],
  },
  "Compte individuel – 1 mois": {
    price: "25 DT",
    features: [
      "Accès : illimité, rapide, stable",
      "Compte avec votre mail personnel",
      "Accès complet à GPT, DALL-E, Humanize AI",
      "Idéal pour : usage sérieux ou professionnel",
    ],
  },
  "Compte partagé – 1 mois": {
    price: "30 DT",
    features: [
      "Accès : illimité, rapide, stable",
      "Accès complet à GPT, DALL-E, Humanize AI",
      "Compte partagé avec 3 personnes",
      "Utilisation simultanée possible, sans interruption",
    ],
  },
  // Claude packages (same as ChatGPT but with updated feature text)
  "Claude – Compte individuel – 1 mois": {
    price: "90 DT",
    features: [
      "Accès : illimité, rapide, stable",
      "Compte avec votre mail personnel",
      "Accès complet aux modèles avancés Claude",
      "Idéal pour : usage sérieux ou professionnel",
    ],
  },
  "Claude – Compte partagé – 1 mois": {
    price: "30 DT",
    features: [
      "Accès : illimité, rapide, stable",
      "Accès complet aux modèles avancés Claude",
      "Compte partagé avec 3 personnes",
      "Utilisation simultanée possible, sans interruption",
    ],
  },
  "Canva – Abonnement 1 an": {
    price: "15 DT",
    features: [
      "Accès complet à toutes les fonctionnalités",
      "1 To de stockage",
      "Suppression d’arrière‑plan",
      "Magic Resize, bibliothèque premium (100 M+ éléments)",
      "Outils IA inclus",
    ],
  },
  "Abonnement 3 ans": {
    price: "30 DT",
    features: [
      "1 To de stockage, suppression d’arrière‑plan",
      "Magic Resize, bibliothèque premium (100 M+ éléments)",
      "Outils IA inclus",
    ],
  },
  "Abonnement 1 mois": {
    price: "40 DT",
    features: [
      "Accès mobile, bureau et web",
      "Effets premium, transitions, IA",
      "Export 4K, stockage cloud, sans watermark",
    ],
  },
  "Capcut – Abonnement 1 an": {
    price: "250 DT",
    features: [
      "Accès sur mobile, bureau et web",
      "Compte avec votre mail personnel",
      "Effets premium, transitions, AI (suppression d'arrière‑plan, auto‑caption…)",
      "Export vidéo 4K, stockage cloud, pas de watermark",
    ],
  },
  "Carte 5 $": { price: "38 DT", features: ["Carte Steam 5 USD"] },
  "Carte 10 $": { price: "55 DT", features: ["Carte Steam 10 USD"] },
  "Carte 20 $": { price: "90 DT", features: ["Carte Steam 20 USD"] },
  "Carte 50 $": { price: "195 DT", features: ["Carte Steam 50 USD"] },
  "Carte 100 $": { price: "370 DT", features: ["Carte Steam 100 USD"] },
};

const CategoriesAndPackages = ({ setSelectedOffer }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categoriesData[0].name
  );
  const [selectedService, setSelectedService] = useState(
    categoriesData[0].subcategories[0]
  );

  useEffect(() => {
    setSelectedService(categoriesData[0].subcategories[0]);
  }, []);

  const handleCategoryClick = (catName) => {
    const category = categoriesData.find((c) => c.name === catName);
    setSelectedCategory(catName);
    setSelectedService(category.subcategories[0]);
  };

  // Helper to resolve the correct package key based on selected category/service
  const getPackageKey = (category, service) => {
    if (category === "Claude") {
      return `Claude – ${service}`;
    }
    if (category === "ChatGPT") {
      return service;
    }
    return service;
  };

  return (
    <div className="p-6 mx-auto text-white">
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {categoriesData.map((cat, idx) => (
          <div
            key={idx}
            className={`card w-72 h-44 cursor-pointer transition-all transform hover:scale-105 border-2 ${
              selectedCategory === cat.name
                ? "border-cyan-500 bg-gray-800 scale-105 shadow-lg shadow-cyan-500/20"
                : "border-gray-700 bg-gray-800 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
            }`}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className="card-body items-center justify-center text-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-16 w-16 mb-2 rounded-lg shadow-md"
              />
              <h3
                className={`card-title text-2xl font-semibold ${
                  selectedCategory === cat.name ? "text-cyan-400" : "text-white"
                }`}
              >
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8 p-8 bg-gray-800/70 rounded-box shadow-xl border border-gray-700 backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-cyan-400 mb-6">
            {selectedCategory} – Offres disponibles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData
              .find((cat) => cat.name === selectedCategory)
              ?.subcategories.map((sub, idx) => (
                <div
                  key={idx}
                  className={`card w-full h-32 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 ${
                    selectedService === sub
                      ? "border-cyan-500 bg-gray-700 scale-105 shadow-lg shadow-cyan-500/20"
                      : "border-gray-600 bg-gray-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
                  }`}
                  onClick={() => setSelectedService(sub)}
                >
                  <div className="card-body items-center justify-center text-center p-4">
                    <h4
                      className={`text-xl font-semibold ${
                        selectedService === sub ? "text-cyan-400" : "text-white"
                      }`}
                    >
                      {sub}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {selectedService && (
        <div className="p-6 max-w-6xl mx-auto mt-12">
          <h2 className="text-4xl font-bold mb-8 text-center text-cyan-400">
            {selectedService}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div className="card w-full max-w-sm shadow-2xl bg-gray-800/80 border-2 border-cyan-500/50 backdrop-blur-sm">
              <div className="card-body text-center">
                <h3 className="card-title text-xl font-bold mb-2 justify-center text-white flex items-center">
                  {selectedService}
                  <FiAward className="ml-2 text-cyan-400" size={24} />
                </h3>
                <div className="text-5xl font-extrabold mb-4 text-cyan-400">
                  {allPackages[getPackageKey(selectedCategory, selectedService)]?.price}
                </div>
                <div className="space-y-4 text-lg text-white">
                  {allPackages[getPackageKey(selectedCategory, selectedService)]?.features.map(
                    (feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-left leading-snug"
                      >
                        <FiCheckCircle
                          className="text-cyan-400 shrink-0"
                          size={20}
                        />
                        <span>{feature}</span>
                      </div>
                    )
                  )}
                </div>
                <button
                  className="mt-6 btn bg-cyan-600 hover:bg-cyan-500 border-none text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  onClick={() => {
                    const key = getPackageKey(selectedCategory, selectedService);
                    setSelectedOffer({
                      name: selectedService,
                      category: selectedCategory,
                      price: allPackages[key]?.price,
                      features: allPackages[key]?.features,
                    });
                    document
                      .getElementById("order-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Commander
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesAndPackages;
