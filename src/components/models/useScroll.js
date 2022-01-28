import { useEffect } from "react";

export default function useScroll(callback, options) {
  useEffect(() => {
    const listener = window.addEventListener("scroll", () => {
      let scroll = -document.body.getBoundingClientRect().top;

      if (scroll < 0) {
        // Handle Safari over-scroll, which can return negative scroll values.
        // (Chrome and Firefox only return positive values here.)
        scroll = 0;
      }

      if (!options?.global) {
        scroll %= window.innerHeight * 2;
      }

      callback(scroll, window.innerHeight);
    });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [callback, options]);
}
