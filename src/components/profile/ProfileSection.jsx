import { renderIcon } from "@/utils/icons.utils";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile.hooks";
import toast from "react-hot-toast";
import { useProfile } from "@/hooks/profile/useProfile.hooks";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export default function ProfileSection({ users }) {
  const { profile, loadingProfile } = useProfile();
  const { updateProfileUsers, loadingUpdateProfileUsers } = useUpdateProfile();
  const { me, loadingMe } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    date: "",
    gender: "",
    preference_food: [],
    alergi_food: [""],
    skill: "",
    profile: "",
  });
  const [foodInput, setFoodInput] = useState("");

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (profile && me) {
      setForm({
        username: me?.username || "",
        email: me?.email || "",
        phone: profile?.phone || "",
        date: formatDateForInput(profile?.date) || "",
        gender: profile?.gender || "",
        alergi_food:
          typeof profile?.alergi_food === "string"
            ? JSON.parse(profile?.alergi_food)
            : profile?.alergi_food,

        preference_food:
          typeof profile?.preference_food === "string"
            ? JSON.parse(profile?.preference_food)
            : profile?.preference_food,
        skill: profile?.skill || "",
        profile: me?.profile || "",
      });
    }
  }, [profile, me]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileUsers(form);
  };
  console.log(form);

  const addField = (fieldName) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""],
    }));
  };

  const removeField = (fieldName, index) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }));
  };
  const handleMultiChange = (fieldName, index, value) => {
    const updated = [...form[fieldName]];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      [fieldName]: updated,
    }));
  };

  const handleAddPreferenceFood = () => {
    if (foodInput.trim() === "") {
      toast.error("Preferensi makanan tidak boleh kosong!");
      return;
    }
    setForm((prev) => ({
      ...prev,
      preference_food: [...prev.preference_food, foodInput],
    }));

    setFoodInput("");
  };

  const handleRemovePreferenceFood = (index) => {
    setForm((prev) => ({
      ...prev,
      preference_food: prev.preference_food.filter((_, i) => i !== index),
    }));
  };
  return (
    <form className="w-full h-full flex flex-col gap-8" onSubmit={handleSubmit}>
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
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
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

              <select
                className="w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400"
                value={form.skill || ""}
                onChange={(e) => setForm({ ...form, skill: e.target.value })}
              >
                <option value="" disabled>
                  Pilih Skill
                </option>
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
              {["female", "male"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 cursor-pointer hover:border-orange-400 transition"
                >
                  <input
                    type="radio"
                    value={gender}
                    checked={form.gender === gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                  />
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
              name="preference_food"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
            />

            <button
              type="button"
              className="h-14 px-6 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              onClick={handleAddPreferenceFood}
            >
              Tambah
            </button>
          </div>

          {/* RESULT BUTTON */}
          <div className="flex flex-wrap gap-3">
            {Array.isArray(form.preference_food) &&
              form.preference_food.map((item, index) => {
                return (
                  <div className="flex items-center gap-2" key={index}>
                    <span className="p-2 rounded-full bg-orange-500/5 text-orange-500">
                      {item}
                    </span>
                    <button
                      type="button"
                      className="flex items-center justify-center p-2 text-red-500 bg-red-500/5 rounded-full cursor-pointer"
                      onClick={() => handleRemovePreferenceFood(index)}
                    >
                      {renderIcon("X", { className: "w-5 h-5" })}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* FOOD ALLERGIES */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-700">Alergi Makanan</h2>

            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-slate-800 text-white text-sm hover:bg-slate-700"
              onClick={() => addField("alergi_food")}
            >
              Tambah Input
            </button>
          </div>

          {/* DYNAMIC INPUT */}
          <div className="flex flex-col gap-3">
            {Array.isArray(form["alergi_food"]) &&
              form["alergi_food"].map((item, index) => {
                return (
                  <div className="flex gap-3" key={index}>
                    <input
                      type="text"
                      placeholder="Contoh: Kacang, Udang"
                      className="flex-1 h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400"
                      value={item}
                      onChange={(e) =>
                        handleMultiChange("alergi_food", index, e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="w-14 h-14 rounded-xl bg-red-500 text-white hover:bg-red-600"
                      onClick={() => removeField("alergi_food", index)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
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
