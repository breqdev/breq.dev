import { useRef, type ReactNode } from "react";
import useScroll from "./useScroll";

export default function ScrollDownHint({ children }: { children: ReactNode }) {
  const iconRef = useRef<HTMLDivElement>(null);

  useScroll((scroll) => {
    if (iconRef.current) {
      if (scroll > 1) {
        iconRef.current.style.opacity = "0";
      } else {
        iconRef.current.style.opacity = "1";
      }
    }
  });

  const handleScroll = () => window.scrollBy({ top: 200, behavior: "smooth" });

  return (
    <div
      className="absolute bottom-0 left-0 right-0 mb-32 text-center text-8xl transition-opacity duration-300"
      ref={iconRef}
    >
      <button
        className="outline-none transition-colors duration-300 text-white focus:text-panyellow"
        onClick={handleScroll}
      >
        {children}
      </button>
    </div>
  );
}
