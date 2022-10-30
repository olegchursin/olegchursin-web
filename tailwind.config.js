/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat Alternates"']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
