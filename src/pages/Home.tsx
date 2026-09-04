import { useState } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingVendors from "../components/TrendingVendors";
import LocationButton from "../components/LocationButton";
import MealExplorer from "../components/MealExplorer";

function Home() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [searchInput, setSearchInput] = useState("");
const [search, setSearch] = useState("");

const handleSearch = () => {
  setSearch(searchInput);
};
  const [category, setCategory] = useState("");

  const handleLocationFound = (
    latitude: number,
    longitude: number
  ) => {
    setUserLocation({
      latitude,
      longitude,
    });
  };

  return (
    <main>
      <Hero
  search={searchInput}
  onSearchChange={setSearchInput}
  onSearch={handleSearch}
/>

      <div className="flex justify-center">
        <LocationButton
          onLocationFound={handleLocationFound}
        />
      </div>

      <Categories
  onCategorySelect={setCategory}
/>

      <TrendingVendors
  userLocation={userLocation}
  search={search}
  category={category}
/>

      <MealExplorer />
    </main>
  );
}

export default Home;