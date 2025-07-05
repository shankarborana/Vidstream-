import React from "react";

export default function IncomingCallPopup({ country, onAccept, onReject }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60 animate__animated animate__fadeIn">
      <div className="bg-gray-900 rounded-lg p-6 shadow-2xl text-center">
        <div className="text-2xl font-bold mb-2">Incoming call from a girl in {country.flag} {country.name}</div>
        <div className="flex justify-center gap-6 mt-4">
          <button
            className="bg-green-500 px-6 py-2 rounded-full font-semibold text-white shadow-lg hover:scale-110"
            onClick={onAccept}
          >
            ✅ Accept
          </button>
          <button
            className="bg-red-600 px-6 py-2 rounded-full font-semibold text-white shadow-lg hover:scale-110"
            onClick={onReject}
          >
            ❌ Reject
          </button>
        </div>
      </div>
    </div>
  );
}
