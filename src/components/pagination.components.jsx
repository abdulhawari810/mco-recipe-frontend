export default function Pagination({
  btnPrev,
  onClickBtnPrev,
  onClickBtnNext,
  btnNext,
  children,
}) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        disabled={btnPrev}
        className={`px-3 py-1 border rounded ${btnPrev ? "opacity-75 cursor-not-allowed" : "bg-orange-500 text-white dark:text-black border-orange-500 cursor-pointer"}`}
        onClick={onClickBtnPrev}
      >
        Prev
      </button>
      {children}
      <button
        disabled={btnNext}
        className={`px-3 py-1 border rounded ${btnNext ? "opacity-75 cursor-not-allowed" : "bg-orange-500 text-white dark:text-black border-orange-500 cursor-pointer"}`}
        onClick={onClickBtnNext}
      >
        Next
      </button>
    </div>
  );
}
