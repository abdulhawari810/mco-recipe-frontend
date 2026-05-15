import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavouriteById } from "@/services/favourite.services";
import { toast } from "react-hot-toast";

export const useDeleteFavourite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteFavouriteById(id),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Favourite berhasil dihapus");

      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Gagal hapus Favourie");
    },
  });

  return {
    deleteFavourite: mutation.mutate,
    loading: mutation.isPending,
  };
};
