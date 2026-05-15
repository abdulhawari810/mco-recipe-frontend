import { useCountRecipesByAuthor } from "@/hooks/recipes/useCountRecipesByAuthor.hooks";
import { useRecipesByAuthor } from "@/hooks/recipes/useRecipeByAuthor.hooks";
import DashboardView from "@/view/dashboard/components/dashboard.view";

export default function DashboardChefView() {
  const { recipesByAuthor } = useRecipesByAuthor();
  const { count } = useCountRecipesByAuthor();

  return (
    <DashboardView recipes={recipesByAuthor?.data} role="chef" count={count} />
  );
}
