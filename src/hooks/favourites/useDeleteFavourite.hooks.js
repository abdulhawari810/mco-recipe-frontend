import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavouriteById } from "@/services/favourite.services";
import { toast } from "react-hot-toast";
import { favouriteKeys } from "@/utils/queryKeys";
import { useState } from "react";

export const useDeleteFavourite = () => {
  const queryClient = useQueryClient();
  const [loadingDeleteFavouriteId, setLoadingDeleteFavouriteId] =
    useState(null);

  const {
    mutateAsync: deleteFavouriteMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id) => deleteFavouriteById(id),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Favourite berhasil dihapus");

      queryClient.invalidateQueries({ queryKey: favouriteKeys.all() });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Gagal hapus Favourie");
    },
  });

  const handleDeleteFavourite = async (id) => {
    try {
      setLoadingDeleteFavouriteId(id);

      await deleteFavouriteMutate(id);
    } finally {
      setLoadingDeleteFavouriteId(null);
    }
  };

  return {
    handleDeleteFavourite,
    loadingDeleteFavourite: isPending,
    loadingDeleteFavouriteId,
    error,
  };
};
