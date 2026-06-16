import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disable2FAS } from "@/services/qrcode.services";
import { toast } from "react-hot-toast";
import { qrcodeKeys } from "@/utils/queryKeys";
import { formatDateTime } from "@/utils/formatDateTime";

export const useDisable2FAS = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: disable2FASData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => disable2FAS(payload),
    onSuccess: (res) => {
      const date = res?.data?.data?.two_factor_updateAt;
      toast.success(
        res?.data?.message || "Verifikasi 2 langkah berhasil dinonaktifkan!",
      );
      localStorage.setItem("modal", "");
      localStorage.setItem("modal_active", false);
      localStorage.removeItem("2fas_step");
      localStorage.removeItem("qrcode");
      localStorage.setItem("two_factor_updateAt", formatDateTime(date));
      queryClient.invalidateQueries(qrcodeKeys.all());
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Gagal menonaktifkan verifikasi 2 langkah",
      );
    },
  });

  return {
    disable2FASData,
    loadingDisable2FAS: isPending,
    error,
  };
};
