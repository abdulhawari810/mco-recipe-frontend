import Header from "@/components/header.component";
import Card from "@/components/card.component";
import { getImagePath } from "@/utils/image.utils";
import { useAllRecipes } from "@/hooks/recipes/useAllRecipes.hooks";
import { useCreateFavourite } from "@/hooks/favourites/useCreateFavourite.hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import CardLoading from "@/components/loading/card.loading";

export default function HomeView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filter, setFilters] = useState({});
  const [filterdebounced, setFilterDebounced] = useState({});
  const [page, setPage] = useState(1);
  const [LoadingSearch, setLoadingSearch] = useState(false);
  const { recipes, loadingRecipes } = useAllRecipes({
    query: debouncedSearchTerm,
    category: filterdebounced.category,
    difficulty: filterdebounced.difficulty,
    time: filterdebounced.time,
    page,
  });
  const { createFavourite, loadingFavouriteId } = useCreateFavourite();
  const nav = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setLoadingSearch(false);
      setDebouncedSearchTerm("");
      return;
    }
    setLoadingSearch(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!loadingRecipes) {
      setLoadingSearch(false);
    }
  }, [loadingRecipes]);

  const handlefilterChange = (newFilter) => {
    setFilters(newFilter);
  };

  const recipeList = recipes?.data;
  const authors = recipeList?.map((item) => item.recipe);

  return (
    <div className="home-view">
      <Header
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        filterValue={filter}
        onFilterChange={(newFilter) => setFilters(newFilter)}
        loading={LoadingSearch}
        onFilterChangeFinal={(finalFilter) => setFilterDebounced(finalFilter)}
      />

      <div className="cards-container bg-white rounded-2xl mt-5 flex flex-col p-4 gap-4">
        {loadingRecipes ? (
          <Skeleton className="w-64 h-6" />
        ) : (
          <h1 className="text-black font-bold text-xl md:text-2xl">
            This Weeks Top Recipes
          </h1>
        )}

        {/* card */}

        <div
          className="columns-2
         mt-5 sm:flex justify-between items-start sm:flex-wrap w-full space-y-4 lg:space-y-0 md:space-y-0 sm:space-y-0 md:gap-y-4 sm:gap-y-4 lg:gap-y-8"
        >
          {loadingRecipes && !recipeList ? (
            Array.from({ length: 12 }).map((_, i) => {
              return <CardLoading key={i} />;
            })
          ) : recipeList?.length > 0 ? (
            recipeList?.map((item, i) => {
              return (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  image={
                    item.image ||
                    getImagePath(`food/item.image`) ||
                    getImagePath("food/food1.jpg")
                  }
                  profile={item.recipe?.profile}
                  author={item.recipe?.username}
                  difficulty={item.difficulty}
                  time={item.time}
                  category={item.category?.name}
                  onCardClick={() => nav(`/recipes/detail/${item.id}`)}
                  onFavouriteClick={(e) => {
                    e.stopPropagation();
                    createFavourite(item.id);
                  }}
                  onLoadingFavourite={loadingFavouriteId === item.id}
                />
              );
            })
          ) : (
            <h1 className="text-2xl font-bold text-black">
              Data tidak ditemukan
            </h1>
          )}
        </div>

        {/* Pagination */}
        {recipes.totalPage > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="px-3 py-1 border rounded cursor-pointer"
              onClick={() => {
                if (recipes.currentPage <= 1) return;
                setPage(recipes.currentPage - 1);
              }}
            >
              Prev
            </button>
            {Array.from({ length: recipes.totalPage }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${
                    page === p ? "bg-black text-white" : "border"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              className="px-3 py-1 border rounded cursor-pointer"
              onClick={() => {
                if (recipes.currentPage >= recipes.totalPage) return;
                setPage(recipes.currentPage + 1);
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
