import axiosinstance from "@/API/axiosinstance.api";

export const avatarUpload = async (data) => {
  const res = axiosinstance.post("/upload/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
