import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavourite } from "@/services/favourite.services";
import { toast } from "react-hot-toast";
import { favouriteKeys } from "@/utils/queryKeys";
import { useState } from "react";

export const useCreateFavourite = () => {
  const queryClient = useQueryClient();
  const [loadingFavouriteId, setLoadingFavouriteId] = useState(null);

  const {
    mutateAsync: createFavouriteMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => createFavourite(payload),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "resep berhasil disimpan");
      queryClient.invalidateQueries({ queryKey: favouriteKeys.all() });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menyimpan resep");
    },
  });

  const handleCreateFavourite = async (id) => {
    try {
      setLoadingFavouriteId(id);

      await createFavouriteMutate(id);
    } finally {
      setLoadingFavouriteId(null);
    }
  };

  return {
    createFavourite: handleCreateFavourite,
    loadingCreateFavourite: isPending,
    loadingFavouriteId,
    error,
  };
};
