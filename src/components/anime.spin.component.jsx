export default function AnimateSpin({ width, height }) {
  return (
    <span
      className={` ${width || height ? "md:w-10 md:h-10 w-10 h-10" : "md:w-10 md:h-10 w-6 h-6"} flex items-center justify-center`}
    >
      <span
        className={`${width ? `w-${width}` : "w-5"} ${height ? `h-${height}` : "h-5"}  rounded-full ${width || height ? "border-4" : "border-2"} border-t-transparent border-white animate-spin`}
      ></span>
    </span>
  );
}
