import { useAllRecipesForAdmin } from "@/hooks/recipes/useAllRecipesForAdmin.hooks";
import { useCountAllRecipes } from "@/hooks/recipes/useCountAllRecipes.hooks";
import DashboardView from "@/view/dashboard/components/dashboard.view";

export default function DashboardAdminView() {
  const { recipesAdmin, loading } = useAllRecipesForAdmin();
  const { countAll } = useCountAllRecipes();

  if (loading)
    return (
      <>
        <div className="w-full h-screen bg-orange-500 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex animate-spin border-4 w-20 h-20 border-white rounded-full border-l-transparent border-t-transparent [animation-duration:2s] items-center justify-center">
              <span className="animate-spin inline-block w-10 h-10 text-white border-4 border-white rounded-full border-t-transparent"></span>
            </div>
            <span className="text-white inline-block animate-pulse font-bold text-lg mt-10">
              Tunggu Sebentar...
            </span>
          </div>
        </div>
      </>
    );

  return (
    <DashboardView
      recipes={recipesAdmin?.data}
      role="admin"
      count={countAll}
      countAllRecipes={recipesAdmin?.totalData}
    />
  );
}
