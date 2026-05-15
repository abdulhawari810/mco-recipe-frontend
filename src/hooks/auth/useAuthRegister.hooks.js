import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/services/auth.services";
import { toast } from "react-hot-toast";
import { AuthKeys } from "@/utils/queryKeys";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: registerUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ payload }) => registerUser(payload),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Register berhasil");
      queryClient.invalidateQueries(AuthKeys.all());
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Register Gagal");
    },
  });

  return {
    registerUsers,
    loading: isPending,
    error,
  };
};
