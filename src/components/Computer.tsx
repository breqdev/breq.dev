import computerOn from "../assets/drawings/computer-on.svg";
import computerOff from "../assets/drawings/computer-off.svg";
import { useEffect, useState } from "react";

export default function Computer() {
  const [siteUp, setSiteUp] = useState<boolean>();

  useEffect(() => {
    fetch("https://home.breq.dev/", { mode: "no-cors" })
      .then((r) => {
        setSiteUp(true);
      })
      .catch((e) => {
        setSiteUp(false);
      });
  }, []);

  const [ledOn, setLedOn] = useState(false);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick = (tick + 1) % 8;

      if (tick === 0) {
        setLedOn(true);
      } else {
        setLedOn(false);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <a className="max-w-20" href="https://home.breq.dev/">
      <img
        src={siteUp && ledOn ? computerOn.src : computerOff.src}
        alt="computer"
        className="transition-all duration-500"
        style={{
          filter:
            "drop-shadow(0 0 3px rgba(0, 0, 0, .7)) " +
            (siteUp ? "" : "grayscale(100%) brightness(110%)"),
        }}
      />
    </a>
  );
}
