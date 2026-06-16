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
import Modal from "@/components/modal.component";
import NoDataFound from "@/components/no_data_found.component";
import { useAllCategories } from "@/hooks/categories/useAllCategories.hooks";

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

  const { recipesByAuthor, loading } = useRecipesByAuthor({
    search: debouncedSearchTerm,
    categoryId: filterdebounced?.categoryId,
    time: filterdebounced?.time,
    difficulty: filterdebounced?.difficulty,
    status: getStatus ? filter?.status : filterdebounced?.status,
  });
  const { deleteRecipes } = useDeleteRecipes();
  const { updateRecipes } = useUpdateRecipes();
  const { createRecipes } = useCreateRecipes();
  const { recipe } = useSingleRecipes(selectedId);
  const { categories } = useAllCategories();

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

  if (loading) {
    return (
      <div className="home-view">
        <div className="cards-container mt-5 flex flex-col gap-4">
          <h1 className="text-black font-bold text-2xl">Loading...</h1>
        </div>
      </div>
    );
  }
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
            className="w-fit h-fit p-3 font-bold rounded-xl bg-orange-500 cursor-pointer text-white text-md"
            onClick={() => {
              setTypeForm("create");
              setShowForm(!showForm);
            }}
          >
            Add Recipe
          </button>
        </div>
        <div className="flex flex-wrap w-full gap-5 gap-y-7">
          {Array.isArray(recipeList) && recipeList.length > 0 ? (
            recipeList.map((item) => {
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
                  onDeleteClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.id);
                    setIsModalOpen(true);
                    setModalType("confirm-delete");
                  }}
                  onEditClick={(e) => {
                    e.stopPropagation();
                    setTypeForm("update");
                    setSelectedId(item.id);
                    setShowForm(!showForm);
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
          ) : (
            <NoDataFound error={"Data resep tidak ditemukan"} />
          )}
        </div>
        <FormComponent
          initialData={recipe}
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
          title={typeForm === "update" ? "Edit Recipe" : "Add Recipe"}
          onSubmit={(data) => {
            if (typeForm === "create") {
              createRecipes({ payload: data });
            } else {
              updateRecipes({ id: selectedId, payload: data });
              setSelectedId(null);
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
          bodyClass="bg-white w-1/2 rounded-lg overflow-hidden z-1000"
          containerClass="bg-black/50 fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
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
            setFilter({ categoryId: "", difficulty: "", time: "", status: "" });
            setFilterDebounced({
              categoryId: "",
              difficulty: "",
              time: "",
              status: "",
            });
            setSearchParams({});
            setIsModalOpen(false);
            setModalType("");
          }}
          btnConfirm={() => {
            setSearchParams({ status: filter.status });
            setFilterDebounced(filter);
            setIsModalOpen(false);
            setModalType("");
          }}
          bodyClass="bg-white w-1/2 rounded-lg overflow-hidden z-40"
          titleClass="bg-gray-200 p-4"
          btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
          containerClass="bg-black/50 fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
          customClass="p-4 flex flex-col z-100 gap-4 rounded-lg w-full "
          bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
          btnTitleCancel={
            !filter || Object.values(filter).every((v) => !v)
              ? "Close"
              : "Reset"
          }
          btnTitleConfirm="Apply"
          btnConfirmClass="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
          btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        >
          <select
            value={filter?.categoryId || ""}
            onChange={(e) =>
              setFilter({ ...filter, categoryId: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Semua Kategori</option>
            <option value="1">Makanan</option>
            <option value="2">Minuman</option>
            <option value="3">Dessert</option>
          </select>
          <select
            value={filter?.difficulty || ""}
            onChange={(e) =>
              setFilter({ ...filter, difficulty: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Semua Tingkat Kesulitan</option>
            <option value="easy">Mudah</option>
            <option value="medium">Sedang</option>
            <option value="hard">Sulit</option>
            <option value="extreme">Sangat Sulit</option>
          </select>
          <select
            value={filter?.time || ""}
            onChange={(e) => setFilter({ ...filter, time: e.target.value })}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Semua Rentang Waktu</option>
            <option value="10">10 Menit</option>
            <option value="20">20 Menit</option>
            <option value="30">30 Menit</option>
            <option value="50">50 Menit</option>
            <option value="100">100 Menit</option>
          </select>
          <select
            value={filter?.status || ""}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
            <option value="accept">Disetujui</option>
            <option value="reject">Ditolak</option>
          </select>
        </Modal>
      </main>
    </>
  );
}
