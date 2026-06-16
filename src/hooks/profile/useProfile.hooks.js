import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/profile.services";
import { profileKeys } from "@/utils/queryKeys";

export const useProfile = () => {
  // 🔹 GET ALL RECIPES
  const {
    data: profileData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: profileKeys.all(),
    queryFn: () => getProfile(),
  });

  return {
    profile: profileData?.data?.data || null,
    loadingProfile: isLoading,
    error,
    refetch,
  };
};
