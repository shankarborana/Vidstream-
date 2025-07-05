import React, { useEffect, useState } from "react";
import AnimatedLanding from "./components/AnimatedLanding";
import MockTest from "./components/MockTest";
import FakeLiveCount from "./components/FakeLiveCount";
import FakeProfilesSlider from "./components/FakeProfilesSlider";
import LanguageSelector from "./components/LanguageSelector";
import MusicPlayer from "./components/MusicPlayer";
import IncomingCallPopup from "./components/IncomingCallPopup";
import WebcamPreview from "./components/WebcamPreview";
import TrendingTags from "./components/TrendingTags";
import AdSlots from "./components/AdSlots";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import "./i18n"; // i18n setup

function App() {
  const [stage, setStage] = useState("landing"); // landing, mocktest, chat
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [callIncoming, setCallIncoming] = useState(false);

  useEffect(() => {
    if (stage === "chat") {
      const timer = setTimeout(() => setCallIncoming(true), 10000 + Math.random() * 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <AdSlots />
      <MusicPlayer />
      <LanguageSelector />
      <TrendingTags />
      <main className="flex-1">
        {stage === "landing" && (
          <>
            <AnimatedLanding
              onCountrySelect={country => {
                setSelectedCountry(country);
                setStage("mocktest");
              }}
            />
            <FakeLiveCount />
            <FakeProfilesSlider onCountrySelect={country => {
              setSelectedCountry(country);
              setStage("mocktest");
            }} />
          </>
        )}

        {stage === "mocktest" && (
          <MockTest
            country={selectedCountry}
            onComplete={() => setStage("chat")}
          />
        )}

        {stage === "chat" && (
          <div>
            <div className="flex flex-col items-center justify-center pt-8">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md mb-6 text-center">
                <span className="text-lg font-semibold">
                  Connecting to {selectedCountry} Girls...
                </span>
              </div>
              <div className="relative w-80 h-48 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-gray-400">[ Video Placeholder ]</span>
                <WebcamPreview />
              </div>
            </div>
            {callIncoming && (
              <IncomingCallPopup
                country={selectedCountry}
                onAccept={() => setCallIncoming(false)}
                onReject={() => setCallIncoming(false)}
              />
            )}
          </div>
        )}
      </main>
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
