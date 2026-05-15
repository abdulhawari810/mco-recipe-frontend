import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserById } from "@/services/users.services";
import { toast } from "react-hot-toast";
import { usersKeys } from "@/utils/queryKeys";

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => updateUserById(id, payload),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "user berhasil diupdate");
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal mengupdate user");
    },
  });

  return {
    updateUsers,
    loadingUpdateUsers: isPending,
    error,
  };
};
