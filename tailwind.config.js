module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["Nunito", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
      mono: ['"Fira Code"', "ui-monospace", "monospace"],
      sans: ["Nunito Sans", "sans-serif"],
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
  plugins: [],
};
