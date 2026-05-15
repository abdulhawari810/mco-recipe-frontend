import headerImage from "@/assets/resource/header.jpg";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useState } from "react";

export default function Header({
  onChange,
  value,
  filterValue,
  onFilterChange,
  onFilterChangeFinal,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Filter Recipes"
        bodyClass="bg-white w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 p-4"
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
        btnConfirmClass="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
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
        <select
          value={filterValue?.category || ""}
          onChange={(e) =>
            onFilterChange?.({ ...filterValue, category: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Semua Kategori</option>
          <option value="makanan">Makanan</option>
          <option value="minuman">Minuman</option>
          <option value="dessert">Dessert</option>
        </select>
        <select
          value={filterValue?.difficulty || ""}
          onChange={(e) =>
            onFilterChange?.({ ...filterValue, difficulty: e.target.value })
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
          value={filterValue?.time || ""}
          onChange={(e) =>
            onFilterChange?.({ ...filterValue, time: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Semua Rentang Waktu</option>
          <option value="10">10 Menit</option>
          <option value="20">20 Menit</option>
          <option value="30">30 Menit</option>
          <option value="50">50 Menit</option>
          <option value="100">100 Menit</option>
        </select>
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
        <div className="absolute w-full flex-col flex items-center justify-center rounded-2xl">
          <div className="text-center text-white mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Recipe Search
            </h1>
            <p className="text-md md:text-lg lg:text-2xl">
              Discover delicious recipes
            </p>
          </div>
          <form className="w-full gap-4 relative flex items-center justify-center">
            <div className="flex items-center justify-center gap-2 w-52 h-14 sm:w-96 md:w-96 lg:w-1/2 relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={value}
                onChange={onChange}
                className="w-full h-full px-4 py-2 pl-12 rounded-lg bg-white outline-2 outline-gray-300 focus:outline-orange-500 transition"
              />
              {renderIcon("Search", {
                className: "absolute left-4 w-6 h-6 text-gray-900",
              })}
            </div>
            <div
              className={`flex cursor-pointer -right-8 p-4  rounded-lg items-center justify-center ${!filterValue || Object.values(filterValue).every((v) => !v) ? "bg-white text-black" : "bg-orange-500 text-white"}`}
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
