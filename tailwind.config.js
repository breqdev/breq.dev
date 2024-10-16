module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["var(--nunito)", "sans-serif"],
      body: ["var(--libre-franklin)", "sans-serif"],
      mono: ["var(--fira-code)", "ui-monospace", "monospace"],
      sans: ["var(--nunito-sans)", "sans-serif"],
    },
    extend: {
      colors: {
        panpink: {
          light: "#ff8ac4",
          DEFAULT: "#ff42a1",
          dark: "#ff218c",
        },
        panblue: {
          DEFAULT: "#1BB3FF",
          dark: "#0077b3", // for styling text, to meet accessibility guidelines
          light: "#5ec9ff", // for styling black-on-blue text
        },
        panyellow: {
          light: "#ffeb7a",
          DEFAULT: "#FFDA00",
        },
        brookeorange: {
          light: "#fa9f75",
          DEFAULT: "#ff6b26",
        },
        brookepurple: {
          light: "#e0a1ff",
          DEFAULT: "#c757ff",
        },
        brookegreen: {
          light: "#a1ffd0",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
