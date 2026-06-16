import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword } from "@/services/auth.services";
import { toast } from "react-hot-toast";
import { AuthKeys, usersKeys } from "@/utils/queryKeys";

export const useAuthUpdatePassword = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateAuthPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => updatePassword(payload),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Kata Sandi Berhasil Diupdate");
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
      queryClient.invalidateQueries({
        queryKey: AuthKeys.all(),
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Gagal mengupdate kata sandi",
      );
    },
  });

  return {
    updateAuthPassword,
    loadingAuthUpdatePassword: isPending,
    error,
  };
};
