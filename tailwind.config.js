/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "own-black": "#000000",
      "own-gold": "#ca8a04",
      "own-light-blue": "#439bca",
      "own-blue": "#2563eb",
      "own-white": "#ffffff",
      "own-gray": "#333333",
      "own-light-gray": "#f0f0f0",
      "own-light-brown": "#f4e3c7",
      "own-bg": "#262832",
    },
    extend: {},
  },
  plugins: [],
};
