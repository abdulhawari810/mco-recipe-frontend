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
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/pagination.components";

export default function RecipesView() {
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filter, setFilter] = useState({});
  const { favourites } = useAllFavourite();
  const [filterdebounced, setFilterDebounced] = useState(null);
  const nav = useNavigate();

  const { recipes, error, loadingRecipes } = useAllRecipes({
    query: debouncedSearchTerm,
    category: filterdebounced?.category,
    difficulty: filterdebounced?.difficulty,
    time: filterdebounced?.time,
    page,
  });
  const { createFavourite, loadingFavouriteId } = useCreateFavourite();
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

  const selectTriggerClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-sm transition " +
    "focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white " +
    "dark:border-neutral-800 dark:bg-neutral-900 dark:text-orange-500 dark:focus:ring-orange-500 dark:focus:ring-offset-neutral-950";

  const selectContentClass =
    "rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-lg " +
    "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100";

  const selectLabelClass =
    "px-2 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-orange-500";

  const selectItemClass =
    "cursor-pointer rounded-md px-3 py-2 text-neutral-700 outline-none transition " +
    "focus:bg-orange-500 focus:text-white " +
    "data-[highlighted]:bg-orange-500 data-[highlighted]:text-white " +
    "data-[state=checked]:bg-orange-500 data-[state=checked]:text-white " +
    "dark:text-neutral-200 dark:focus:bg-orange-500 dark:focus:text-neutral-950 " +
    "dark:data-[highlighted]:bg-orange-500 dark:data-[highlighted]:text-neutral-950 " +
    "dark:data-[state=checked]:bg-orange-500 dark:data-[state=checked]:text-neutral-950";

  return (
    <>
      <div className="p-3 sm:p-4 md:p-6 lg:p-6 bg-white dark:bg-neutral-900 rounded-2xl w-full">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">All Recipes</h1>

        {/* Search + Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 px-5 mb-10">
          <div className="w-full flex items-center justify-center gap-5 relative">
            <div className="flex items-center justify-center relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-70 sm:w-100 md:w-120 lg:w-140 h-14 rounded-full bg-white dark:bg-neutral-800 shadow-md outline-none p-4 text-md pr-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {Loadingsearch && (
                <span className="absolute right-5 animate-spin border-3 border-t-transparent w-5 h-5 rounded-full border-orange-500"></span>
              )}
            </div>
            <button
              type="button"
              className={`w-fit h-fit p-3 font-bold rounded-xl hover:bg-orange-500 cursor-pointer hover:text-white  shadow-lg text-orange-500 ${!filter || Object.values(filter).every((v) => !v) ? "dark:bg-neutral-800" : "bg-orange-500 text-white dark:text-black"} text-md`}
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
          className={`${loadingRecipes || recipeList?.length > 0 ? "columns-2" : "flex"}
        justify-center md:p-0 md:columns-3 lg:columns-4 items-start w-full space-y-4 md:space-y-5`}
        >
          {loadingRecipes ? (
            Array.from({ length: 12 }).map((_, i) => {
              return <CardLoading key={i} />;
            })
          ) : recipeList?.length > 0 ? (
            recipeList?.map((item) => {
              return (
                <Card
                  key={item.id}
                  itemId={item.id}
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
                  onFavouriteSaved={favourites}
                  onFavouriteClick={(e) => {
                    e.stopPropagation();

                    createFavourite(item.id);
                  }}
                  onLoadingFavourite={loadingFavouriteId === item.id}
                />
              );
            })
          ) : debouncedSearchTerm ? (
            <NoDataFound
              type={"search"}
              error={`Resep ${debouncedSearchTerm} tidak ditemukan`}
            />
          ) : (
            <NoDataFound error={`Tidak Ada Data Ditemukan`} />
          )}
        </div>

        {/* Pagination */}
        {recipes?.data?.length > 0 && recipes?.totalPage > 1 && (
          <Pagination
            btnPrev={recipes.currentPage <= 1}
            btnNext={recipes.currentPage >= recipes.totalPage}
            onClickBtnNext={() => {
              if (recipes.currentPage >= recipes.totalPage) return;
              setPage(recipes.currentPage + 1);
            }}
            onClickBtnPrev={() => {
              if (recipes.currentPage <= 1) return;
              setPage(recipes.currentPage - 1);
            }}
            setPage={setPage}
          >
            {Array.from({ length: recipes.totalPage }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${
                    page === p
                      ? "bg-black text-white dark:bg-orange-500 dark:text-black"
                      : "border"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
          </Pagination>
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
        bodyClass="bg-white dark:bg-neutral-950 w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 dark:bg-neutral-900 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed px-10 md:px-0 top-0 left-0 w-full h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-100 gap-4 rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={
          !filter || Object.values(filter).every((v) => !v) ? "Close" : "Reset"
        }
        btnTitleConfirm="Apply"
        btnConfirmClass="bg-orange-500 dark:text-black text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
      >
        {/* KATEGORI */}
        <Select
          value={filter?.category || ""}
          onValueChange={(value) => setFilter({ ...filter, category: value })}
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Pilih Kategori Makanan" />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>Kategori</SelectLabel>
              <SelectItem className={selectItemClass} value="all">
                Semua Kategori
              </SelectItem>
              <SelectItem className={selectItemClass} value="makanan">
                Makanan
              </SelectItem>
              <SelectItem className={selectItemClass} value="minuman">
                Minuman
              </SelectItem>
              <SelectItem className={selectItemClass} value="dessert">
                Dessert
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* TINGKAT KESULITAN */}
        <Select
          value={filter?.difficulty || ""}
          onValueChange={(value) => setFilter({ ...filter, difficulty: value })}
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Pilih Tingkat Memasak" />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                Tingkat Memasak
              </SelectLabel>

              <SelectItem className={selectItemClass} value="all">
                Semua Tingkatan
              </SelectItem>
              <SelectItem className={selectItemClass} value="easy">
                Mudah
              </SelectItem>
              <SelectItem className={selectItemClass} value="medium">
                Sedang
              </SelectItem>
              <SelectItem className={selectItemClass} value="hard">
                Sulit
              </SelectItem>
              <SelectItem className={selectItemClass} value="extreme">
                Sangat Sulit
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* WAKTU MEMASAK */}
        <Select
          value={filter?.time || ""}
          onValueChange={(value) => setFilter({ ...filter, time: value })}
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Pilih Waktu Memasak" />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                Waktu Memasak
              </SelectLabel>

              <SelectItem className={selectItemClass} value="all">
                Semua Waktu
              </SelectItem>
              <SelectItem className={selectItemClass} value="10">
                10 Menit
              </SelectItem>
              <SelectItem className={selectItemClass} value="20">
                20 Menit
              </SelectItem>
              <SelectItem className={selectItemClass} value="30">
                30 Menit
              </SelectItem>
              <SelectItem className={selectItemClass} value="50">
                50 Menit
              </SelectItem>
              <SelectItem className={selectItemClass} value="100">
                100 Menit
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Modal>
    </>
  );
}
