module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Nunito", "sans-serif"]
    },
    extend: {
      zIndex: {
        "-10": "-10",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
