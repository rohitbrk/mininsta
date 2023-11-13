/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      width: {
        97: "28rem",
        98: "31rem",
        99: "38rem",
        100: "40rem",
      },
    },
  },
  plugins: [],
};
