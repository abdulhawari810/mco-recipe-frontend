import { useState } from "react";
import Modal from "@/components/modal.component";

export default function SecuritySection() {
  const [buttonStep, setButtonStep] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full bg-white p-6 rounded-2xl">
        <div className="flex items-center mb-5">
          <h1 className="font-bold text-xl">Security</h1>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col w-full gap-2">
            <h1 className="text-lg font-semibold">Password</h1>
            <span className="text-md text-slate-500">
              Set a unique password to protect your account
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className="p-2.5 rounded-full outline outline-slate-500 flex items-center justify-center text-md cursor-pointer text-slate-600"
              onClick={() => {
                setShowModal(true);
                setModalType("password");
              }}
            >
              Change Password
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">2-Step Verification</h1>
            <span className="text-md text-slate-500">
              Make your account extra secure, Along with your password, you'll
              need to enter a code
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 w-15 rounded-full outline ${buttonStep ? "outline-orange-500" : "outline-slate-500"} flex items-center justify-center text-md cursor-pointer text-slate-600`}
              onClick={() => setButtonStep(!buttonStep)}
            >
              <div
                className={`w-5 h-5 rounded-full transform ${buttonStep ? "bg-orange-500 translate-x-3" : "-translate-x-3 bg-slate-500"} transition-transform! duration-300`}
              ></div>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">Restrict Member</h1>
            <span className="text-md text-slate-500">
              This will shut down your account, Your account will be reactive
              when you sign in again
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-slate-600`}
            >
              <span>None</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">Deactive my account</h1>
            <span className="text-md text-slate-500">
              This will shut down your account, Your account will be reactive
              when you sign in again
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-slate-600`}
            >
              <span>Deactive</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">Delete Account</h1>
            <span className="text-md text-slate-500">
              This will delete your account, Your account will be permanently
              deleted from MCO
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-red-500`}
            >
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Change Password"
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
          setModalType("");
        }}
        btnConfirm={() => {
          setShowModal(false);
          setModalType("");
        }}
      >
        <div className="flex flex-col w-2/3 items-center justify-center gap-5">
          <div className="relative w-full  flex items-center justify-center">
            <input
              type="password"
              name="OldPassword"
              id="password"
              placeholder=" "
              className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 outline-slate-400 rounded-lg px-3 h-12"
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className="absolute left-3 transition-all! text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:left-2 peer-focus:text-orange-500 px-2"
            >
              Kata sandi lama
            </label>
          </div>
          <div className="relative w-full  flex items-center justify-center">
            <input
              type="password"
              name="OldPassword"
              id="password"
              placeholder=" "
              className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 outline-slate-400 rounded-lg px-3 h-12"
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className="absolute left-3 transition-all! text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:left-2 peer-focus:text-orange-500 px-2"
            >
              Kata sandi baru
            </label>
          </div>
          <div className="relative w-full  flex items-center justify-center">
            <input
              type="password"
              name="OldPassword"
              id="password"
              placeholder=" "
              className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 outline-slate-400 rounded-lg px-3 h-12"
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className="absolute left-3 transition-all! text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:left-2 peer-focus:text-orange-500 px-2"
            >
              Konfirmasi kata sandi baru
            </label>
          </div>
        </div>
      </Modal>
    </main>
  );
}
