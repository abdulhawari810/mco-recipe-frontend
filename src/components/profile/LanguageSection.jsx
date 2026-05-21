import { renderIcon } from "@/utils/icons.utils";

export default function LanguageSection() {
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
          >
            <span className="text-md font-semibold">Indonesian</span>
            {renderIcon("ChevronRight", { className: "w-5 h-5" })}
          </button>
        </div>
      </div>
    </main>
  );
}
