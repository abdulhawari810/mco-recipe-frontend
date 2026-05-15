import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useSingleRecipes = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => getRecipeById(id),
    enabled: !!id, // hanya jalan kalau ada id
  });

  return {
    recipe: data?.data?.data,
    loadingSingleRecipes: isLoading,
    error,
  };
};
