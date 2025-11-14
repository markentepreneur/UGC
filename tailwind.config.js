/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        "custom-pink": {
          DEFAULT: "#e8c5b5",
          light: "#faf6f3",
          dark: "#d4a89a",
        },
        "custom-sage": {
          DEFAULT: "#c9b8a3",
          light: "#e3d9cc",
          dark: "#b5a08a",
        },
      },
    },
  },
  plugins: [],
};
