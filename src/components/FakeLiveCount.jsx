import React, { useEffect, useState } from "react";
import { countries } from "../constants/countries";

function randomCounts() {
  let total = 0;
  const breakdown = countries.map((c) => {
    const count = Math.floor(Math.random() * 300) + 120;
    total += count;
    return { ...c, count };
  });
  return { total, breakdown };
}

export default function FakeLiveCount() {
  const [data, setData] = useState(randomCounts());

  useEffect(() => {
    const interval = setInterval(() => setData(randomCounts()), 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="text-2xl font-bold text-green-400 animate__animated animate__pulse">
        {data.total.toLocaleString()} Girls Live Now
      </div>
      <div className="flex flex-wrap justify-center mt-2 gap-x-4 text-sm">
        {data.breakdown.map((c) => (
          <span key={c.code} className="inline-flex items-center mr-2">
            <span className="mr-1">{c.flag}</span>
            <span>{c.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
