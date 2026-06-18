import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { me, logoutUser } from "@/services/auth.services";
import { AuthKeys, usersKeys } from "@/utils/queryKeys";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuth = (query) => {
  const queryClient = useQueryClient();

  const isLogin = localStorage.getItem("isLogin") === "true";

  // 🔹 GET CURRENT USER
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: AuthKeys.all(),
    queryFn: () => me(query),
    enabled: isLogin,

    // optional
    retry: false,
  });

  // 🔹 LOGOUT
  const { mutateAsync: logout, isPending: LoadingLogout } = useMutation({
    mutationFn: logoutUser,

    onSuccess: (msg) => {
      queryClient.removeQueries({
        queryKey: AuthKeys.all(),
      });
      queryClient.removeQueries({
        queryKey: usersKeys.all(),
      });

      queryClient.clear();

      toast.success(msg?.response?.data?.message || "Logout Berhasil");
      localStorage.setItem("isLogin", "false");
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
