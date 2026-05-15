import axiosInstance from "@/API/axiosinstance.api";

export const getAllRecipes = async ({
  query,
  category,
  difficulty,
  time,
  page,
}) => {
  return await axiosInstance.get("/recipes/", {
    params: { search: query, category, difficulty, time, page },
  });
};

export const getAllRecipesForAdmin = async ({
  search,
  category,
  difficulty,
  time,
  page,
  status,
}) => {
  return await axiosInstance.get("/recipes/admin/recipes", {
    params: { search: search, category, difficulty, time, page, status },
  });
};

export const countRecipesByAuthor = async () => {
  return await axiosInstance.get("/recipes/count/recipes");
};

export const countAllRecipesStatus = async () => {
  return await axiosInstance.get("/recipes/count/all/recipes");
};

export const getRecipeById = async (id) => {
  return await axiosInstance.get(`/recipes/single/${id}`);
};

export const getRecipesByAuthor = async ({
  search,
  categoryId,
  time,
  difficulty,
  status,
}) => {
  return await axiosInstance.get(`/recipes/author`, {
    params: { search, categoryId, time, difficulty, status },
  });
};

export const getRecipesByCategory = async (category) => {
  return await axiosInstance.get(`/recipes/category/${category}`);
};

export const createRecipe = async (data) => {
  return await axiosInstance.post("/recipes/create", data);
};

export const updateRecipeById = async (id, data) => {
  return await axiosInstance.patch(`/recipes/update/${id}`, data);
};
export const updateStatusRecipes = async (id, data) => {
  return axiosInstance.post(`/recipes/update/status/${id}`, data);
};
export const deleteRecipeById = async (id) => {
  return await axiosInstance.delete(`/recipes/delete/${id}`);
};
