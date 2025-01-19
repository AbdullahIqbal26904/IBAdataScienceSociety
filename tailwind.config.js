/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        zoomRotate: 'zoomRotate 1.5s ease-in-out infinite',
        "spin-slow": "spin 5s linear infinite",
        "float-up": "floatUp 1s ease-out forwards"
      },
      keyframes: {
        zoomRotate: {
          '0%, 100%': {
            transform: 'scale(1.1) rotate(0deg)', // Zoomed in, original rotation
          },
          '50%': {
            transform: 'scale(1.0) rotate(5deg)', // Zoomed out, rotated slightly to the right
          },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatUp:{
          '0%':{
            transform: 'translateY(50px)',
            opacity: '0'
          },
          '100%':{
            transform: 'translateY(0)',
            opacity: '1'
          },
        }
      },
      colors: {
        primary: '#FFC107',
        secondary: '#ff18b8',
      }
    },
  },
  plugins: [],
}
