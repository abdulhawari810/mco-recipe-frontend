import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/profile.services";
import { toast } from "react-hot-toast";
import { profileKeys } from "@/utils/queryKeys";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateProfileUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => updateProfile(payload),
    onSuccess: (res) => {
      toast.success(res?.data?.data?.message || "profile berhasil diupdate");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal mengupdate resep");
    },
  });

  return {
    updateProfileUsers,
    loadingUpdateProfile: isPending,
    error,
  };
};
