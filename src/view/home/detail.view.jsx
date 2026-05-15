// src/pages/RecipeDetail.jsx
import Carousel from "@/components/carousel.component";
import { useParams } from "react-router-dom";
import { useSingleRecipes } from "@/hooks/recipes/useSingleRecipes.hooks";
import { renderIcon } from "@/utils/icons.utils";
import { getImagePath } from "@/utils/image.utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailView() {
  const { id } = useParams();
  const { recipe, loading } = useSingleRecipes(id);
  if (loading) return <p>Loading...</p>;

  const parseJSON = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  const instructions = parseJSON(recipe?.instructions);
  const ingredients = parseJSON(recipe?.ingredients);

  return (
    <div className="max-w-6xl mx-auto p-10 space-y-6 bg-white rounded-2xl">
      <div className="grid grid-cols-1 items-start gap-5">
        <div className="flex items-start gap-5">
          <Skeleton className="w-5 h-5 md:w-52 md:h-52 lg:w-96 lg:h-96 rounded-2xl" />
          <div className="space-y-2 md:space-y-6">
            <Skeleton className="w-20 h-5 rounded-lg sm:h-44 md:w-64 md:h-8" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-20 h-5 rounded-full sm:h-44 md:w-32 md:h-10" />
              <Skeleton className="w-20 h-5 rounded-full sm:h-44 md:w-32 md:h-10" />
              <Skeleton className="w-20 h-5 rounded-full sm:h-44 md:w-32 md:h-10" />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <Skeleton className="w-full h-5 rounded-lg md:h-4" />
              <Skeleton className="w-full h-5 rounded-lg md:h-4" />
              <Skeleton className="w-full h-5 rounded-lg md:h-4" />
              <Skeleton className="w-3/4 h-5 rounded-lg md:h-4" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-y-4">
            <Skeleton className="w-20 h-5 rounded-lg sm:h-44 md:w-40 md:h-8" />
            <Skeleton className="w-full h-5 rounded-lg sm:h-44 md:h-72" />
          </div>
          <div className="w-full flex flex-col gap-y-4">
            <Skeleton className="w-20 h-5 rounded-lg sm:h-44 md:w-40 md:h-8" />
            <Skeleton className="w-full h-5 rounded-lg sm:h-44 md:h-72" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5">
        <div className="flex items-start gap-5">
          <img
            src={
              recipe?.image ||
              getImagePath(`food/${recipe?.image}`) ||
              getImagePath("food/food1.jpg")
            }
            alt={recipe?.slug}
            className="w-5 h-5 md:w-52 md:h-52 lg:w-96 lg:h-96 rounded-2xl object-cover"
          />
          {/* Title */}
          <div className="space-y-2 md:space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {recipe?.title}
            </h1>

            <div className="flex gap-4 text-sm text-gray-500">
              <span
                className={`flex items-center justify-center p-2 rounded-2xl outline-4 ${recipe?.time <= 10 ? "text-green-500 bg-green-500/3 outline-green-500" : recipe?.time <= 30 ? "text-orange-500 bg-orange-500/3 outline-orange-500" : "text-red-500 bg-red-500/3 outline-red-500"} gap-2`}
              >
                {renderIcon("Clock3", { className: "w-5 h-5" })} {recipe?.time}{" "}
                menit
              </span>
              <span
                className={`flex items-center justify-center p-2 rounded-2xl outline ${recipe?.difficulty.toLowerCase() === "easy" ? "text-green-500 bg-green-500/3 outline-green-500" : recipe?.difficulty.toLowerCase() === "medium" ? "text-orange-500 bg-orange-500/3 outline-orange-500" : "text-red-500 bg-red-500/3 outline-red-500"} gap-2`}
              >
                {renderIcon("Flame", { className: "w-5 h-5" })}{" "}
                {recipe?.difficulty}
              </span>
              <span className="flex items-center justify-center p-2 outline rounded-2xl text-orange-500 bg-orange-500/3 outline-orange-500 gap-2">
                {renderIcon("Tags", { className: "w-5 h-5 " })}{" "}
                {recipe?.category.name}
              </span>
            </div>
            {/* Description */}
            <p className="text-gray-700 leading-relaxed my-5">
              {recipe?.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2">
          {/* Ingredients */}
          <div className="w-full ">
            <h2 className="text-lg font-semibold mb-2">Bahan</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {Array.isArray(ingredients) &&
                ingredients.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>

          {/* Steps */}
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-2">Langkah</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {Array.isArray(instructions) &&
                instructions.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
