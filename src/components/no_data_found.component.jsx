import notFound from "@/assets/illustration/empty_data.png";
import searchNotFound from "@/assets/illustration/search_not_found.png";

export default function NoDataFound({
  error,
  thumbnail,
  titleClass,
  bodyClass,
  thumbnailClass,
  type = "no-data",
  containerClass,
}) {
  return (
    <div
      className={
        containerClass || "flex w-full flex-col items-center p-3 justify-center"
      }
    >
      <div className={bodyClass || "w-full flex items-center justify-center"}>
        {type === "search" ? (
          <img
            src={thumbnail || searchNotFound}
            alt="Not Found"
            className={
              thumbnailClass || "md:w-60 md:h-60  w-32 h-32 object-contain"
            }
          />
        ) : (
          <img
            src={thumbnail || notFound}
            alt="Not Found"
            className={
              thumbnailClass || "md:w-60 md:h-60  w-32 h-32 object-contain"
            }
          />
        )}
      </div>

      <p
        className={
          titleClass || "text-gray-500 dark:text-orange-200 mt-4 text-xl"
        }
      >
        {error}
      </p>
    </div>
  );
}
