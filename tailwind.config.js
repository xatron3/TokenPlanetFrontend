// tailwind.config.js
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Kanit"', "sans-serif"],
    },
    extend: {
      colors: {
        gray: {
          100: "#48535c",
          200: "#424c54",
          300: "#3c454c",
          400: "#363e45",
          500: "#30373d",
          600: "#2a3036",
          700: "#242a2f",
          800: "#1f2328",
          900: "#191d21",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
