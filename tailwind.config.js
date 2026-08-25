/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          darkest: '#080a0d',
          dark: '#0e1116',
          bg: '#14161a',
          surface: '#181c22',
          card: '#1d222a',
          border: '#2a2f37',
          borderStrong: '#3a4049',
        },
        military: {
          50: '#f0f7fc',
          100: '#e0eff9',
          400: '#5ba3d9',
          500: '#2f7fb5',
          600: '#256694',
          700: '#1b4a6d',
          900: '#0f2c42',
        },
        tactical: {
          amber: '#c9a227',
          amberGlow: '#e8be38',
          red: '#d9534f',
          redGlow: '#ff6b6b',
          green: '#28a745',
          cyan: '#20c997',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', 'Menlo', 'Consolas', 'monospace'],
        display: ['"Chakra Petch"', '"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
