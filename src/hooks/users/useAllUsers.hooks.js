import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/users.services";
import { usersKeys } from "@/utils/queryKeys";

export const useAllUsers = ({ search, sort, filter } = {}) => {
  // 🔹 GET ALL USERS
  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: usersKeys.all(),
    queryFn: () =>
      getAllUsers({
        search,
        sort,
        filter,
      }),
  });

  const users = usersData?.data?.data || [];

  return {
    users,
    loadingUsers: isLoading,
    error: usersData?.data?.message || error?.message || null,
    refetch,
  };
};
