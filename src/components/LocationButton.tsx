import { useState } from "react";

interface LocationButtonProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

function LocationButton({ onLocationFound }: LocationButtonProps) {
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        onLocationFound(latitude, longitude);
        setLoading(false);
      },
      () => {
        setLoading(false);
        alert("Unable to get your location. Please allow location access.");
      }
    );
  };

  return (
    <button
      onClick={getLocation}
      disabled={loading}
      className="rounded-full border border-orange-200 bg-orange-50 px-5 py-3 font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-100 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "📍 Finding you..." : "📍 Use my location"}
    </button>
  );
}

export default LocationButton;