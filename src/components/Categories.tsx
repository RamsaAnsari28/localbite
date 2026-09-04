import CategoryCard from "./CategoryCard";
import { categories } from "../data/categories";

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

function Categories({
  onCategorySelect,
}: CategoriesProps) {
  return (
   <section id="categories" className="fade-up px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
            Explore
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            What are you craving?
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              emoji={category.emoji}
              name={category.name}
              onClick={() => onCategorySelect(category.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;