import { useEffect, useState } from "react";
import type { Meal } from "../types/meal";

function MealExplorer() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
        );

        const data = await response.json();

        setMeals(data.meals ?? []);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <p className="py-10 text-center text-gray-500">
        Loading delicious food...
      </p>
    );
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-8 text-3xl font-bold">
          🍽️ Explore meals
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {meals.slice(0, 8).map((meal) => (
            <div
              key={meal.idMeal}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-bold">
                  {meal.strMeal}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MealExplorer;