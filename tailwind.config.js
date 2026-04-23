/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': 'rgb(86, 40, 40)',
        'brand-warm': 'rgb(255, 243, 227)',
      },
      fontFamily: {
        'hanzi': ['"HanziPen SC"', 'cursive'],
        'pingfang': ['"PingFang SC"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
