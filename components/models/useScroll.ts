import { useEffect } from "react";

type ScrollCallback = (position: number, innerHeight: number) => void;
type ScrollOptions = { global?: boolean };

export default function useScroll(
  callback: ScrollCallback,
  options: ScrollOptions = {}
) {
  useEffect(() => {
    const listener = () => {
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
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [callback, options]);
}
