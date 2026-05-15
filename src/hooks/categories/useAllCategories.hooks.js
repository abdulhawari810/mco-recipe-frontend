import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categories.services";
import { categoriesKeys } from "@/utils/queryKeys";

export const useAllCategories = () => {
  // 🔹 GET ALL RECIPES
  const {
    data: categoriesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: categoriesKeys.all(),
    queryFn: () => getAllCategories(),
    staleTime: 1000 * 60 * 5, // 5 menit
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });

  return {
    categories: categoriesData?.data?.data || [],
    loadingCategories: isLoading,
    error,
    refetch,
  };
};
