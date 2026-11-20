/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        book: ['Literata', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#0b0f19',
        paper: { DEFAULT: '#f7f1e3', deep: '#ece2cc', edge: '#d8ccb2' },
        quill: { DEFAULT: '#1d2433', soft: '#4a5363' },
        gold: { DEFAULT: '#b7862c', soft: '#e3c27a' },
        accent: { DEFAULT: '#14b8a6', soft: '#5eead4', deep: '#0f766e' },
      },
      boxShadow: {
        glow: '0 10px 40px -10px rgba(20,184,166,0.45)',
        page: '0 1px 0 #e6dcc6, 0 3px 0 #d8ccb2, 0 4px 0 #e6dcc6, 0 6px 0 #cfc2a6, 0 30px 60px -20px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
};
