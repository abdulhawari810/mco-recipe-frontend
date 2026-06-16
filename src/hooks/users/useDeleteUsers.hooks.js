import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/users.services";
import { toast } from "react-hot-toast";
import { usersKeys } from "@/utils/queryKeys";

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Akun Berhasil dihapus!");
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal Menghapus Akun");
    },
  });

  return {
    deleteUsers,
    loadingDeleteUsers: isPending,
    error,
  };
};
