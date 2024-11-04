/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#FAFAF8',
        'main-color': '#9F2B68',
        'navbar-bg': "#F7E7CE",
        'chat-area': "#f3f3f3",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}


