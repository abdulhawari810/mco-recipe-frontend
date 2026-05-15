import { useQuery } from "@tanstack/react-query";
import { getAllFavourite } from "@/services/favourite.services";

export const useAllFavourite = () => {
  // 🔹 GET ALL RECIPES
  const {
    data: favouriteData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favourites"],
    queryFn: () => getAllFavourite(),
  });

  return {
    favourites: favouriteData?.data?.data || [],
    loading: isLoading,
    error,
    refetch,
  };
};
