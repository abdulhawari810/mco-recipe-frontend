import axiosInstance from "@/API/axiosinstance.api";

export const getProfile = async () => {
  return await axiosInstance.get("/profile");
};

export const createProfile = async (data) => {
  return await axiosInstance.post(`/profile/create`, data);
};

export const updateProfile = async (data) => {
  return await axiosInstance.patch(`/profile/update`, data);
};
