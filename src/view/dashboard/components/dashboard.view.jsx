import { NavLink, useNavigate } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import Card from "@/components/card.component";
import { getImagePath } from "@/utils/image.utils";

export default function DashboardView({
  recipes,
  count = 0,
  role,
  countAllRecipes = 0,
}) {
  const { me } = useAuth();
  const nav = useNavigate();

  return (
    <>
      <main className="w-full flex flex-col gap-5">
        <div className="p-3 sm:p-4 rounded-2xl bg-white grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <NavLink
            to={"/dashboard/chef/recipe"}
            className="w-full group relative min-h-[140px] bg-blue-700 p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300 rounded-2xl text-white flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-bold text-lg sm:text-xl leading-tight">
                Total Recipes
              </h1>

              {renderIcon("ArrowUpRight", {
                className:
                  "w-5 h-5 sm:w-6 sm:h-6 shrink-0 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:translate-x-1",
              })}
            </div>

            <div className="flex flex-wrap items-end gap-2 mt-6">
              <span className="font-bold text-3xl sm:text-4xl">
                {countAllRecipes || 0}
              </span>
              <span className="text-base sm:text-xl font-medium mb-1">
                Recipes
              </span>
            </div>
          </NavLink>

          <NavLink
            className="w-full group relative min-h-[140px] bg-amber-700 hover:scale-[1.02] transition-all duration-300 p-4 sm:p-5 rounded-2xl text-white flex flex-col justify-between"
            to={{
              pathname:
                me?.role === "admin"
                  ? "/dashboard/admin/recipe"
                  : "/dashboard/chef/recipe",
              search: "?status=pending",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-bold text-lg sm:text-xl leading-tight">
                Recipe Pending
              </h1>

              {renderIcon("ArrowUpRight", {
                className:
                  "w-5 h-5 sm:w-6 sm:h-6 shrink-0 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:translate-x-1",
              })}
            </div>

            <div className="flex flex-wrap items-end gap-2 mt-6">
              <span className="font-bold text-3xl sm:text-4xl">
                {count.pending || 0}
              </span>
              <span className="text-base sm:text-xl font-medium mb-1">
                Pending
              </span>
            </div>
          </NavLink>

          <NavLink
            className="w-full group relative min-h-[140px] bg-orange-600 hover:scale-[1.02] transition-all duration-300 p-4 sm:p-5 rounded-2xl text-white flex flex-col justify-between"
            to={{
              pathname:
                me?.role === "admin"
                  ? "/dashboard/admin/recipe"
                  : "/dashboard/chef/recipe",
              search: "?status=draft",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-bold text-lg sm:text-xl leading-tight">
                Recipe Draft
              </h1>

              {renderIcon("ArrowUpRight", {
                className:
                  "w-5 h-5 sm:w-6 sm:h-6 shrink-0 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:translate-x-1",
              })}
            </div>

            <div className="flex flex-wrap items-end gap-2 mt-6">
              <span className="font-bold text-3xl sm:text-4xl">
                {count.draft || 0}
              </span>
              <span className="text-base sm:text-xl font-medium mb-1">
                Draft
              </span>
            </div>
          </NavLink>

          <NavLink
            className="w-full group relative min-h-[140px] bg-green-700 hover:scale-[1.02] transition-all duration-300 p-4 sm:p-5 rounded-2xl text-white flex flex-col justify-between"
            to={{
              pathname:
                me?.role === "admin"
                  ? "/dashboard/admin/recipe"
                  : "/dashboard/chef/recipe",
              search: "?status=accept",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-bold text-lg sm:text-xl leading-tight">
                Recipe Approved
              </h1>

              {renderIcon("ArrowUpRight", {
                className:
                  "w-5 h-5 sm:w-6 sm:h-6 shrink-0 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:translate-x-1",
              })}
            </div>

            <div className="flex flex-wrap items-end gap-2 mt-6">
              <span className="font-bold text-3xl sm:text-4xl">
                {count.accept || 0}
              </span>
              <span className="text-base sm:text-xl font-medium mb-1">
                Approved
              </span>
            </div>
          </NavLink>

          <NavLink
            className="w-full group relative min-h-[140px] bg-orange-700 p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300 rounded-2xl text-white flex flex-col justify-between"
            to={{
              pathname:
                me?.role === "admin"
                  ? "/dashboard/admin/recipe"
                  : "/dashboard/chef/recipe",
              search: "?status=reject",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-bold text-lg sm:text-xl leading-tight">
                Recipe Rejected
              </h1>

              {renderIcon("ArrowUpRight", {
                className:
                  "w-5 h-5 sm:w-6 sm:h-6 shrink-0 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:translate-x-1",
              })}
            </div>

            <div className="flex flex-wrap items-end gap-2 mt-6">
              <span className="font-bold text-3xl sm:text-4xl">
                {count.reject || 0}
              </span>
              <span className="text-base sm:text-xl font-medium mb-1">
                Rejected
              </span>
            </div>
          </NavLink>
        </div>

        <div className="w-full flex flex-col p-3 sm:p-4 rounded-2xl bg-white">
          <div className="flex items-center justify-between gap-3 mb-5 px-1">
            <h1 className="text-lg sm:text-xl font-bold">All Recipe</h1>

            <div className="flex items-center text-sm sm:text-base text-slate-600 justify-center gap-2 cursor-pointer">
              <span>Seemore</span>
              {renderIcon("ArrowRight", { className: "w-4 h-4 sm:w-5 sm:h-5" })}
            </div>
          </div>

          <div className="columns-2 sm:columns-2 xl:flex xl:flex-wrap xl:items-start xl:justify-between xl:space-y-0 xl:gap-5 w-full space-y-5">
            {Array.isArray(recipes) && recipes.length > 0 ? (
              recipes.map((item) => {
                return (
                  <div key={item.id} className="break-inside-avoid mb-5">
                    <Card
                      title={item.title}
                      description={item.description}
                      image={
                        item.image ||
                        getImagePath(`food/item.image`) ||
                        getImagePath("food/food1.jpg")
                      }
                      profile={item.recipes_authors?.profile}
                      author={item.recipes_authors?.username}
                      difficulty={item.difficulty}
                      time={item.time}
                      category={item.category.name}
                      onCardClick={() => nav(`/recipes/detail/${item.id}`)}
                      badge={
                        item.status === "pending"
                          ? "Pending"
                          : item.status === "accept"
                            ? "Disetujui"
                            : item.status === "reject"
                              ? "Ditolak"
                              : "Draft"
                      }
                    />
                  </div>
                );
              })
            ) : (
              <h1 className="text-xl sm:text-2xl font-bold text-black">
                Data tidak ditemukan
              </h1>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
