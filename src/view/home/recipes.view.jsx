import { useState, useEffect } from "react";
import { useCreateFavourite } from "@/hooks/favourites/useCreateFavourite.hooks";
import Card from "@/components/card.component";
import { useNavigate } from "react-router-dom";
import { useAllRecipes } from "@/hooks/recipes/useAllRecipes.hooks";
import { getImagePath } from "@/utils/image.utils";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import NoDataFound from "@/components/no_data_found.component";
import CardLoading from "@/components/loading/card.loading";

export default function RecipesView() {
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [time, setTIme] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filter, setFilter] = useState({});
  const [filterdebounced, setFilterDebounced] = useState(null);
  const nav = useNavigate();

  const { recipes, error, loadingRecipes } = useAllRecipes({
    query: debouncedSearchTerm,
    category: filterdebounced?.category,
    difficulty: filterdebounced?.difficulty,
    time: filterdebounced?.time,
    page,
  });
  const { createFavourite } = useCreateFavourite();
  const [Loadingsearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setLoadingSearch(false);
      setDebouncedSearchTerm("");
      return;
    }

    setLoadingSearch(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!loadingRecipes) {
      setLoadingSearch(false);
    }
  }, [loadingRecipes]);

  const handlefilterChange = () => {
    setFilterDebounced(filter);
    setIsModalOpen(false);
  };

  const recipeList = recipes?.data;
  const authors = recipeList?.map((item) => item.recipe);

  return (
    <>
      <div className="p-3 sm:p-4 md:p-6 lg:p-6 bg-white rounded-2xl w-full">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">All Recipes</h1>

        {/* Search + Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 px-5 mb-10">
          <div className="w-full flex items-center justify-center gap-5 relative">
            <div className="flex items-center justify-center relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-80 sm:w-[25rem] md:w-[30rem] lg:w-[35rem] h-14 rounded-full bg-white shadow-md outline-none p-4 text-md pr-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {Loadingsearch && (
                <span className="absolute right-5 animate-spin border-3 border-t-transparent w-5 h-5 rounded-full border-orange-500"></span>
              )}
            </div>
            <button
              type="button"
              className={`w-fit h-fit p-3 font-bold rounded-xl hover:bg-orange-500 cursor-pointer hover:text-white shadow-lg text-orange-500 ${!filter || Object.values(filter).every((v) => !v) ? "" : "bg-orange-500 text-white"} text-md`}
              onClick={() => {
                setIsModalOpen(true);
                setModalType("filter");
              }}
            >
              {renderIcon("Filter", { className: "w-5 h-5" })}
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <div
          className="columns-2
         mt-5  sm:flex justify-between items-start sm:flex-wrap w-full space-y-4 lg:space-y-0 md:space-y-0 sm:space-y-0 md:gap-y-4 sm:gap-y-4 lg:gap-y-8"
        >
          {loadingRecipes && !recipeList ? (
            Array.from({ length: 12 }).map((_, i) => {
              return <CardLoading key={i} />;
            })
          ) : recipeList?.length > 0 ? (
            recipeList?.map((item) => {
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
        {recipes?.data?.length > 0 && recipes?.totalPage > 1 && (
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

      <Modal
        isOpen={isModalOpen && modalType === "filter" ? true : false}
        onClose={() => {
          setIsModalOpen(false);
          setModalType("");
        }}
        title="Filter Recipes"
        btnCancel={() => {
          setFilter({ categoryId: "", difficulty: "", time: "" });
          setFilterDebounced({
            categoryId: "",
            difficulty: "",
            time: "",
          });
          setIsModalOpen(false);
          setModalType("");
        }}
        btnConfirm={() => {
          setFilterDebounced(filter);
          setIsModalOpen(false);
          setModalType("");
        }}
        bodyClass="bg-white w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed top-0 px-4 sm:px-8 left-0 w-full h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-50 gap-4 rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={
          !filter || Object.values(filter).every((v) => !v) ? "Close" : "Reset"
        }
        btnTitleConfirm="Apply"
        btnConfirmClass="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
      >
        <select
          className="border rounded-lg px-3 py-2"
          value={filter.category}
          onChange={(e) => {
            setFilter({ ...filter, category: e.target.value });
          }}
        >
          <option value="">All Category</option>
          <option value="food">Food</option>
          <option value="drink">Drink</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={filter.difficulty}
          onChange={(e) => {
            setFilter({ ...filter, difficulty: e.target.value });
          }}
        >
          <option value="">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          className="border rounded-lg px-3 py-2"
          value={filter.time}
          onChange={(e) => {
            setFilter({ ...filter, time: e.target.value });
          }}
        >
          <option value="">All Time</option>
          <option value="10">10 Minutes</option>
          <option value="20">20 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="60">60 Minutes</option>
          <option value="90">90 Minutes</option>
        </select>
      </Modal>
    </>
  );
}
