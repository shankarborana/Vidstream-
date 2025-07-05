import React, { useRef, useEffect } from "react";

export default function WebcamPreview() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(() => {});
    }
  }, []);

  return (
    <video ref={videoRef} className="absolute right-2 bottom-2 h-20 w-20 rounded-full border-2 border-pink-500" autoPlay muted />
  );
}
