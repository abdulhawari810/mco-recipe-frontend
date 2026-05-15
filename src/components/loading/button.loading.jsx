export default function ButtonLoading({ title, loading, onClick, type }) {
  return (
    <button
      type={type || "button"}
      disabled={loading}
      onClick={onClick}
      className={`w-full ${title.toLowerCase() === "logout" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"} text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center gap-3 justify-center cursor-pointer`}
    >
      {loading ? (
        <>
          <span className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
          <span>
            {title.toLowerCase() === "logout"
              ? "Tunggu..."
              : "Tunggu Sebentar..."}
          </span>
        </>
      ) : (
        <span>{title}</span>
      )}
    </button>
  );
}
