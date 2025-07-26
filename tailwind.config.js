/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      animation: {
        zoomRotate: 'zoomRotate 1.5s ease-in-out infinite',
        "spin-slow": "spin 5s linear infinite",
        "float-up": "floatUp 1s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-down": "slideDown 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-mobile": "fadeIn 0.3s ease-out forwards",
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
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        primary: '#3498db',
        secondary: '#2c3e50',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.primary"), 0 0 20px theme("colors.primary")',
        'neon-lg': '0 0 10px theme("colors.primary"), 0 0 30px theme("colors.primary")',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '-1': '-1',
      }
    },
  },
  plugins: [],
}
