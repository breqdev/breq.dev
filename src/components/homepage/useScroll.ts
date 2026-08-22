import { useEffect } from "react";

export default function useScroll(
  callback: (position: number, innerHeight: number) => void,
) {
  useEffect(() => {
    const listener = () => {
      let scroll = -document.body.getBoundingClientRect().top;

      if (scroll < 0) {
        // Handle Safari over-scroll, which can return negative scroll values.
        // (Chrome and Firefox only return positive values here.)
        scroll = 0;
      }

      callback(scroll, window.innerHeight);
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [callback]);
}
