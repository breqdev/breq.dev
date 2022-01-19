module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}"],
  theme: {
    fontFamily: {
      display: ["Nunito", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
      mono: ['"Ubuntu Mono"', "ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        panpink: {
          DEFAULT: "#ff42a1",
        },
        panblue: {
          DEFAULT: "#1BB3FF",
          dark: "#0077b3", // for styling text, to meet accessibility guidelines
          light: "#5ec9ff", // for styling black-on-blue text
        },
        panyellow: {
          DEFAULT: "#FFDA00",
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/aspect-ratio")],
};
