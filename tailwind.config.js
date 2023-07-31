/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F9AB3E",
        secondary: "#0C2024",
        dark: "#0F2338",
        purple: "#3D2570",
      },
      boxShadow: {
        navbar: "0 1px 6px 0 rgba(32, 33, 36, 0.28)",
      },
      minHeight: {
        "100vh": "calc(100vh - 64px)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
  ],
};
