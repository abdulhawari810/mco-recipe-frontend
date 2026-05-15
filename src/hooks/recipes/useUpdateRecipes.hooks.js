import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipeById } from "@/services/recipes.services";
import { toast } from "react-hot-toast";
import { recipeKeys } from "@/utils/queryKeys";

export const useUpdateRecipes = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateRecipes,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => updateRecipeById(id, payload),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "resep berhasil diupdate");
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal mengupdate resep");
    },
  });

  return {
    updateRecipes,
    loadingUpdateRecipes: isPending,
    error,
  };
};
