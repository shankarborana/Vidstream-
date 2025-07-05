import React, { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded shadow-lg z-50">
      <div className="mb-2 font-bold">Install this app?</div>
      <button
        onClick={() => {
          deferredPrompt.prompt();
          setVisible(false);
        }}
        className="bg-pink-600 px-3 py-1 rounded font-semibold"
      >
        Add to Home Screen
      </button>
    </div>
  );
}
