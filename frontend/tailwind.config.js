/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
 theme: {
    extend: {
      colors: {
        green1: '#537D5D',
        green2: '#73946B',
        green3: '#9EBC8A',
        green4: '#D2D0A0',
      },
    },
  },
  plugins: [],
};
