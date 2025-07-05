import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const reasons = [
  "Friendship",
  "Relationship",
  "Time Pass",
  "Marriage",
  "Networking",
  "Just Curious"
];

export default function MockTest({ country, onComplete }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col items-center mt-16 animate__animated animate__fadeIn">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">{t("Why do you want to chat with girls?")}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onComplete();
          }}
        >
          {reasons.map((reason) => (
            <div key={reason} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selected === reason}
                  onChange={() => setSelected(reason)}
                  className="form-radio accent-pink-500"
                  required
                />
                <span className="ml-2">{t(reason)}</span>
              </label>
            </div>
          ))}
          <div className="mt-4 mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                required
              />
              <span className="ml-2">{t("I’m not a robot")}</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={!selected || !checked}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg mt-2 shadow-lg hover:bg-pink-700 transition font-semibold w-full"
          >
            {t("Start Chat")}
          </button>
        </form>
      </div>
    </div>
  );
}
