import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useState } from "react";

export default function ThemeSection() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full bg-white p-6 rounded-2xl">
        <div className="grid grid-cols-2">
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-lg font-semibold">Change Theme</h1>
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
        title="Ganti Tema"
        bodyClass="bg-white w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-slate-100 p-4"
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
          <div className="flex flex-col w-full h-80">
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700 gap-2">
              <div className="rounded-full w-5 h-5 bg-orange-500"></div>
              <span> Default</span>
            </button>
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700 gap-2">
              <div className="rounded-full w-5 h-5 bg-black"></div>
              <span> Gelap</span>
            </button>
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700 gap-2">
              <div className="rounded-full w-5 h-5 bg-green-500"></div>
              <span> Hijau</span>
            </button>
            <button className="w-full cursor-pointer flex items-center hover:bg-slate-200 justify-start p-3 ftext-lg text-slate-700 gap-2">
              <div className="rounded-full w-5 h-5 bg-yellow-500"></div>
              <span> Kuning</span>
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
