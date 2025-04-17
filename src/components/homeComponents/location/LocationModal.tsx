"use client";
import React from "react";

interface Props {
  onAllow: (position: GeolocationPosition) => void;
  onClose: () => void;
}

const LocationModal: React.FC<Props> = ({ onAllow, onClose }) => {
  const handleAllow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onAllow, () => {
        alert("Location access denied.");
        onClose();
      });
    } else {
      alert("Geolocation is not supported by your browser.");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm text-center space-y-4">
        <h2 className="text-xl font-semibold">Allow Location</h2>
        <p>We need your location to show restaurants near you.</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleAllow}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Allow
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;