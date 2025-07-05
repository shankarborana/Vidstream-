import React, { useRef, useState } from "react";
import bgMusic from "../../public/assets/music.mp3";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.muted = false;
        audioRef.current.play();
      } else {
        audioRef.current.muted = true;
        audioRef.current.pause();
      }
      setMuted(!muted);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-20 flex items-center gap-2">
      <button
        onClick={toggle}
        className="bg-gray-800 text-white px-3 py-1 rounded shadow hover:bg-pink-500"
      >
        {muted ? "🔇 Sound Off" : "🎵 Sound On"}
      </button>
      <audio ref={audioRef} src={bgMusic} loop autoPlay muted />
    </div>
  );
}
