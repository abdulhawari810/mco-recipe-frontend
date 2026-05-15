import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/users.services";

export const useSingleUsers = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // hanya jalan kalau ada id
  });

  return {
    user: data?.data?.data,
    loading: isLoading,
    error,
  };
};
