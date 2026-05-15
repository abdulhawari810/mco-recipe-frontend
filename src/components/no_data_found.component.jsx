import notFound from "@/assets/illustration/empty_data.png";

export default function NoDataFound({
  error,
  thumbnail,
  titleClass,
  bodyClass,
  thumbnailClass,
  children,
  containerClass,
}) {
  return (
    <div
      className={
        containerClass || "flex w-full flex-col items-center p-3 justify-center"
      }
    >
      <img
        src={thumbnail || notFound}
        alt="Not Found"
        className={thumbnailClass || "w-32 h-32 object-contain"}
      />
      <p className={titleClass || "text-gray-500 mt-4 text-xl"}>{error}</p>
      <div className={bodyClass || "w-full"}></div>
    </div>
  );
}
