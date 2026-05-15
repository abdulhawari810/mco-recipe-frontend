import Card from "@/components/card.component";
import Modal from "@/components/modal.component";
import NoDataFound from "@/components/no_data_found.component";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useState, useEffect } from "react";
import { useSingleRecipes } from "@/hooks/recipes/useSingleRecipes.hooks";
import Filter from "@/components/filter.component";
import { useUpdateStatusRecipes } from "@/hooks/recipes/useUpdateStatusRecipes.hooks";
import { useAllRecipesForAdmin } from "@/hooks/recipes/useAllRecipesForAdmin.hooks";
import { getImagePath } from "@/utils/image.utils";

const statusButtons = [
  {
    label: "Draft",
    value: "draft",
    icon: "ClipboardPen",
    color: "amber",
  },
  {
    label: "Disetujui",
    value: "accept",
    icon: "Check",
    color: "green",
  },
  {
    label: "Pending",
    value: "pending",
    icon: "Clock",
    color: "orange",
  },
  {
    label: "Ditolak",
    value: "reject",
    icon: "X",
    color: "red",
  },
];
const colorClasses = {
  amber: {
    active: "bg-amber-500 text-white",
    inactive: "bg-amber-500/5 text-amber-500",
    hover: "hover:bg-amber-500 hover:text-white",
    outline: "outline-amber-500",
  },

  green: {
    active: "bg-green-500 text-white",
    inactive: "bg-green-500/5 text-green-500",
    hover: "hover:bg-green-500 hover:text-white",
    outline: "outline-green-500",
  },

  orange: {
    active: "bg-orange-500 text-white",
    inactive: "bg-orange-500/5 text-orange-500",
    hover: "hover:bg-orange-500 hover:text-white",
    outline: "outline-orange-500",
  },

  red: {
    active: "bg-red-500 text-white",
    inactive: "bg-red-500/5 text-red-500",
    hover: "hover:bg-red-500 hover:text-white",
    outline: "outline-red-500",
  },
};

export default function RecipeAdminView() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdStatus, setSelectedIdStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [search, setsearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filter, setFilter] = useState({});
  const [filterdebounced, setFilterDebounced] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedBtnStatus, setSelectedBtnStatus] = useState(null);
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const getStatus = searchParams.get("status") || "";

  useEffect(() => {
    setSelectedBtnStatus(getStatus);
  }, [getStatus]);

  const handleFilter = (value) => {
    if (getStatus === value) {
      searchParams({});
    } else {
      setSearchParams({ status: value });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 5000);

    return () => clearTimeout(timer);
  }, [search]);

  const handlefilterChange = () => {
    setFilterDebounced(filter);
    setIsModalOpen(false);
  };

  const { recipe } = useSingleRecipes(selectedId);

  const { updateStatusRecipe } = useUpdateStatusRecipes();

  const { recipesAdmin, loading } = useAllRecipesForAdmin({
    search: debouncedSearchTerm,
    status: selectedBtnStatus,
  });

  return (
    <>
      <main className="flex flex-col bg-white rounded-2xl w-full p-5 gap-5">
        <h1 className="font-bold text-2xl">Daftar Semua Resep</h1>
        <div className="grid grid-cols-2 bg-white w-full">
          <Filter
            selectDefault={false}
            titleSearch="Cari Resep berdasarkan author, judul, atau status..."
            onChange={(filters) => setDebouncedSearchTerm(filters.search)}
            value={debouncedSearchTerm}
          />
          <div className="flex w-full items-center justify-end gap-2">
            {statusButtons.map((btn) => {
              const isActive = selectedBtnStatus === btn.value;
              const colors = colorClasses[btn.color];

              return (
                <button
                  key={btn.value}
                  className={`
        p-3 flex cursor-pointer outline items-center gap-2 rounded-2xl
        ${colors.hover}
        ${colors.outline}
        ${isActive ? colors.active : colors.inactive}
      `}
                  onClick={() => {
                    if (isActive) {
                      // klik button yang sama -> reset
                      setSelectedBtnStatus(null);
                      setStatus("");

                      setSearchParams({});
                    } else {
                      // klik button lain -> pindah active
                      setSelectedBtnStatus(btn.value);
                      setStatus(btn.value);
                      setSearchParams({ status: btn.value });
                    }
                  }}
                >
                  {renderIcon(btn.icon, { className: "w-5 h-5" })}
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap w-full gap-5 mt-5 gap-y-7">
          {Array.isArray(recipesAdmin?.data) &&
          recipesAdmin?.data?.length > 0 ? (
            recipesAdmin?.data?.map((item) => {
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
                  category={item.category.name}
                  onCardClick={() => nav(`/recipes/detail/${item.id}`)}
                  onAcceptClick={(e) => {
                    e.stopPropagation();
                    updateStatusRecipe({
                      id: item.id,
                      status: {
                        status: "accept",
                      },
                    });
                  }}
                  onDraftClick={(e) => {
                    e.stopPropagation();
                    updateStatusRecipe({
                      id: item.id,
                      status: {
                        status: "draft",
                      },
                    });
                  }}
                  onRejectClick={(e) => {
                    e.stopPropagation();
                    updateStatusRecipe({
                      id: item.id,
                      status: {
                        status: "reject",
                      },
                    });
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
      </main>
    </>
  );
}
