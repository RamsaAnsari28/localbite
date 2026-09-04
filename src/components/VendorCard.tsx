import { useState } from "react";
import { Link } from "react-router-dom";
import type { Vendor } from "../types/vendor";

interface VendorCardProps {
  vendor: Vendor;
  distance: number | null;
}

function VendorCard({
  vendor,
  distance,
}: VendorCardProps)
{
  const [favoriteAnimation, setFavoriteAnimation] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
  const favorites = JSON.parse(
    localStorage.getItem("localbite-favorites") || "[]"
  );

  return favorites.includes(vendor.id);
});
const toggleFavorite = () => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem("localbite-favorites") || "[]"
  );

  if (favorites.includes(vendor.id)) {
    const updatedFavorites = favorites.filter(
      (id) => id !== vendor.id
    );

    localStorage.setItem(
      "localbite-favorites",
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(false);
  } else {
    favorites.push(vendor.id);

    localStorage.setItem(
      "localbite-favorites",
      JSON.stringify(favorites)
    );

    setIsFavorite(true);

setFavoriteAnimation(true);

setTimeout(() => {
  setFavoriteAnimation(false);
}, 300);
  }
};
  return (
  <Link to={`/vendors/${vendor.id}`}>
    <article className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0  bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* Open / Closed */}
        <div
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
            vendor.isOpen
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {vendor.isOpen ? "🟢 Open" : "🔴 Closed"}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite();
          }}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white ${
  favoriteAnimation ? "favorite-pop" : ""
}`}
        >
          {isFavorite ? "❤️" : "♡"}
        </button>

        {/* Delivery */}
        {vendor.deliveryAvailable && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            🛵 Delivery available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">
            <h3 className="truncate text-xl font-bold text-gray-900">
              {vendor.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {vendor.cuisine}
            </p>
          </div>

          {/* Rating */}
          <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">
            ⭐ {vendor.rating}
          </span>

        </div>

        {/* Bottom information */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">

          <span className="text-gray-500">
            📍{" "}
            {distance !== null
              ? `${distance.toFixed(1)} km away`
              : "Location unavailable"}
          </span>

          <span className="font-semibold text-gray-700">
            {vendor.priceRange}
          </span>

        </div>

      </div>
    </article>
  </Link>
);
}

export default VendorCard;