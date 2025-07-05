import React from "react";
import { countries } from "../constants/countries";
import { useTranslation } from "react-i18next";
import "animate.css";

export default function AnimatedLanding({ onCountrySelect }) {
  const { t } = useTranslation();

  return (
    <section className="animate__animated animate__fadeIn pt-10 pb-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-black mb-4 text-pink-400 animate__animated animate__pulse animate__infinite">
        {t("Global Video Dating")}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {countries.map((country) => (
          <div key={country.code} className="flex flex-col items-center animate__animated animate__zoomIn">
            <span className="text-2xl">{country.flag}</span>
            <button
              className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition text-lg font-semibold"
              onClick={() => onCountrySelect(country)}
            >
              {t("Chat with")} {country.name} {t("Girls")}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
