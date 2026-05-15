import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavourite } from "@/services/favourite.services";
import { toast } from "react-hot-toast";

export const useCreateFavourite = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createFavouriteMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => createFavourite(payload),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "resep berhasil disimpan");
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menyimpan resep");
    },
  });

  return {
    createFavourite: createFavouriteMutate,
    loading: isPending,
    error,
  };
};
