import { useQuery } from "@tanstack/react-query";
import { getAllFavourite } from "@/services/favourite.services";
import { favouriteKeys } from "@/utils/queryKeys";

export const useAllFavourite = () => {
  // 🔹 GET ALL RECIPES
  const {
    data: favouriteData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: favouriteKeys.all(),
    queryFn: () => getAllFavourite(),
  });

  return {
    favourites: favouriteData?.data?.data || [],
    loadingFavourite: isLoading,
    error,
    refetch,
  };
};
