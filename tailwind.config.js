
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        zoom: "zoom 0.3s ease-out forwards",
      },
      keyframes: {
        zoom: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}