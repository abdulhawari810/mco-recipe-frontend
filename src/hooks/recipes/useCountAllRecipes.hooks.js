import { useQuery } from "@tanstack/react-query";
import { countAllRecipesStatus } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useCountAllRecipes = () => {
  const {
    data: countData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.countStatusAll(),
    queryFn: countAllRecipesStatus,
    staleTime: 1000 * 60 * 5, // 5 menit
    cacheTime: 1000 * 60 * 10,
  });

  return {
    countAll: countData?.data?.data || { draft: 0, accept: 0, reject: 0 },
    loading: isLoading,
    error,
    refetch,
  };
};
