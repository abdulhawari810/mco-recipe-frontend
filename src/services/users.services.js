import axiosInstance from "@/API/axiosinstance.api";

export const getAllUsers = async (params) => {
  return axiosInstance.get("/users/", { params });
};

export const getUserById = async (id) => {
  return axiosInstance.get(`/users/find/${id}`);
};

export const updateUserById = async (id, data) => {
  return axiosInstance.patch(`/users/update/${id}`, data);
};
export const updateStatusUsers = async (id, data) => {
  return axiosInstance.post(`/users/update/status/${id}`, data);
};

export const deleteUserById = async (id) => {
  return axiosInstance.delete(`/users/delete/${id}`);
};
