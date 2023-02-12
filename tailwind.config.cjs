/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#007bff",
      secondary: "#e5e5e5",
      background: "#333333",
      white: "#ffffff",
      error: "#FF0000",
      success: "#28a745",
    },
  },
  plugins: [],
};
