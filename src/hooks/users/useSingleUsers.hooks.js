import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/users.services";
import { usersKeys } from "@/utils/queryKeys";

export const useSingleUsers = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: usersKeys.all(id),
    queryFn: () => getUserById(id),
    enabled: !!id, // hanya jalan kalau ada id
  });

  return {
    user: data?.data?.data,
    loadingSingleUsers: isLoading,
    error,
  };
};
