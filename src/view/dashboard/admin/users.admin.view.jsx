import TableComponent from "@/view/dashboard/components/table.component";
import { useState, useEffect } from "react";
import Filter from "@/components/filter.component";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
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
  "w-full h-12 rounded-lg border border-slate-300 bg-white px-4 text-slate-800 shadow-sm focus:ring-2 focus:ring-orange-500";

const selectContentClass =
  "rounded-lg border border-slate-200 bg-white text-slate-800 shadow-lg";

const selectItemClass =
  "cursor-pointer focus:bg-orange-50 focus:text-orange-600";

export default function UsersAdminView() {
  const [formFilter, setFormFilter] = useState({
    role: "",
    is_active: "",
    is_verified: "",
  });
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [onFilterChangeFinal, setOnFilterChangeFinal] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <>
      <main className="flex flex-col bg-white rounded-2xl w-full p-5 gap-5">
        <h1 className="font-bold text-2xl">Daftar Users</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_110px_52px_auto] md:items-center">
          <div className="relative">
            {renderIcon("Search", {
              className:
                "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400",
            })}

            <input
              value={debouncedSearchTerm}
              onChange={(e) => setDebouncedSearchTerm(e.target.value)}
              placeholder="Cari pengguna..."
              className="w-full h-12 rounded-lg border border-slate-300 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Semua" />
            </SelectTrigger>

            <SelectContent className={selectContentClass}>
              <SelectGroup>
                <SelectLabel>Urutkan</SelectLabel>
                <SelectItem className={selectItemClass} value="all">
                  Semua
                </SelectItem>
                <SelectItem className={selectItemClass} value="asc">
                  A-Z
                </SelectItem>
                <SelectItem className={selectItemClass} value="desc">
                  Z-A
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <button
            className="h-12 w-full md:w-12 flex items-center justify-center rounded-lg border border-slate-300 hover:border-orange-500 hover:text-orange-500"
            onClick={() => setIsModalOpen(true)}
          >
            {renderIcon("ListFilter", { className: "w-6 h-6" })}
          </button>

          <button className="h-12 rounded-lg bg-orange-500 px-4 text-white hover:bg-orange-600">
            Export / Import
          </button>
        </div>
        <TableComponent
          search={debouncedSearchTerm}
          sort={sort === "all" ? "" : sort}
          filter={onFilterChangeFinal}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Filter Users"
        bodyClass="bg-white md:w-1/2 lg:w-1/2 w-full rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed top-0 left-0 w-full px-10 md:px-0 lg:px-0 h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-100 gap-4 rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={
          !formFilter || Object.values(formFilter).every((v) => !v)
            ? "Close"
            : "Reset"
        }
        btnTitleConfirm="Apply"
        btnConfirmClass="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        btnCancel={() => {
          setFormFilter({
            role: "",
            is_active: "",
            is_verified: "",
          });
          setOnFilterChangeFinal({
            role: "",
            is_active: "",
            is_verified: "",
          });
          setSearchTerm("");
          setIsModalOpen(false);
        }}
        btnConfirm={() => {
          setOnFilterChangeFinal(formFilter);
          setIsModalOpen(false);
        }}
      >
        {/* SELECT ROLE */}
        <Select
          value={formFilter?.role || ""}
          onValueChange={(value) =>
            setFormFilter({ ...formFilter, role: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Semua Peran" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem className={selectItemClass} value="all">
              Semua Peran
            </SelectItem>
            <SelectItem className={selectItemClass} value="admin">
              Admin
            </SelectItem>
            <SelectItem className={selectItemClass} value="users">
              User
            </SelectItem>
            <SelectItem className={selectItemClass} value="chief">
              Chef
            </SelectItem>
          </SelectContent>
        </Select>
        {/* SELECT IS ACTIVE */}
        <Select
          value={formFilter?.is_active || ""}
          onValueChange={(value) =>
            setFormFilter({ ...formFilter, is_active: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Semua Peran" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem className={selectItemClass} value="all">
              Semua Status
            </SelectItem>
            <SelectItem className={selectItemClass} value="active">
              Aktif
            </SelectItem>
            <SelectItem className={selectItemClass} value="in_active">
              Tidak Aktif
            </SelectItem>
          </SelectContent>
        </Select>

        {/* SELECT VERIFY  */}
        <Select
          value={formFilter?.is_verified || ""}
          onValueChange={(value) =>
            setFormFilter({ ...formFilter, is_verified: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Semua Peran" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem className={selectItemClass} value="all">
              Semua Status
            </SelectItem>
            <SelectItem className={selectItemClass} value="verified">
              Sudah Verifikasi
            </SelectItem>
            <SelectItem className={selectItemClass} value="in_verified">
              Belum Verifikasi
            </SelectItem>
          </SelectContent>
        </Select>
      </Modal>
    </>
  );
}
