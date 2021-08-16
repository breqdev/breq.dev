module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Nunito", "sans-serif"],
      mono: ['"Ubuntu Mono"', "ui-monospace", "monospace"],
    },
    extend: {
      zIndex: {
        "-10": "-10",
      },
      colors: {
        panpink: {
          DEFAULT: "#FF1B8D"
        },
        panblue: {
          DEFAULT: "#1BB3FF"
        },
        panyellow: {
          DEFAULT: "#FFDA00"
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
