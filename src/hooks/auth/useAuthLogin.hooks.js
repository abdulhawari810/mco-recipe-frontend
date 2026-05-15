import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/services/auth.services";
import { toast } from "react-hot-toast";
import { AuthKeys } from "@/utils/queryKeys";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: loginUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ payload }) => loginUser(payload),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Login berhasil");
      queryClient.invalidateQueries(AuthKeys.all());
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login Gagal");
    },
  });

  return {
    loginUsers,
    loading: isPending,
    error,
  };
};
