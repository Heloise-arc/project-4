/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Geist Mono', 'monospace'],
        mono: ['Geist Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};