/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#0052CC",
        secondary: "#F5A623",
        background: "#F4F6F8",
        footer: "#1A1D2E",
        text: "#2C2C2C",
        greenHighlight: "#36B37E",
        redHighlight: "#FF5630",
      },
    },
  },
  plugins: [],
};
