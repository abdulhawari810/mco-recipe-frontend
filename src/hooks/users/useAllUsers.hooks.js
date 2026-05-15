import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/users.services";
import { use } from "react";

export const useAllUsers = ({ search, sort, filter } = {}) => {
  // 🔹 GET ALL USERS
  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", search, sort, filter],
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
