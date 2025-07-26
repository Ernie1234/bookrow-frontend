import { useState, useEffect } from "react";

export function useScrolledPast(offset: number = 0) {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolledPast(window.scrollY > offset);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolledPast;
}
