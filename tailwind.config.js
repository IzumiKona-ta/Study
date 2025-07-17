/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#a855f7",
        "primary-blue": "#2563eb",
      },
      backgroundImage: {
        "banner-gradient": "linear-gradient(to right, #a855f7, #2563eb)",
      },
    },
  },
  plugins: [],
};