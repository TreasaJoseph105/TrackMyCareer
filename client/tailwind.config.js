/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitchBlack: "#000000",
        almostBlack: "#111111",
      },
      fontFamily: {
        elegant: ["'Dancing Script', cursive"], // Example elegant cursive
      },
    },
  },
  plugins: [],
}
