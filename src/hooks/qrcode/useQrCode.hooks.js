import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { setup2FAS } from "@/services/qrcode.services";
import { qrcodeKeys } from "@/utils/queryKeys";
import toast from "react-hot-toast";

export const useSetup2FAS = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: setup2fas,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ payload }) => setup2FAS(payload),

    onSuccess: (res) => {
      localStorage.setItem("qrcode", JSON.stringify(res.data.data));
      localStorage.setItem("modal", "2fa");
      localStorage.setItem("modal_active", true);
      toast.success(res?.data?.message || "QR Code berhasil diambil");
      queryClient.invalidateQueries(qrcodeKeys.all());
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal mengambil QR Code");
    },
  });

  return {
    setup2fas,
    loadingSetup2fas: isPending,
    error,
  };
};
