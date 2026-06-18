import { useState } from "react";
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import { useDeleteFavourite } from "@/hooks/favourites/useDeleteFavourite.hooks";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "@/utils/image.utils";
import { renderIcon } from "@/utils/icons.utils";
import AnimateSpin from "@/components/anime.spin.component";

export default function FavoritesView() {
  const { favourites, loadingFavourite } = useAllFavourite();
  const { handleDeleteFavourite, loadingDeleteFavouriteId } =
    useDeleteFavourite();
  const nav = useNavigate();

  const parseJSON = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  const whislist = favourites;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-6">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Favorite Recipes ({whislist?.length})
        </h1>
      </div>

      {/* CONTENT */}
      {whislist.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(whislist) &&
            whislist.map((item) => {
              return (
                <div
                  key={item.favourite_recipe.id}
                  className="bg-white dark:bg-neutral-900 hover:scale-105 transition-all! duration-300 rounded-2xl shadow hover:shadow-lg overflow-hidden"
                >
                  {/* IMAGE */}
                  <img
                    src={item.favourite_recipe.image}
                    alt={item.favourite_recipe.title}
                    className="w-full h-40 object-cover"
                  />

                  {/* BODY */}
                  <div className="p-4">
                    <h2 className="font-semibold text-lg line-clamp-1">
                      {item.favourite_recipe.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.favourite_recipe.description}
                    </p>

                    {/* ACTION */}
                    <div className="mt-4 cursor-pointer flex justify-between items-center">
                      <button
                        className="text-blue-500 text-sm cursor-pointer hover:text-orange-500"
                        onClick={() => nav(`/recipes/detail/${item.recipeId}`)}
                      >
                        View Detail
                      </button>

                      <button
                        onClick={() => handleDeleteFavourite(item.recipeId)}
                        className="cursor-pointer p-2"
                      >
                        {loadingDeleteFavouriteId === item.recipeId ? (
                          <AnimateSpin />
                        ) : (
                          <span className="text-red-500 text-sm">Hapus</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img
            src={getImagePath("illustration/empty_data.png")}
            alt="Empty Data "
            className="w-40 mb-4 opacity-70 rounded-4xl"
          />
          <h2 className="text-xl font-semibold">No favorite recipes yet</h2>
          <p className="text-gray-500 mt-2">
            Start adding recipes to your favorites
          </p>
        </div>
      )}
    </div>
  );
}
