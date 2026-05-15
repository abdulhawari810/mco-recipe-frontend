// src/components/RecipeCarousel.jsx
import { useState } from "react";

export default function Carousel({ images = [], onError }) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  if (!images?.length) return null;

  return (
    <div className="relative w-full">
      {/* Image */}
      <img
        src={images[current]}
        alt="recipe"
        className="w-full h-72 md:h-96 object-cover rounded-2xl"
        onError={(e) => {
          e.target.src = "https://picsum.photos/600/400";
        }}
      />

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.isArray(images) &&
          images.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
      </div>
    </div>
  );
}
