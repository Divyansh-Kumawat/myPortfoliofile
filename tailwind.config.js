/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // `paper` = surface, `ink` = text. Semantic names, so the whole system
        // inverts by swapping these values.
        paper: '#000000',
        bone: '#0A0A0A',
        // Cards sit one step above both section grounds so they read on black.
        surface: '#111111',
        ink: {
          DEFAULT: '#F2F2F0',
          soft: '#A0A0A0',
          mute: '#6E6E6E',
        },
        rule: '#242424',
        term: {
          DEFAULT: '#FF5F1F',
          deep: '#FF8A4C',
          glow: '#FFB088',
          tint: '#1E0C03',
        },
        // Legacy token names remapped so nothing renders off-theme.
        dark: { bg: '#000000', surface: '#0A0A0A' },
        primary: { DEFAULT: '#FF5F1F', dark: '#FF8A4C' },
        light: { text: '#F2F2F0', heading: '#F2F2F0' },
        accent: { DEFAULT: '#FF5F1F', hover: '#D9430A' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        pixel: ['basis33', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        mono: ['basis33', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'scan-beam': {
          '0%': { transform: 'translateY(-10vh)', opacity: '0' },
          '10%, 90%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh)', opacity: '0' },
        },
        'grid-drift': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, 56px)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-rev': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '80%, 100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        'data-fall': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%, 80%': { opacity: '0.5' },
          '100%': { transform: 'translateY(560px)', opacity: '0' },
        },
        'bar-load': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'scan-beam': 'scan-beam 7s linear infinite',
        'grid-drift': 'grid-drift 4s linear infinite',
        blink: 'blink 1.1s steps(1) infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'spin-rev': 'spin-rev 34s linear infinite',
        'pulse-ring': 'pulse-ring 4s ease-out infinite',
        glitch: 'glitch 0.35s steps(2) infinite',
        'data-fall': 'data-fall 8s linear infinite',
      },
    },
  },
  plugins: [],
}
