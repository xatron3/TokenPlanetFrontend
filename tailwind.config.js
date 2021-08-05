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
          500: "#242226",
          600: "#333135",
          700: "#232225",
          800: "#1a191d",
          900: "#0f0f10",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
