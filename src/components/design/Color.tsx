import { useState } from "react";

function useDarkText(bgColor: string) {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179;
}

export default function Color({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="group relative grid h-32 w-32 place-content-end px-1 py-0.5 font-mono text-lg"
      style={{
        backgroundColor: hex,
        color: useDarkText(hex) ? "#000" : "#fff",
      }}
      onClick={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        navigator.clipboard.writeText(hex);
      }}
    >
      {hex}
      <span className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 rounded-full border border-black bg-white text-sm text-black opacity-0 group-hover:translate-y-6 group-hover:opacity-90 group-focus:translate-y-6 group-focus:opacity-90 motion-safe:transition motion-safe:duration-300">
        {copied ? "copied!" : "click to copy"}
      </span>
    </button>
  );
}
