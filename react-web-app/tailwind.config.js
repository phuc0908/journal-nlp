/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#11c4d4",
        "background-light": "#f6f8f8",
        "background-dark": "#102022",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
    },
  },
  plugins: [],
}
