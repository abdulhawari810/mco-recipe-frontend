import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verify2FAS } from "@/services/qrcode.services";
import { toast } from "react-hot-toast";
import { qrcodeKeys } from "@/utils/queryKeys";

export const useVerify2FAS = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: Verify2FASData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => verify2FAS(payload),
    onSuccess: (res) => {
      toast.success(
        res?.data?.message || "Verifikasi 2 langkah berhasil diaktifkan",
      );
      localStorage.setItem("modal", "");
      localStorage.setItem("modal_active", false);
      localStorage.removeItem("2fas_step");
      localStorage.removeItem("qrcode");
      queryClient.invalidateQueries(qrcodeKeys.all());
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Gagal mengaktifkan verifikasi 2 langkah",
      );
    },
  });

  return {
    Verify2FASData,
    loadingVerify2FAS: isPending,
    error,
  };
};
