import React, { useEffect } from "react";

export default function AdSlots() {
  useEffect(() => {
    // Example: inject ad scripts to hidden iframes
    // Insert your affiliate/ad script URLs below
    const topAd = document.createElement("iframe");
    topAd.style.display = "none";
    topAd.src = "https://your-adnetwork.com/top-ad";
    topAd.title = "ad-top";
    document.body.appendChild(topAd);

    const bottomAd = document.createElement("iframe");
    bottomAd.style.position = "absolute";
    bottomAd.style.left = "-9999px";
    bottomAd.src = "https://your-adnetwork.com/bottom-ad";
    bottomAd.title = "ad-bottom";
    document.body.appendChild(bottomAd);

    return () => {
      document.body.removeChild(topAd);
      document.body.removeChild(bottomAd);
    };
  }, []);

  return null;
}
