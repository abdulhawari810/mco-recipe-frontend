import { renderIcon } from "@/utils/icons.utils";
import { useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import AnimateSpin from "./anime.spin.component";

const Card = ({
  image,
  title,
  description,
  difficulty,
  time,
  badge,
  onCardClick,
  onFavouriteClick,
  onFavouriteSaved,
  onLoadingFavourite,
  onLoadingDelete,
  onEditClick,
  onDeleteClick,
  onAcceptClick,
  onDraftClick,
  onRejectClick,
  profile,
  category,
  author,
  badgehidden,
  itemId,
}) => {
  const { me } = useAuth();

  let saved = null;
  if (me?.role === "users") {
    saved = onFavouriteSaved.find((f) => f.recipeId === itemId);
  }

  return (
    <div
      className="bg-white dark:bg-neutral-800 break-inside-avoid rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative"
      onClick={onCardClick}
    >
      <div
        className={`absolute w-full flex items-center ${badge && onFavouriteClick ? "justify-between" : onFavouriteClick ? "justify-end" : ""} gap-2`}
      >
        {badge !== "Ditolak" && onEditClick && (
          <button
            className=" items-center z-10 p-2 bg-gray-900 hover:bg-orange-500 cursor-pointer rounded-br-lg justify-center text-white top-0 left-0"
            onClick={onEditClick}
          >
            {renderIcon("SquarePen", { className: "w-6 h-6" })}
          </button>
        )}
        {badge === "Pending" ? (
          <div className="absolute w-fit gap-2 top-0 right-0 bg-gray-950/20 p-2 flex items-center justify-center">
            {onAcceptClick && (
              <button
                className=" flex items-center z-10 p-2 rounded-2xl bg-green-500 hover:bg-green-700 cursor-pointer rounded-bl-lg justify-center text-white"
                onClick={onAcceptClick}
              >
                {renderIcon("Check", { className: "w-6 h-6" })}
              </button>
            )}
            {onDraftClick && (
              <button
                className=" flex items-center z-10 p-2 rounded-2xl bg-amber-500 hover:bg-amber-700 cursor-pointer rounded-bl-lg justify-center text-white"
                onClick={onDraftClick}
              >
                {renderIcon("ClipboardPen", { className: "w-6 h-6" })}
              </button>
            )}
            {onRejectClick && (
              <button
                className=" flex items-center z-10 p-2 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer rounded-bl-lg justify-center text-white"
                onClick={onRejectClick}
              >
                {renderIcon("X", { className: "w-6 h-6" })}
              </button>
            )}
          </div>
        ) : (
          badge === "Draft" && (
            <div className="absolute w-fit gap-2 top-0 right-0 bg-amber-500/20 p-2 flex items-center justify-center">
              {onAcceptClick && (
                <button
                  className=" flex items-center z-10 p-2 rounded-2xl bg-green-500 hover:bg-green-700 cursor-pointer rounded-bl-lg justify-center text-white"
                  onClick={onAcceptClick}
                >
                  {renderIcon("Check", { className: "w-6 h-6" })}
                </button>
              )}
              {onRejectClick && (
                <button
                  className=" flex items-center z-10 p-2 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer rounded-bl-lg justify-center text-white"
                  onClick={onRejectClick}
                >
                  {renderIcon("X", { className: "w-6 h-6" })}
                </button>
              )}
            </div>
          )
        )}
        {badge && (
          <div
            className={`flex items-center gap-2 z-10 p-2 ${badge === "Pending" ? "bg-orange-500" : badge === "Disetujui" ? "bg-green-500" : badge === "Draft" ? "bg-amber-500" : "bg-red-500"} cursor-pointer  justify-center text-white top-0 left-0 ${badge === "Ditolak" ? "rounded-br-lg" : "rounded-b-lg"}`}
          >
            {badge === "Pending"
              ? renderIcon("Clock", { className: "w-5 h-5" })
              : badge === "Disetujui"
                ? renderIcon("Check", { className: "w-5 h-5" })
                : badge === "Draft"
                  ? renderIcon("ClipboardPen", { className: "w-5 h-5" })
                  : badge === "Ditolak"
                    ? renderIcon("X", { className: "w-5 h-5" })
                    : null}
            <span className={`${badgehidden ? "hidden" : "flex"}`}>
              {badge}
            </span>
          </div>
        )}
        {onDeleteClick && (
          <button
            className="absolute flex items-center z-10 p-2 bg-red-500 hover:bg-red-700 cursor-pointer rounded-bl-lg justify-center text-white top-0 right-0"
            onClick={onDeleteClick}
          >
            {onLoadingDelete ? (
              <AnimateSpin />
            ) : (
              <div>{renderIcon("Trash", { className: "w-6 h-6" })}</div>
            )}
          </button>
        )}
        {onFavouriteClick && (
          <button
            className={`flex items-center group z-20 p-2 bg-gray-900 cursor-pointer rounded-bl-lg justify-center  top-0 right-0 ${saved ? " text-orange-500" : " text-white  hover:text-orange-500"}`}
            onClick={onFavouriteClick}
          >
            {onLoadingFavourite ? (
              <AnimateSpin />
            ) : (
              <div>
                {renderIcon("Heart", {
                  className: `w-6 h-6 ${saved ? "fill-orange-500" : "group-hover:fill-orange-500"}`,
                })}
              </div>
            )}
          </button>
        )}
      </div>
      <div className="relative w-full h-32 sm:h-44 md:h-44 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-2">
        <h3 className="text-xs md:text-sm font-medium text-gray-500 dark:text-orange-200 mb-2">
          {category}
        </h3>
        <h3 className="text-sm md:text-md md:mb-2 lg:text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-orange-200 text-sm mb-2 md:mb-4 truncate">
          {description}
        </p>
        <div className="flex items-center flex-wrap gap-2">
          <span
            className={`outline p-1 rounded-lg text-xs md:text-sm lg:text-md ${time <= 10 ? "outline-1 outline-green-500 bg-green-500/3  text-green-500" : time <= 30 ? "outline-1 outline-orange-500 bg-orange-500/3  text-orange-500" : "outline-1 outline-red-500 bg-red-500/3  text-red-500"}`}
          >
            {time} Minutes
          </span>
          <span
            className={`outline p-1 rounded-lg text-xs md:text-sm lg:text-md ${difficulty.toLowerCase() === "easy" ? "outline-1 outline-green-500 bg-green-500/3  text-green-500" : difficulty.toLowerCase() === "medium" ? "outline-1 outline-orange-500 bg-orange-500/3  text-orange-500" : "outline-1 outline-red-500 bg-red-500/3  text-red-500"}`}
          >
            {difficulty}
          </span>
        </div>
        <div className="w-full mt-5 gap-1 pr-2 flex items-center justify-end">
          {renderIcon("Star", {
            className: "w-4 h-4 text-orange-500 fill-orange-500",
          })}
          <span className="text-sm font-bold text-gray-900 dark:text-orange-500 lg:text-md">
            5
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
