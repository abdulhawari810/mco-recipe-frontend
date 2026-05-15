import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useAllRecipes = ({
  query,
  category,
  difficulty,
  time,
  page,
} = {}) => {
  // 🔹 GET ALL RECIPES
  const {
    data: recipesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.all({ query, category, difficulty, time, page }),
    queryFn: () =>
      getAllRecipes({
        query,
        category,
        difficulty,
        time,
        page,
      }),
    staleTime: 1000 * 60 * 5, // 5 menit
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });

  return {
    recipes: recipesData?.data?.data || [],
    loadingRecipes: isLoading,
    error: recipesData?.data?.message,
    refetch,
  };
};
