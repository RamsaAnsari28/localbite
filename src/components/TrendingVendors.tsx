import { useEffect, useState } from "react";
import VendorCard from "./VendorCard";
import { calculateDistance } from "../utils/distance";
import type { Vendor } from "../types/vendor";
import { API_BASE_URL } from "../config/api";
import VendorCardSkeleton from "./VendorCardSkeleton";

interface TrendingVendorsProps {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  search: string;
  category: string;
}

function TrendingVendors({
  userLocation,
  search,
  category,
}: TrendingVendorsProps)  {
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<
  "recommended" | "rating" | "distance"
>("recommended");

  useEffect(() => {
    const fetchVendors = async () => {
     try {
  setLoading(true);
  setError("");

       const params = new URLSearchParams();

if (search) {
  params.append("search", search);
}

if (category) {
  params.append("cuisine", category);
}

const response = await fetch(
  `${API_BASE_URL}/api/vendors?${params.toString()}`
);


        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }

      const data = await response.json();

const formattedVendors: Vendor[] = data.map(
  (vendor: Vendor & { _id: string }) => ({
    ...vendor,
    id: vendor._id,
  })
);

setVendors(formattedVendors);

     } catch (error) {
  console.error("Error fetching vendors:", error);
  setError("Unable to load vendors. Please try again.");
} finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [search, category]);

  const nearbyVendors = vendors
    .map((vendor) => {
      const distance = userLocation
        ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            vendor.latitude,
            vendor.longitude
          )
        : null;

      return {
        vendor,
        distance,
      };
    })
    .filter(
      ({ distance }) =>
        distance === null || distance <= maxDistance
    )
    .sort((a, b) => {
  if (sortBy === "rating") {
    return b.vendor.rating - a.vendor.rating;
  }

  if (
    sortBy === "distance" &&
    a.distance !== null &&
    b.distance !== null
  ) {
    return a.distance - b.distance;
  }

  return 0;
});

  return (
   <section id="trending" className="fade-up px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
              Popular right now
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              🔥 Trending near you
            </h2>
          </div>

          <button className="hidden font-semibold text-orange-500 sm:block">
            View all →
          </button>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {[1, 3, 5, 10].map((distance) => (
            <button
              key={distance}
              onClick={() => setMaxDistance(distance)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                maxDistance === distance
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Within {distance} km
            </button>
          ))}
        </div>
        <div className="mb-8 flex items-center gap-3">
  <span className="text-sm font-semibold text-gray-600">
    Sort by:
  </span>

  {[
    { value: "recommended", label: "Recommended" },
    { value: "rating", label: "⭐ Highest rated" },
    { value: "distance", label: "📍 Nearest" },
  ].map((option) => (
    <button
      key={option.value}
      onClick={() =>
        setSortBy(
          option.value as
            | "recommended"
            | "rating"
            | "distance"
        )
      }
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        sortBy === option.value
          ? "bg-orange-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {option.label}
    </button>
  ))}
</div>

       {loading ? (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((item) => (
      <VendorCardSkeleton key={item} />
    ))}
  </div>
) : error ? (
  <div className="rounded-3xl border border-dashed border-red-300 py-16 text-center">
    <div className="text-4xl">😕</div>

    <h3 className="mt-4 text-xl font-bold">
      Something went wrong
    </h3>

    <p className="mt-2 text-gray-500">
      {error}
    </p>

    <button
      onClick={() => window.location.reload()}
      className="mt-6 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
    >
      Try again
    </button>
  </div>
) : nearbyVendors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyVendors.map(({ vendor, distance }) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                distance={distance}
              />
            ))}
          </div>
        ) : (
     <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
  <div className="text-5xl">
    {search ? "🔎" : "🍽️"}
  </div>

  <h3 className="mt-4 text-xl font-bold text-gray-900">
    {search
      ? `No results for "${search}"`
      : userLocation
        ? `No vendors found within ${maxDistance} km`
        : "No vendors found"}
  </h3>

  <p className="mx-auto mt-2 max-w-md text-gray-500">
    {search
      ? "We couldn't find any local food spots matching your search. Try another food, vendor or cuisine."
      : userLocation
        ? "Try increasing your search radius."
        : "Try searching for a food or vendor."}
  </p>

  {search && (
    <button
      onClick={() => window.location.hash = "discover"}
      className="mt-6 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
    >
      Try another search
    </button>
  )}
</div>
        )}

      </div>
    </section>
  );
}

export default TrendingVendors;