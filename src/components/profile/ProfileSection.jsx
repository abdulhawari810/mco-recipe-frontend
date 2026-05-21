import { renderIcon } from "@/utils/icons.utils";

export default function ProfileSection({ users }) {
  return (
    <form className="w-full h-full flex flex-col gap-8">
      <div className="flex flex-col bg-white rounded-2xl shadow-md p-6 gap-5">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-4">
          {users?.profile !== "default.png" ? (
            <div className="relative">
              <img
                src={users?.profile}
                alt={users?.username}
                className="w-40 h-40 rounded-full object-cover border-4 border-orange-300 shadow-lg"
              />

              <button
                type="button"
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-100 transition"
              >
                {renderIcon("SquarePen", {
                  className: "w-5 h-5 text-orange-500",
                })}
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-slate-200 flex items-center justify-center border-4 border-orange-300">
                {renderIcon("User", {
                  className: "w-16 h-16 text-slate-500",
                })}
              </div>

              <button
                type="button"
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-100 transition"
              >
                {renderIcon("SquarePen", {
                  className: "w-5 h-5 text-orange-500",
                })}
              </button>
            </div>
          )}

          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
            <p className="text-slate-500 text-sm">
              Lengkapi informasi profile kamu
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* USERNAME */}
          <div className="relative group flex items-center justify-center">
            <input
              type="text"
              id="username"
              placeholder=" "
              className="peer w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400 not-placeholder-shown:border-orange-400"
            />

            <label
              htmlFor="username"
              className="absolute left-4 transform text-slate-500 translate-y-0 text-md transition-all peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-orange-500 peer-not-placeholder-shown:text-md peer-focus:-translate-y-7 peer-focus:px-2 peer-focus:bg-white peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500"
            >
              Username
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative group flex items-center justify-center">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="peer w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400 not-placeholder-shown:border-orange-400"
            />

            <label
              htmlFor="email"
              className="absolute left-4 transform text-slate-500 translate-y-0 text-md transition-all peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-orange-500 peer-not-placeholder-shown:text-md peer-focus:-translate-y-7 peer-focus:px-2 peer-focus:bg-white peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500"
            >
              Alamat Email
            </label>
          </div>

          {/* PHONE */}
          <div className="relative group flex items-center justify-center">
            <input
              type="number"
              id="phone"
              placeholder=" "
              className="peer w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400 not-placeholder-shown:border-orange-400"
            />

            <label
              htmlFor="phone"
              className="absolute left-4 transform text-slate-500 translate-y-0 text-md transition-all peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-orange-500 peer-not-placeholder-shown:text-md peer-focus:-translate-y-7 peer-focus:px-2 peer-focus:bg-white peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500"
            >
              Nomor Telepon
            </label>
          </div>

          {/* DATE */}
          <div className="relative">
            <input
              type="date"
              id="date"
              className="w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400"
            />
          </div>

          {/* SKILL */}
          {users?.role === "chief" && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-700">
                  TIngkat Memasak
                </label>
                <label className="text-xs font-medium text-slate-700">
                  Pilih tingkat kemampuan memasak kamu
                </label>
              </div>

              <select className="w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400">
                <option value="">Pilih Skill</option>
                <option value="beginner">Beginner</option>
                <option value="medium">Medium</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          )}

          {/* GENDER */}
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-slate-700">Jenis Kelamin</h2>

            <div className="flex flex-wrap gap-4">
              {["female", "male", "transgender"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 cursor-pointer hover:border-orange-400 transition"
                >
                  <input type="radio" value={gender} />
                  <span className="capitalize">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-2xl shadow-md p-6 gap-5">
        {/* FOOD PREFERENCE */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-slate-700">Preferensi Makanan</h2>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Contoh: Pedas, Vegan, Seafood"
              className="flex-1 h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400"
            />

            <button
              type="button"
              className="h-14 px-6 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
            >
              Tambah
            </button>
          </div>

          {/* RESULT BUTTON */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm"
            >
              Vegan
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm"
            >
              Seafood
            </button>
          </div>
        </div>

        {/* FOOD ALLERGIES */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-700">Alergi Makanan</h2>

            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-slate-800 text-white text-sm hover:bg-slate-700"
            >
              Tambah Input
            </button>
          </div>

          {/* DYNAMIC INPUT */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Contoh: Kacang, Udang"
                className="flex-1 h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400"
              />

              <button
                type="button"
                className="w-14 h-14 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* BUTTON */}
      <div className="flex justify-end gap-4 pt-4 sticky bottom-0">
        <button
          type="button"
          className="px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Simpan Profile
        </button>
      </div>
    </form>
  );
}
