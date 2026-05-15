import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateStatusUsers } from "@/services/users.services";
import { usersKeys } from "@/utils/queryKeys";

export const useUpdateStatusUsers = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateStatus,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => updateStatusUsers(id, payload),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "status users berhasil diupdate");
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Gagal mengupdate status users",
      );
    },
  });

  return {
    updateStatus,
    loadingUpdateStatus: isPending,
    error,
  };
};
