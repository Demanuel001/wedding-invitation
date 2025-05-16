/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f4fa',
          100: '#d9e5f5',
          200: '#b3caea',
          300: '#8dafdf',
          400: '#6694d4',
          500: '#4078c9',
          600: '#3361a1',
          700: '#264878',
          800: '#1a3050',
          900: '#0d1828',
        },
        gold: {
          50: '#fdf9e7',
          100: '#fcf3cf',
          200: '#f9e79f',
          300: '#f7db6f',
          400: '#f4cf3f',
          500: '#f1c40f',
          600: '#c19d0c',
          700: '#917609',
          800: '#604e06',
          900: '#302703',
        },
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      rotate: {
        'x-160': 'rotateX(160deg)',
      },
    },
  },
  plugins: [],
};