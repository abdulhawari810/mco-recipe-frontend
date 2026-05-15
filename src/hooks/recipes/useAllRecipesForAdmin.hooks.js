import { useQuery } from "@tanstack/react-query";
import { getAllRecipesForAdmin } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useAllRecipesForAdmin = ({ search, status, page } = {}) => {
  // 🔹 GET ALL RECIPES
  const {
    data: recipesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.admin({ search, page, status }),
    queryFn: () =>
      getAllRecipesForAdmin({
        search,
        page,
        status,
      }),
    staleTime: 1000 * 60 * 5, // 5 menit
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });

  return {
    recipesAdmin: recipesData?.data?.data || [],
    loadingRecipesAdmin: isLoading,
    error,
    refetch,
  };
};
