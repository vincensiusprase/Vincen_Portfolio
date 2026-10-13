/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary100: '#16264A',
          primary200: '#4A5C8A',
          primary300: '#22345F',
          accent100: '#F97316',
          accent200: '#FFEDD5',
          accent300: '#FFD9A8',
          text100: '#141C2E',
          text200: '#55607A',
          bg100: '#FFF9F4',
          bg200: '#FFF1E6',
          bg300: '#F0E4DA',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}