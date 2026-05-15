import { useState, useEffect } from "react";
import { getAllRecipes, getRecipeById } from "@/services/recipes.services";

export const useRecipes = ({ query, category, difficulty, time, page }) => {
  const [recipes, setRecipes] = useState([]);
  const [singleRecipes, setSingleRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const recipesData = await getAllRecipes({
        query,
        category,
        difficulty,
        time,
        page,
      });
      setRecipes(recipesData.data.data);
    } catch (error) {
      console.error("Error fetching recipes data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipesById = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const recipesData = await getRecipeById(id);
      setSingleRecipes(recipesData.data.data);
    } catch (error) {
      console.error("Error fetching recipes data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [query, category, difficulty, time, page]);

  return {
    recipes,
    singleRecipes: fetchRecipesById,
    loading,
    refetch: fetchRecipes,
  };
};
