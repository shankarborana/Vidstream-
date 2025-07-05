import React from "react";
import { useTranslation } from "react-i18next";

const langs = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="absolute top-4 right-4 z-20">
      <select
        className="bg-gray-800 text-white px-3 py-1 rounded shadow"
        value={i18n.language}
        onChange={e => i18n.changeLanguage(e.target.value)}
      >
        {langs.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
