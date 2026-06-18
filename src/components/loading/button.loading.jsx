import AnimateSpin from "@/components/anime.spin.component";

export default function ButtonLoading({
  title,
  loading,
  onClick,
  type,
  classList,
  hideTitle = false,
}) {
  return (
    <button
      type={type || "button"}
      disabled={loading}
      onClick={onClick}
      className={
        classList ||
        `w-full ${title.toLowerCase() === "logout" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"} text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center gap-3 justify-center cursor-pointer`
      }
    >
      {loading ? (
        <>
          <AnimateSpin />
          {!hideTitle && (
            <span>
              {title.toLowerCase() === "logout"
                ? "Sedang Logout..."
                : title.toLowerCase() === "login"
                  ? "Sedang Login..."
                  : "Tunggu Sebentar..."}
            </span>
          )}
        </>
      ) : (
        <span>{title}</span>
      )}
    </button>
  );
}
