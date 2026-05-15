import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/services/profile.services";
import { toast } from "react-hot-toast";
import { profileKeys } from "@/utils/queryKeys";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createProfileMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => createProfile(payload),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Profile berhasil disimpan");
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menyimpan Profile");
    },
  });

  return {
    createProfiles: createProfileMutate,
    loadingCreateProfile: isPending,
    error,
  };
};
