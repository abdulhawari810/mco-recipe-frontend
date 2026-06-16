import { renderIcon } from "@/utils/icons.utils";
import { useEffect, useRef, useState } from "react";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile.hooks";
import { useCreateProfile } from "@/hooks/profile/useCreateProfile.hooks";
import toast from "react-hot-toast";
import { useProfile } from "@/hooks/profile/useProfile.hooks";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useUploadAvatar } from "@/hooks/upload/useUploadAvatar.hooks";
import { useTranslation } from "react-i18next";

export default function ProfileSection({ users }) {
  const { profile, loadingProfile } = useProfile();
  const { t, i18n } = useTranslation();
  const { updateProfileUsers, loadingUpdateProfile } = useUpdateProfile();
  const { createProfiles, loadingCreateProfile } = useCreateProfile();
  const { createUploadAvatar } = useUploadAvatar();
  const { me, loadingMe } = useAuth();
  const [preview, setPreview] = useState(null);
  const [fileAvatar, setFileAvatar] = useState(null);

  const isProfileExist = !!profile;
  const isSaving = isProfileExist ? loadingUpdateProfile : loadingCreateProfile;

  const [form, setForm] = useState({
    username: me?.username || "",
    email: me?.email || "",
    phone: 0,
    date: null,
    bio: "",
    gender: null,
    preference_food: [],
    alergi_food: [""],
    skill: "",
    profile: null,
    submit: false,
  });
  const [foodInput, setFoodInput] = useState("");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (!me || !profile) return;

    setForm({
      phone: profile?.phone || 0,
      date: formatDateForInput(profile?.date) || null,
      gender: profile?.gender || null,
      bio: profile?.bio || "",

      alergi_food:
        typeof profile?.alergi_food === "string"
          ? JSON.parse(profile.alergi_food || "[]")
          : profile?.alergi_food || [],

      preference_food:
        typeof profile?.preference_food === "string"
          ? JSON.parse(profile.preference_food || "[]")
          : profile?.preference_food || [],

      skill: profile?.skill || "beginner",
      profile: me?.profile || preview || null,
    });
  }, [me, profile]);

  // console.log(preview);

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (preview) {
      setPreview(null);
    }

    setPreview(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append("avatars", selectedFile);
    setFileAvatar(formData);
    setForm({ ...form, submit: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProfileExist) {
      await updateProfileUsers(form);
    } else {
      await createProfiles(form);
    }
    if (fileAvatar) {
      createUploadAvatar(fileAvatar);
    }
    if (preview) {
      setPreview(preview);
    } else {
      setPreview(`${import.meta.env.VITE_BASE_API_UPLOAD}/${form.profile}`);
    }
    setFileAvatar(null);
    setForm({ ...form, submit: false });
  };

  const addField = (fieldName) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: [
        ...(Array.isArray(prev[fieldName]) ? prev[fieldName] : []),
        "",
      ],
      submit: true,
    }));
  };

  const removeField = (fieldName, index) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: Array.isArray(prev[fieldName])
        ? prev[fieldName].filter((_, i) => i !== index)
        : [],
      submit: false,
    }));
  };
  const handleMultiChange = (fieldName, index, value) => {
    const updated = [...form[fieldName]];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      [fieldName]: updated,
      submit: true,
    }));
  };

  const handleAddPreferenceFood = () => {
    setForm((prev) => ({
      ...prev,
      preference_food: [
        ...(Array.isArray(prev.preference_food) ? prev.preference_food : []),
        foodInput,
      ],
      submit: true,
    }));

    setFoodInput("");
  };

  const handleRemovePreferenceFood = (index) => {
    setForm((prev) => ({
      ...prev,
      preference_food: Array.isArray(prev.preference_food)
        ? prev.preference_food.filter((_, i) => i !== index)
        : [],
      submit: false,
    }));
  };
  return (
    <form className="w-full h-full flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 gap-5">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-4">
          {users?.profile !== "default.png" ? (
            <div className="relative">
              <img
                src={
                  preview
                    ? preview
                    : form.profile
                      ? `${import.meta.env.VITE_BASE_API_UPLOAD}/${form.profile}`
                      : "/default-avatar.png"
                }
                alt={users?.username}
                className="w-40 h-40 rounded-full object-cover border-4 border-orange-300 shadow-lg"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                hidden
                onChange={handleChangeFile}
              />

              <button
                type="button"
                onClick={handleClickUpload}
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white dark:text-white dark:bg-orange-500 shadow-md flex items-center cursor-pointer dark:hover:bg-orange-700  text-orange-500  justify-center hover:bg-orange-100 transition"
              >
                {renderIcon("SquarePen", {
                  className: "w-5 h-5",
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

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                hidden
                onChange={handleChangeFile}
              />

              <button
                type="button"
                onClick={handleClickUpload}
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full dark:text-white dark:bg-orange-500 bg-white shadow-md flex items-center cursor-pointer  text-orange-500 justify-center hover:bg-orange-100 dark:hover:bg-orange-700 transition"
              >
                {renderIcon("SquarePen", {
                  className: "w-5 h-5",
                })}
              </button>
            </div>
          )}

          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              {t("common.edit")} {t("common.profile")}
            </h1>
            <p className="text-slate-500 dark:text-orange-200 my-5 text-sm">
              {t("common.complete")} {t("common.information")}{" "}
              {t("common.profile")} {t("common.you")}
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
              onChange={(e) =>
                setForm({ ...form, username: e.target.value, submit: true })
              }
              placeholder=" "
              className="peer w-full h-14  dark:text-orange-300 rounded-xl border border-slate-300 dark:border-orange-500/50 px-4 outline-none focus:border-orange-400 not-placeholder-shown:border-orange-400 dark:focus:border-orange-500 dark:not-placeholder-shown:border-orange-500"
            />

            <label
              htmlFor="username"
              className="absolute left-4 transform text-slate-500 dark:text-orange-100 translate-y-0 text-md transition-all peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-orange-500 dark:peer-not-placeholder-shown:text-orange-500 peer-not-placeholder-shown:text-md peer-focus:-translate-y-7 peer-focus:px-2 peer-focus:bg-white dark:peer-focus:bg-neutral-900 peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500"
            >
              {t("common.username")}
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative group flex items-center justify-center">
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value, submit: true })
              }
              placeholder=" "
              className="peer w-full h-14  dark:text-orange-300 rounded-xl border border-slate-300 dark:border-orange-500/50 px-4 outline-none focus:border-orange-400 not-placeholder-shown:border-orange-400 dark:focus:border-orange-500 dark:not-placeholder-shown:border-orange-500"
            />

            <label
              htmlFor="email"
              className="absolute left-4 transform text-slate-500 dark:text-orange-100 translate-y-0 text-md transition-all peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-orange-500 dark:peer-not-placeholder-shown:text-orange-500 peer-not-placeholder-shown:text-md peer-focus:-translate-y-7 peer-focus:px-2 peer-focus:bg-white dark:peer-focus:bg-neutral-900 peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500"
            >
              {t("common.email_address")}
            </label>
          </div>

          {/* PHONE */}
          <div className="relative group flex items-center justify-center">
            <input
              type="number"
              id="phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value, submit: true })
              }
              placeholder=" "
              className="peer w-full h-14  dark:text-orange-300 rounded-xl border border-slate-300 dark:border-orange-500/50 px-4 outline-none focus:border-orange-400 not-placeholder-shown:border-orange-400 dark:focus:border-orange-500 dark:not-placeholder-shown:border-orange-500"
            />

            <label
              htmlFor="phone"
              className="absolute left-4 transform text-slate-500 dark:text-orange-100 translate-y-0 text-md transition-all peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-orange-500 dark:peer-not-placeholder-shown:text-orange-500 peer-not-placeholder-shown:text-md peer-focus:-translate-y-7 peer-focus:px-2 peer-focus:bg-white dark:peer-focus:bg-neutral-900 peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500"
            >
              {t("common.phone_number")}
            </label>
          </div>

          {/* DATE */}
          <div className="relative">
            <input
              type="date"
              id="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value, submit: true })
              }
              className="peer w-full h-14  dark:text-orange-300 rounded-xl border border-slate-300 dark:border-orange-500/50 px-4 outline-none focus:border-orange-400 not-placeholder-shown:border-orange-400 dark:focus:border-orange-500 dark:not-placeholder-shown:border-orange-500"
            />
          </div>

          {/* SKILL */}
          {users?.role === "chief" && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-700">
                  {t("profile.cooking_level")}
                </label>
                <label className="text-xs font-medium text-slate-700">
                  {t("profile.cooking_paragraph")}
                </label>
              </div>

              <select
                className="w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-orange-400"
                value={form.skill || ""}
                onChange={(e) =>
                  setForm({ ...form, skill: e.target.value, submit: true })
                }
              >
                <option value="" disabled>
                  {t("profile.select_skill")}
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          )}

          {/* GENDER */}
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-slate-700 dark:text-orange-200">
              {t("common.gender")}
            </h2>

            <div className="flex flex-wrap gap-4">
              {[
                {
                  name: "male",
                  label: t("common.male"),
                },
                {
                  name: "female",
                  label: t("common.female"),
                },
              ].map((gender) => {
                return (
                  <label
                    key={gender.name}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border   cursor-pointer ${form.gender === gender.name ? "border-orange-400  dark:text-orange-500" : "border-slate-400 dark:border-orange-500/50"} transition `}
                  >
                    <input
                      type="radio"
                      value={gender.name}
                      checked={form.gender === gender.name}
                      className="accent-orange-500 dark:accent-orange-500"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          gender: e.target.value,
                          submit: true,
                        })
                      }
                    />
                    <span className="capitalize">{gender.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 gap-5">
        {/* FOOD PREFERENCE */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-slate-700 dark:text-orange-200">
            {t("profile.preference_food")}
          </h2>

          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              placeholder={`${t("common.example")}: ${t("common.prawn")}, ${t("common.spicy")}, ${t("common.seafood")}`}
              className="flex-1 min-h-14 rounded-xl border border-slate-300 dark:border-orange-500/50 px-4 outline-none focus:border-orange-400 dark:focus:border-orange-500 dark:text-orange-300"
              name="preference_food"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
            />

            <button
              type="button"
              className="h-14 px-6 rounded-xl bg-orange-500 dark:text-neutral-950 text-white font-medium hover:bg-orange-600 transition"
              onClick={handleAddPreferenceFood}
            >
              {t("common.add")}
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
            <h2 className="font-semibold text-slate-700 dark:text-orange-200">
              {t("profile.alergi_food")}
            </h2>

            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-orange-500 dark:text-neutral-950 text-white font-medium hover:bg-orange-600"
              onClick={() => addField("alergi_food")}
            >
              {t("profile.add_input")}
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
                      placeholder={`${t("common.example")}: ${t("common.prawn")}, ${t("common.spicy")}, ${t("common.seafood")}`}
                      className="flex-1 min-h-14 rounded-xl border border-slate-300 dark:border-orange-500/50 px-4 outline-none focus:border-orange-400 dark:focus:border-orange-500 dark:text-orange-300"
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
          {t("common.btn_cancel")}
        </button>

        <button
          type="submit"
          disabled={!form.submit || isSaving}
          className={`px-6 py-3 rounded-xl dark:text-neutral-950 bg-orange-500 text-white hover:bg-orange-600 transition ${!form.submit || isSaving ? "cursor-not-allowed" : "cursor-pointer"} disabled:opacity-75 enabled:opacity-100 flex items-center gap-2 justify-center`}
        >
          {isSaving && (
            <span className="rounded-full w-5 h-5 border-2 border-t-transparent border-white animate-spin"></span>
          )}

          {isSaving ? (
            <span>{t("profile.loading_save")}</span>
          ) : (
            <span>
              {t("common.save")} {t("common.profile")}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
