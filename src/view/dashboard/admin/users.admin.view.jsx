import TableComponent from "@/view/dashboard/components/table.component";
import { useState, useEffect } from "react";
import Filter from "@/components/filter.component";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";

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
        <div className="grid grid-cols-1 bg-white w-full">
          <Filter
            selectDefault={false}
            titleSearch="Cari pengguna..."
            onChange={(filters) => setDebouncedSearchTerm(filters.search)}
            value={debouncedSearchTerm}
          >
            <select
              onChange={(e) => setSort(e.target.value)}
              className="outline outline-slate-400 cursor-pointer focus:outline-slate-950 not-placeholder-shown:outline-slate-950 px-3 py-2 rounded-lg"
            >
              <option value="">Semua</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <button
              className="p-2 cursor-pointer outline outline-slate-400 hover:outline-slate-950  rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              {renderIcon("ListFilter", { className: "w-6 h-6" })}
            </button>
          </Filter>
          <div className="flex w-full justify-end items-center gap-2">
            <button
              type="submit"
              className="p-2 bg-orange-500 text-white rounded-lg"
            >
              Export / Import
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-scroll">
          <TableComponent
            search={debouncedSearchTerm}
            sort={sort}
            filter={onFilterChangeFinal}
          />
        </div>
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
        <select
          value={formFilter?.role || ""}
          onChange={(e) =>
            setFormFilter({ ...formFilter, role: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Semua Peran</option>
          <option value="admin">Admin</option>
          <option value="users">User</option>
          <option value="chief">Chef</option>
        </select>
        <select
          value={formFilter?.is_active || ""}
          onChange={(e) =>
            setFormFilter({ ...formFilter, is_active: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Semua Status Aktif</option>
          <option value="active">Aktif</option>
          <option value="in_active">Tidak Aktif</option>
        </select>
        <select
          value={formFilter?.is_verified || ""}
          onChange={(e) =>
            setFormFilter({ ...formFilter, is_verified: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Semua Status Verifikasi</option>
          <option value="verified">Terverifikasi</option>
          <option value="in_verified">Belum Terverifikasi</option>
        </select>
      </Modal>
    </>
  );
}
