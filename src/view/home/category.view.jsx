import { useAllCategories } from "@/hooks/categories/useAllCategories.hooks";
import { renderIcon } from "@/utils/icons.utils";

export default function CategoryView() {
  const { categories, loading } = useAllCategories();

  if (loading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 rounded-2xl px-6 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Kategori Resep
        </h1>
        <p className="text-gray-500 mt-2 dark:text-orange-200">
          Pilih kategori favorit kamu
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 cursor-pointer group"
          >
            {/* Icon / Placeholder */}
            <div className="w-12 h-12 mb-4 rounded-xl bg-orange-100 text-orange-500 dark:bg-neutral-950 flex items-center justify-center text-xl group-hover:scale-110 transition">
              {renderIcon("UtensilsCrossed", { className: "w-5 h-5" })}
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-orange-500 transition">
              {item.name}
            </h2>

            {/*  desc */}
            <p className="text-sm text-gray-500 mt-1 dark:group-hover:text-orange-200 dark:text-orange-200/70">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
