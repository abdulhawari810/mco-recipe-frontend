import { useQuery } from "@tanstack/react-query";
import { getRecipesByAuthor } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useRecipesByAuthor = ({
  search,
  categoryId,
  time,
  difficulty,
  status,
} = {}) => {
  // 🔹 GET ALL RECIPES
  const {
    data: recipesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.recipesByAuthor({
      search,
      categoryId,
      time,
      difficulty,
      status,
    }),
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getRecipesByAuthor(params);
    },
    staleTime: 1000 * 60 * 5, // 5 menit
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });

  return {
    recipesByAuthor: recipesData?.data?.data || [],
    loading: isLoading,
    error,
    refetch,
  };
};
