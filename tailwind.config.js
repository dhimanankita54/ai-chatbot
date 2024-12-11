const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    fontFamily: {
      chicle: ["Chicle", "serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    colors: [
      {
        gptgray: {
          50: "#f9f9f9",
          100: "#ececec",
          200: "#e3e3e3",
          300: "#cdcdcd",
          400: "#b4b4b4",
          500: "#9b9b9b",
          600: "#676767",
          700: "#424242",
          750: "#2f2f2f",
          800: "#212121",
          900: "#171717",
          950: "#ef4444",
        }

      }
    ],
    extend: {
      colors: {
        gray: {
          50: "#f9f9f9",
          100: "#ececec",
          200: "#e3e3e3",
          300: "#cdcdcd",
          400: "#b4b4b4",
          500: "#9b9b9b",
          600: "#676767",
          700: "#424242",
          750: "#2f2f2f",
          800: "#212121",
          900: "#171717",
          950: "#ef4444",
        }
      }

    },
  },
  plugins: [flowbite.plugin()],
};