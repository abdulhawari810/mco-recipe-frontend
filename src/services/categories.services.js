import axiosInstance from "@/API/axiosinstance.api";

export const getAllCategories = async () => {
  return await axiosInstance.get("/categories");
};

export const createCategories = async () => {
  return await axiosInstance.post(`/categories/create`);
};

export const createAllCategories = async (recipeId) => {
  return await axiosInstance.post(`/categories/create/all`);
};

export const deleteCategoriesById = async (recipeId) => {
  return await axiosInstance.delete(`/categories/delete/${recipeId}`);
};
