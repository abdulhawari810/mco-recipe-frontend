import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useState } from "react";

export default function LanguageSection() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full bg-white p-6 rounded-2xl">
        <div className="grid grid-cols-2">
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-lg font-semibold">Change Language</h1>
            <span className="text-md text-slate-500">
              This will change the language for this website only; it will not
              affect your browser's default language settings.
            </span>
          </div>
          <button
            type="button"
            className="flex items-center cursor-pointer justify-end"
            onClick={() => setShowModal(true)}
          >
            <span className="text-md font-semibold">Indonesian</span>
            {renderIcon("ChevronRight", { className: "w-5 h-5" })}
          </button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Ganti Bahasa"
        bodyClass="bg-white w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed px-10 md:px-0 top-0 left-0 w-full h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-100 gap-4 items-center justify-center rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={"Batalkan"}
        btnTitleConfirm="Konfirmasi"
        btnConfirmClass="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        btnCancel={() => {
          setShowModal(false);
        }}
        btnConfirm={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col w-2/3 items-center gap-2">
          <div className="relative w-full flex items-center justify-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder=" "
              className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 outline-slate-400 rounded-lg px-3 pl-10 h-12"
              autoComplete="off"
            />
            {renderIcon("Search", {
              className:
                "w-5 h-5 absolute left-3 peer-focus:text-orange-500 peer-not-placeholder-shown:text-orange-500",
            })}
            <label
              htmlFor="search"
              className="absolute left-8 transition-all! text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:left-2 peer-focus:text-orange-500 px-2"
            >
              Cari Bahasa
            </label>
          </div>
          <div className="flex flex-col w-full h-80">
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700">
              Inggris
            </button>
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700">
              Indonesia
            </button>
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700">
              Japanese
            </button>
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700">
              Korean
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
