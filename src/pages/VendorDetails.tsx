import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Vendor } from "../types/vendor";
import { API_BASE_URL } from "../config/api";

function VendorDetails() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/vendors/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vendor");
        }

        const data = await response.json();

        setVendor({
          ...data,
          id: data._id,
        });
      } catch (error) {
        console.error("Error fetching vendor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVendor();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-5xl text-center">
          Loading vendor... 🍽️
        </div>
      </main>
    );
  }

  if (!vendor) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold">
            Vendor not found
          </h1>

          <Link
            to="/"
            className="mt-6 inline-block font-semibold text-orange-500"
          >
            ← Back to LocalBite
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back button */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          ← Back to LocalBite
        </Link>

        {/* Vendor hero */}
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">

          <div className="relative h-72 sm:h-96">

            <img
              src={vendor.image}
              alt={vendor.name}
              className="h-full w-full object-cover"
            />

            {/* Image gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

            {/* Status */}
            <div
              className={`absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-semibold text-white backdrop-blur-md ${
                vendor.isOpen
                  ? "bg-green-500/90"
                  : "bg-red-500/90"
              }`}
            >
              {vendor.isOpen ? "🟢 Open now" : "🔴 Closed"}
            </div>

            {/* Favorite */}
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm backdrop-blur-md transition-transform hover:scale-110"
            >
              ♡
            </button>

            {/* Vendor name */}
            <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-orange-200">
                Local food spot
              </p>

              <h1 className="text-3xl font-bold sm:text-5xl">
                {vendor.name}
              </h1>

              <p className="mt-2 text-base text-white/90 sm:text-lg">
                {vendor.cuisine}
              </p>
            </div>

          </div>

          {/* Vendor information */}
          <div className="p-6 sm:p-8">

            {/* Rating + cuisine */}
            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-orange-50 px-4 py-2 font-semibold text-orange-600">
                ⭐ {vendor.rating} rating
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                {vendor.cuisine}
              </span>

            </div>

            {/* Information cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm text-gray-500">
                  Price range
                </p>

                <p className="mt-2 text-lg font-bold text-gray-900">
                  {vendor.priceRange}
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm text-gray-500">
                  Current status
                </p>

                <p className="mt-2 text-lg font-bold text-gray-900">
                  {vendor.isOpen ? "🟢 Open now" : "🔴 Closed"}
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm text-gray-500">
                  Delivery
                </p>

                <p className="mt-2 text-lg font-bold text-gray-900">
                  {vendor.deliveryAvailable
                    ? "🛵 Available"
                    : "Not available"}
                </p>
              </div>

            </div>

            {/* About */}
            <div className="mt-10 border-t border-gray-100 pt-8">

              <h2 className="text-2xl font-bold text-gray-900">
                About this spot
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Discover delicious{" "}
                {vendor.cuisine.toLowerCase()} food from{" "}
                {vendor.name}. Check the current status,
                ratings, pricing and delivery availability
                before you visit.
              </p>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

export default VendorDetails;