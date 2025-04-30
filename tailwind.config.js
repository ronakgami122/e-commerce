/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#7E33E0",
        headerPrimary: "#F6F5FF",
        pink: "#FB2E86",
        footerPrimary: "#EEEFFB",
      },
    },
  },
  plugins: [],
};
