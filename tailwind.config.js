/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#FAFAFA",
        dark: "#121212",
      },
      fontFamily: {
        inter: "Inter",
      },
    },
  },
  plugins: [],
};
