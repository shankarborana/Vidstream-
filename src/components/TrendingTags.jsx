import React, { useEffect, useState } from "react";
import { countries } from "../constants/countries";

function randomCountries() {
  return countries
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(c => `${c.flag} ${c.name}`);
}

export default function TrendingTags() {
  const [list, setList] = useState(randomCountries());

  useEffect(() => {
    const interval = setInterval(() => setList(randomCountries()), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-center py-2 bg-gradient-to-r from-purple-900 to-gray-900 text-yellow-300 font-semibold tracking-wide animate__animated animate__fadeIn">
      🔥 Most Active Today: {list.join(", ")}
    </div>
  );
}
