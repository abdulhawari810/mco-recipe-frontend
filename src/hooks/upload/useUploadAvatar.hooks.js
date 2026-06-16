import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { avatarUpload } from "@/services/upload.services";
import { usersKeys, AuthKeys } from "@/utils/queryKeys";
import { useState } from "react";

export const UploadKeys = {
  all: (params = {}) => ["upload", params],
  list: (params = {}) => ["upload", "list", params],
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createUploadAvatarMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => avatarUpload(payload),

    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: AuthKeys.all() });
      await queryClient.invalidateQueries({ queryKey: usersKeys.all() });
      await queryClient.invalidateQueries({ queryKey: UploadKeys.all() });
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message || "Gagal menyimpan Profile",
      );
    },
  });

  return {
    createUploadAvatar: createUploadAvatarMutate,
    loadingCreateUploadAvatar: isPending,
    error,
  };
};
