import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { me, logoutUser } from "@/services/auth.services";
import { AuthKeys } from "@/utils/queryKeys";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { success } from "./../../../../backend/utils/response.utils";

export const useAuth = (query) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  // 🔹 GET CURRENT USER
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: AuthKeys.all(),
    queryFn: () => me(query),

    // optional
    retry: false,
  });

  // 🔹 LOGOUT
  const { mutateAsync: logout, isPending: logoutLoading } = useMutation({
    mutationFn: logoutUser,

    onSuccess: (msg) => {
      // hapus semua cache auth
      queryClient.removeQueries({
        queryKey: AuthKeys.all(),
      });

      // optional: hapus semua cache
      queryClient.clear();

      toast.success(msg?.response?.data?.message || "Logged out successfully");
    },

    onError: (error) => {
      console.error("Error logging out:", error);

      toast.error(error?.response?.data?.message || "Logout gagal");
    },
  });

  return {
    me: userData?.data?.data || null,
    loading: isLoading || logoutLoading,
    error: error?.response?.data?.message || error?.message || null,
    refetch,
    logout,
  };
};
