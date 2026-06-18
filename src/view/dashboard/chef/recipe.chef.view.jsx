import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useRecipesByAuthor } from "@/hooks/recipes/useRecipeByAuthor.hooks";
import Card from "@/components/card.component";
import { useState, useEffect } from "react";
import { useDeleteRecipes } from "@/hooks/recipes/useDeleteRecipes.hooks";
import { useUpdateRecipes } from "@/hooks/recipes/useUpdateRecipes.hooks";
import { useCreateRecipes } from "@/hooks/recipes/useCreateRecipes.hooks";
import FormComponent from "@/components/form.component";
import { useSingleRecipes } from "@/hooks/recipes/useSingleRecipes.hooks";
import { getImagePath } from "@/utils/image.utils";
import CardLoading from "@/components/loading/card.loading";
import NoDataFound from "@/components/no_data_found.component";
import Modal from "@/components/modal.component";
import { useAllCategories } from "@/hooks/categories/useAllCategories.hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function RecipeChefView() {
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [search, setsearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filter, setFilter] = useState({});
  const [filterdebounced, setFilterDebounced] = useState(null);
  const [typeForm, setTypeForm] = useState("create");
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const getStatus = searchParams.get("status") || "";

  useEffect(() => {
    setFilter({ ...filter, status: getStatus });
  }, [getStatus]);

  const handleFilter = (value) => {
    if (getStatus === value) {
      searchParams({});
    } else {
      setSearchParams({ status: value });
    }
  };

  const { recipesByAuthor, loadingRecipesAuthor } = useRecipesByAuthor({
    search: debouncedSearchTerm,
    categoryId: filterdebounced?.categoryId,
    time: filterdebounced?.time,
    difficulty: filterdebounced?.difficulty,
    status: getStatus ? filter?.status : filterdebounced?.status,
  });
  const { deleteRecipes, loadingDeleteRecipes } = useDeleteRecipes();
  const { updateRecipes, loadingUpdateRecipes } = useUpdateRecipes();
  const { createRecipes, loadingCreateRecipes } = useCreateRecipes();
  const { recipe, loadingSingleRecipes } = useSingleRecipes(selectedId);
  const { categories, loadingCategories } = useAllCategories();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handlefilterChange = () => {
    setFilterDebounced(filter);
    setIsModalOpen(false);
  };

  const recipeList = recipesByAuthor?.data;

  return (
    <>
      <main className="flex flex-col bg-white p-4 rounded-2xl">
        <h1 className="font-bold text-2xl mb-5">My Recipes</h1>
        <div className="flex items-center justify-between mb-10">
          <form className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <input
                type="search"
                name="search"
                value={search}
                autoComplete="off"
                onChange={(e) => setsearch(e.target.value)}
                className="w-62.5 lg:w-100 h-14 rounded-full bg-white shadow-md outline-none p-4 text-md pr-12"
                placeholder="Search recipe..."
              />
              {renderIcon("Search", {
                className: "w-5 h-5 absolute text-orange-500 right-5",
              })}
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
          </form>
          <button
            className="w-fit md:relative md:top-0 md:right-0 absolute right-5 top-22 h-fit p-3 md:font-bold font-semibold rounded-xl bg-orange-500 cursor-pointer text-white text-md"
            onClick={() => {
              setTypeForm("create");
              setSelectedId(null);
              setShowForm(true);
            }}
          >
            Tambah Resep
          </button>
        </div>

        <div
          className={`${recipeList?.length > 0 ? "columns-2" : "flex"} mt-5 sm:flex justify-between items-start sm:flex-wrap w-full space-y-4 lg:space-y-0 md:space-y-0 sm:space-y-0 md:gap-y-4 sm:gap-y-4 lg:gap-y-8`}
        >
          {loadingRecipesAuthor && !recipeList ? (
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
                  profile={item.recipes_authors?.profile}
                  author={item.recipes_authors?.username}
                  difficulty={item.difficulty}
                  time={item.time}
                  category={item.category.name}
                  onCardClick={() => nav(`/recipes/detail/${item.id}`)}
                  badgehidden={true}
                  onDeleteClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.id);
                    setIsModalOpen(true);
                    setModalType("confirm-delete");
                  }}
                  onLoadingDelete={
                    selectedId === item.id && loadingDeleteRecipes
                  }
                  onEditClick={(e) => {
                    e.stopPropagation();
                    setTypeForm("update");
                    setShowForm(false);
                    setSelectedId(item.id);
                  }}
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
              );
            })
          ) : debouncedSearchTerm ? (
            <div>
              <NoDataFound
                type={"search"}
                error={`Resep ${debouncedSearchTerm} tidak ditemukan`}
              />
            </div>
          ) : (
            <div>
              <NoDataFound error={`Tidak Ada Data Ditemukan`} />
            </div>
          )}
        </div>

        <FormComponent
          initialData={typeForm === "update" ? recipe : null}
          loadingState={
            typeForm === "update" ? loadingUpdateRecipes : loadingCreateRecipes
          }
          fields={[
            { name: "title", label: "Title", type: "text" },
            { name: "thumbnail", label: "Thumbnail", type: "text" },

            {
              name: "categoryId",
              label: "Category",
              type: "select",
              options:
                categories?.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                })) || [],
            },
            {
              name: "difficulty",
              label: "Difficulty",
              type: "select",
              options: [
                { value: "Mudah", label: "Mudah" },
                { value: "Sedang", label: "Sedang" },
                { value: "Sulit", label: "Sulit" },
              ],
            },
            { name: "time", label: "Time (minutes)", type: "number" },
            {
              name: "ingredients",
              label: "Ingredients",
              type: "multi-text",
            },
            {
              name: "instructions",
              label: "Instructions",
              type: "multi-text",
            },
            { name: "description", label: "Description", type: "textarea" },
          ]}
          defaultForm={{
            title: "",
            description: "",
            categoryId: "",
            difficulty: "",
            time: "",
            ingredients: [""],
            instructions: [""],
          }}
          showForm={
            typeForm === "update" ? selectedId === recipe?.id : showForm
          }
          onClose={() => {
            typeForm === "update" ? setSelectedId(null) : setShowForm(false);
          }}
          title={typeForm === "update" ? "Update Resep" : "Tambah Resep"}
          onSubmit={async (data) => {
            if (typeForm === "create") {
              try {
                await createRecipes({ payload: data });
                setShowForm(false);
                return true;
              } catch (error) {
                console.log(error);
                return false;
              }
            }

            try {
              await updateRecipes({ id: selectedId, payload: data });
              setSelectedId(null);
              return true;
            } catch (error) {
              console.log(error);
              return false;
            }
          }}
        />

        <Modal
          isOpen={isModalOpen && modalType === "confirm-delete" ? true : false}
          onClose={(e) => {
            setIsModalOpen(false);
            setModalType("");
          }}
          btnCancel={() => {
            setSelectedId(null);
            setIsModalOpen(false);
            setModalType("");
          }}
          btnConfirm={() => {
            deleteRecipes(selectedId);
            setIsModalOpen(false);
            setModalType("");
          }}
          btnTitleCancel={"Cancel"}
          bodyClass="bg-white w-full md:w-1/2 rounded-lg overflow-hidden z-1000"
          containerClass="bg-black/50 px-5 md:px-0 fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
          btnTitleConfirm={"Yes, Delete it"}
          title={"Apakah anda yakin ingin menghapus?"}
        >
          <p className="text-md text-slate-700">
            Resep ini akan dihapus permanen dan tidak dapat kembali
          </p>
        </Modal>

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
            !filter || Object.values(filter).every((v) => !v)
              ? "Close"
              : "Reset"
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
            onValueChange={(value) =>
              setFilter({ ...filter, difficulty: value })
            }
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
      </main>
    </>
  );
}
