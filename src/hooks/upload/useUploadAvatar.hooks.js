import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { avatarUpload } from "@/services/upload.services";
import { usersKeys, AuthKeys } from "@/utils/queryKeys";

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

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Profile berhasil disimpan");
      queryClient.invalidateQueries({ queryKey: UploadKeys.all() });
      queryClient.invalidateQueries({ queryKey: usersKeys.all() });
      queryClient.invalidateQueries({ queryKey: AuthKeys.all() });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menyimpan Profile");
    },
  });

  return {
    createUploadAvatar: createUploadAvatarMutate,
    loadingCreateUploadAvatar: isPending,
    error,
  };
};
