import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserById } from "@/services/users.services";
import { toast } from "react-hot-toast";

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => updateUserById(id, payload),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "user berhasil diupdate");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["auth-users"],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal mengupdate user");
    },
  });

  return {
    updateUsers,
    loading: isPending,
    error,
  };
};
