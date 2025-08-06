import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

export type TBookCategory = {
  id: string;
  name: string;
  icon: string; // Can be an image URL or icon name
};

export type TCategoryScrollProps = {
  categories: TBookCategory[];
  activeCategory?: string;
  onCategorySelect?: (id: string) => void;
};

export const BookCategoryScroll: React.FC<TCategoryScrollProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); // -1 for floating point precision
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust scroll distance as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [categories]);

  return (
    <div className="group relative">
      {/* Left arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="top-1/2 left-0 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 opacity-0 group-hover:opacity-100 shadow-md rounded-full w-8 h-8 transition-all -translate-y-1/2"
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 px-2 pb-4 overflow-x-auto scroll-smooth hide-scrollbar"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect?.(category.id)}
            className={`flex flex-col items-center justify-center shrink-0 w-18 h-18 rounded-lg p-3 transition-all ${
              activeCategory === category.id
                ? "bg-amber-100 border-2 border-amber-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="mb-2 text-2xl">
              {category.icon.startsWith("http") ? (
                <img
                  src={category.icon}
                  alt={category.name}
                  className="rounded-full w-10 h-10 object-cover"
                />
              ) : (
                <span>{category.icon}</span>
              )}
            </div>
            <span className="font-medium text-xs text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Right arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="top-1/2 right-0 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 opacity-0 group-hover:opacity-100 shadow-md rounded-full w-8 h-8 transition-all -translate-y-1/2"
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
};
