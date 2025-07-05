import React, { useState, useEffect } from "react";
import { fakeProfiles } from "../constants/fakeProfiles";

export default function FakeProfilesSlider({ onCountrySelect }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % fakeProfiles.length), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-2">
      <div className="flex gap-4 overflow-x-auto">
        {fakeProfiles.slice(idx, idx + 6).map(profile => (
          <div
            key={profile.id}
            className="bg-gray-800 rounded-lg shadow-xl flex-shrink-0 w-44 p-2 flex flex-col items-center animate__animated animate__fadeIn"
          >
            <img src={profile.img} alt={profile.name} className="h-28 w-28 object-cover rounded-full mb-2" />
            <div className="font-semibold">{profile.name}</div>
            <div className="text-xs text-gray-400">{profile.country.flag} {profile.country.name}</div>
            <button
              className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm shadow"
              onClick={() => onCountrySelect(profile.country)}
            >
              Chat Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
