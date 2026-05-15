export default function ButtonLoading({ title, loading, onClick, type }) {
  return (
    <button
      type={type || "button"}
      disabled={loading}
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center gap-3 justify-center"
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
