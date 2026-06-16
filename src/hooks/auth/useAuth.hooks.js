import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { me, logoutUser } from "@/services/auth.services";
import { AuthKeys, usersKeys } from "@/utils/queryKeys";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  const { mutateAsync: logout, isPending: LoadingLogout } = useMutation({
    mutationFn: logoutUser,

    onSuccess: (msg) => {
      // hapus semua cache auth
      queryClient.removeQueries({
        queryKey: AuthKeys.all(),
      });
      queryClient.removeQueries({
        queryKey: usersKeys.all(),
      });

      // optional: hapus semua cache
      queryClient.clear();

      toast.success(msg?.response?.data?.message || "Logout Berhasil");
    },

    onError: (error) => {
      console.error("Error logging out:", error);

      toast.error(error?.response?.data?.message || "Logout gagal");
    },
  });

  return {
    me: userData?.data?.data || null,
    loadingMe: isLoading || LoadingLogout,
    error: error?.response?.data?.message || error?.message || null,
    refetch,
    logout,
  };
};
