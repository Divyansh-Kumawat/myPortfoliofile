/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0C10',
          surface: '#1F2833',
        },
        primary: {
          DEFAULT: '#66FCF1',
          dark: '#45A29E',
        },
        light: {
          text: '#C5C6C7',
          heading: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #66FCF1, 0 0 20px #66FCF1, 0 0 30px #66FCF1' },
          '100%': { textShadow: '0 0 20px #66FCF1, 0 0 30px #45A29E, 0 0 40px #45A29E' },
        }
      }
    },
  },
  plugins: [],
}
