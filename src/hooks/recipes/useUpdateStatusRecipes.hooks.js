import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateStatusRecipes } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useUpdateStatusRecipes = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateStatusRecipe,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, status }) => updateStatusRecipes(id, status),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "status recipes berhasil diupdate");
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Gagal mengupdate status recipes",
      );
    },
  });

  return {
    updateStatusRecipe,
    loadingUpdateStatus: isPending,
    error,
  };
};
