import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "@/services/recipes.services";
import { toast } from "react-hot-toast";
import { recipeKeys } from "@/utils/queryKeys";

export const useCreateRecipes = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createRecipeMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ payload }) => createRecipe(payload),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "resep berhasil ditambahkan");
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menambah resep");
    },
  });

  return {
    createRecipes: createRecipeMutate,
    loadingCreateRecipes: isPending,
    error,
  };
};
