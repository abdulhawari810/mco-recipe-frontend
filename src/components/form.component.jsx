import { useState, useEffect } from "react";
import AnimateSpin from "./anime.spin.component";

const FormComponent = ({
  initialData,
  showForm,
  fields = [],
  defaultForm = {},
  onClose,
  onSubmit,
  loadingState,
  title,
}) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!showForm) return;

    if (!initialData) {
      setForm(defaultForm);
      return;
    }

    const parsed = { ...initialData };

    fields.forEach((field) => {
      if (
        field.type === "multi-text" &&
        typeof parsed[field.name] === "string"
      ) {
        try {
          parsed[field.name] = JSON.parse(parsed[field.name]);
        } catch {
          parsed[field.name] = [""];
        }
      }
    });

    setForm({
      ...defaultForm,
      ...parsed,
    });
  }, [initialData, showForm]);

  const inputClass =
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-orange-500";

  const labelClass =
    "mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-200";

  const fieldWrapperClass = "w-full space-y-1";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setForm(defaultForm);
    onClose?.();
  };

  const addField = (fieldName) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), ""],
    }));
  };

  const removeField = (fieldName, index) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }));
  };

  const handleMultiChange = (fieldName, index, value) => {
    const updated = [...(form[fieldName] || [])];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      [fieldName]: updated,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await onSubmit?.(form);

    if (success !== false) {
      setForm(defaultForm);
    }
  };

  if (!showForm) return null;

  console.log(loadingState);

  return (
    <main className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-3 sm:p-5 lg:p-8">
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-950"
      >
        {/* Header */}
        <div className="border-b border-neutral-200 px-4 py-4 sm:px-6 dark:border-neutral-800">
          <h1 className="text-lg font-bold text-neutral-900 sm:text-xl dark:text-neutral-100">
            {initialData?.title || title || "Update Recipes"}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Lengkapi data dengan benar sebelum menyimpan perubahan.
          </p>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fields.map((field) => {
              if (
                field.type === "text" ||
                field.type === "email" ||
                field.type === "number"
              ) {
                return (
                  <div key={field.name} className={fieldWrapperClass}>
                    <label className={labelClass}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                );
              }

              if (field.type === "select") {
                return (
                  <div key={field.name} className={fieldWrapperClass}>
                    <label className={labelClass}>{field.label}</label>
                    <select
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Pilih {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === "textarea") {
                return (
                  <div
                    key={field.name}
                    className="w-full space-y-1 md:col-span-2 xl:col-span-4"
                  >
                    <label className={labelClass}>{field.label}</label>
                    <textarea
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      className={`${inputClass} min-h-40 resize-none`}
                    />
                  </div>
                );
              }

              if (field.type === "multi-text") {
                return (
                  <div
                    key={field.name}
                    className="w-full space-y-3 md:col-span-2 xl:col-span-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                        {field.label}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Total item: {form[field.name]?.length || 0}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {Array.isArray(form[field.name]) &&
                        form[field.name].map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) =>
                                handleMultiChange(
                                  field.name,
                                  index,
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                            />

                            <button
                              type="button"
                              onClick={() => removeField(field.name, index)}
                              className="shrink-0 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addField(field.name)}
                      className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      + Add {field.label}
                    </button>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-6 dark:border-neutral-800 dark:bg-neutral-950">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loadingState}
            className="rounded-xl bg-orange-500 flex items-center justify-center px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            {loadingState ? (
              <div className="flex items-center gap-5 md:gap-2">
                <AnimateSpin />
                <span>
                  {title === "Tambah Resep"
                    ? "Sedang Menambah..."
                    : "Sedang Mengupdate..."}
                </span>
              </div>
            ) : (
              <span> {title || "Update Recipe"}</span>
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default FormComponent;
