import headerImage from "@/assets/resource/header.jpg";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header({
  onChange,
  value,
  filterValue,
  onFilterChange,
  onFilterChangeFinal,
  loading,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Filter Recipes"
        bodyClass="bg-white dark:bg-neutral-950 w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 dark:bg-neutral-900 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed px-10 md:px-0 top-0 left-0 w-full h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-100 gap-4 rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={
          !filterValue || Object.values(filterValue).every((v) => !v)
            ? "Close"
            : "Reset"
        }
        btnTitleConfirm="Apply"
        btnConfirmClass="bg-orange-500 dark:text-black text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        btnCancel={() => {
          onFilterChange?.({ category: "", difficulty: "", time: "" });
          onFilterChangeFinal?.({ category: "", difficulty: "", time: "" });
          setIsModalOpen(false);
        }}
        btnConfirm={() => {
          onFilterChangeFinal?.(filterValue);
          setIsModalOpen(false);
        }}
      >
        {/* KATEGORI */}
        <Select
          value={filterValue?.category || ""}
          onValueChange={(value) =>
            onFilterChange?.({ ...filterValue, category: value })
          }
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
          value={filterValue?.difficulty || ""}
          onValueChange={(value) =>
            onFilterChange?.({ ...filterValue, difficulty: value })
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
          value={filterValue?.time || ""}
          onValueChange={(value) =>
            onFilterChange?.({ ...filterValue, time: value })
          }
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
      <header className="relative w-full flex items-center justify-center h-72 md:h-80 lg:h-96 p-4">
        <div className="w-full h-full relative rounded-2xl overflow-hidden">
          <img
            src={headerImage}
            className="w-full relative h-full object-cover"
            alt="Recipe App"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        </div>
        <div className="absolute w-full flex-col flex items-center px-10 justify-center rounded-2xl">
          <div className="text-center text-white mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Recipe Search
            </h1>
            <p className="text-md md:text-lg lg:text-2xl">
              Discover delicious recipes
            </p>
          </div>
          <form className="w-full gap-4 relative md:flex md:w-52 lg:w-52 lg:min-w-150 md:min-w-100 grid grid-cols-3 min-w-full items-center justify-center">
            <div className="flex items-center justify-center gap-2 col-span-2 min-w-full w-full h-14 md:w-96 lg:w-1/2 relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full min-w-full md:w-120 lg:w-140 h-14 rounded-lg bg-white shadow-md dark:bg-neutral-950 outline-none p-4 text-md pr-15"
                value={value}
                onChange={onChange}
              />
              {loading && (
                <span className="absolute right-5 animate-spin border-3 border-t-transparent w-5 h-5 rounded-full border-orange-500"></span>
              )}
            </div>
            <div
              className={`flex cursor-pointer p-4  rounded-lg items-center justify-center ${!filterValue || Object.values(filterValue).every((v) => !v) ? "bg-white text-black dark:bg-neutral-950 dark:text-white" : "bg-orange-500 dark:text-black text-white"}`}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {renderIcon("Filter", {
                className: "w-6 h-6",
              })}
            </div>
          </form>
        </div>
      </header>
    </>
  );
}
