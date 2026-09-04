import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VendorCard from "../components/VendorCard";
import type { Vendor } from "../types/vendor";
import { API_BASE_URL } from "../config/api";

function Favorites() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteIds: string[] = JSON.parse(
          localStorage.getItem("localbite-favorites") || "[]"
        );

        if (favoriteIds.length === 0) {
          setVendors([]);
          return;
        }

        const results = await Promise.all(
          favoriteIds.map(async (id) => {
            const response = await fetch(
              `${API_BASE_URL}/api/vendors/${id}`
              );

            if (!response.ok) {
              return null;
            }

            const data = await response.json();

            return {
              ...data,
              id: data._id,
            };
          })
        );

        setVendors(
          results.filter(
            (vendor): vendor is Vendor => vendor !== null
          )
        );
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <Link
            to="/"
            className="font-semibold text-orange-500"
          >
            ← Back to LocalBite
          </Link>

          <p className="mt-8 mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
            Your saved spots
          </p>

          <h1 className="text-4xl font-bold">
            ❤️ Favorites
          </h1>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading your favorites... 🍽️
          </div>
        ) : vendors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                distance={null}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center">
            <div className="text-5xl">💔</div>

            <h2 className="mt-4 text-2xl font-bold">
              No favorites yet
            </h2>

            <p className="mt-2 text-gray-500">
              Save your favorite food spots and they will appear here.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
            >
              Explore vendors
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}

export default Favorites;