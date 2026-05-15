import { useState, useEffect } from "react";

const FormComponent = ({
  initialData,
  showForm,
  fields = [],
  defaultForm = {},
  onClose,
  onSubmit,
  title,
}) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
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

      setForm((prev) => ({
        ...prev,
        ...parsed,
      }));
    }
  }, [initialData, fields]);

  // handle basic input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  // handle close button
  const handleClose = () => {
    setForm(defaultForm); // reset semua field
    onClose(); // tutup modal
  };

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

  const handleMultipleImages = (e) => {
    setForm((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(defaultForm);
    onClose();
  };

  // console.log("form", initialData["username"]);

  // console.log("form", JSON.stringify(InitialForm));

  return (
    <main
      className={`fixed top-0 left-0 z-1000 bg-black/30 w-full h-screen p-10 ${showForm ? "scale-100" : "scale-0"}`}
    >
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-6 p-6 py-8 w-full h-full bg-white rounded-2xl shadow-sm"
      >
        <h1 className="w-full border-b border-slate-400 pb-5 text-xl font-bold">
          {initialData?.title || title || "Update Recipes"}
        </h1>
        <div className="flex flex-col gap-4 overflow-y-scroll p-2 min-h-0 h-100">
          {/* Top Inputs */}
          <div className="grid grid-cols-4 gap-4">
            {fields.map((field) => {
              // INPUT
              if (field.type === "text" || field.type === "email") {
                return (
                  <div key={field.name} className="w-full h-full">
                    <label className="font-semibold">{field.label}</label>

                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                );
              }
              // NUMBER
              if (field.type === "number") {
                return (
                  <div key={field.name} className="w-full h-full">
                    <label className="font-semibold">{field.label}</label>

                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                );
              }
              // SELECT
              if (field.type === "select") {
                return (
                  <div key={field.name}>
                    <label>{field.label}</label>

                    <select
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      className="input"
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

              // MULTI TEXT
              if (field.type === "multi-text") {
                return (
                  <div key={field.name}>
                    <p className="font-semibold">
                      {field.label} ({form[field.name]?.length})
                    </p>

                    {Array.isArray(form[field.name]) &&
                      form[field.name].map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
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
                            className="input"
                          />

                          <button
                            type="button"
                            onClick={() => removeField(field.name, index)}
                            className="text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                    <button
                      type="button"
                      onClick={() => addField(field.name)}
                      className="text-orange-500"
                    >
                      + Add {field.label}
                    </button>
                  </div>
                );
              }

              // TEXTAREA
              if (field.type === "textarea") {
                return (
                  <div key={field.name}>
                    <label>{field.label}</label>

                    <textarea
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      className="input min-h-40 py-3 w-full resize-none"
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 left-0 w-full bg-white pt-4 flex justify-end gap-2 border-slate-400 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            {title || "Update Recipe"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default FormComponent;
