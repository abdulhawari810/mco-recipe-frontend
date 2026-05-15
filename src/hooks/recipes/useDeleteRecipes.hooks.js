import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipeById } from "@/services/recipes.services";
import { toast } from "react-hot-toast";
import { recipeKeys } from "@/utils/queryKeys";

export const useDeleteRecipes = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteRecipeById(id),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Resep berhasil dihapus");
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Gagal hapus resep");
    },
  });

  return {
    deleteRecipes: mutation.mutate,
    loading: mutation.isPending,
  };
};
