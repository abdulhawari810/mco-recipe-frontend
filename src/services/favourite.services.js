import axiosInstance from "@/API/axiosinstance.api";

export const getAllFavourite = async () => {
  return await axiosInstance.get("/favourite/");
};

export const createFavourite = async (recipeId) => {
  return await axiosInstance.post(`/favourite/create/${recipeId}`);
};

export const deleteFavouriteById = async (recipeId) => {
  return await axiosInstance.delete(`/favourite/delete/${recipeId}`);
};
