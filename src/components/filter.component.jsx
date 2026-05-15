import { useState } from "react";
import { renderIcon } from "@/utils/icons.utils";

export default function Filter({
  onChange,
  children,
  value,
  titleSearch,
  selectDefault,
}) {
  const [filters, setFilters] = useState({
    search: value || "",
    category: "",
    sort: "latest",
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // kirim ke parent
    onChange?.(newFilters);
  };

  return (
    <div className="flex w-full flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative w-full flex items-center justify-center">
        <input
          type="text"
          placeholder={titleSearch || "Cari resep..."}
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="peer outline outline-slate-400 focus:outline-slate-950 not-placeholder-shown:outline-slate-950 px-10 py-2 rounded-lg w-full"
          id="search"
        />
        <label
          htmlFor="search"
          className="absolute text-slate-400 peer-focus:text-slate-950 peer-not-placeholder-shown:text-slate-950 left-2.5"
        >
          {renderIcon("Search", {
            className: "w-5 h-5 ",
          })}
        </label>
      </div>

      {selectDefault && (
        <>
          {/* Category */}
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="outline outline-slate-400 focus:outline-slate-950 not-placeholder-shown:outline-slate-950 px-3 py-2 rounded-lg"
          >
            <option value="">Semua Kategori</option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
            <option value="dessert">Dessert</option>
          </select>

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="outline outline-slate-400 focus:outline-slate-950 not-placeholder-shown:outline-slate-950 px-3 py-2 rounded-lg"
          >
            <option value="latest">Terbaru</option>
            <option value="popular">Terpopuler</option>
          </select>
        </>
      )}

      {children}
    </div>
  );
}
