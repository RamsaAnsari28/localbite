interface CategoryCardProps {
  emoji: string;
  name: string;
  onClick: () => void;
}

function CategoryCard({
  emoji,
  name,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex min-w-32 flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
    >
      <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
        {emoji}
      </span>

      <span className="font-medium text-gray-800">
        {name}
      </span>
    </button>
  );
}

export default CategoryCard;