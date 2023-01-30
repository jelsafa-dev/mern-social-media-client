/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "425px",
        ss: "620px",
        sm: "768px",
        md: "1024px",
        lg: "1440px",
        xl: "1700px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
