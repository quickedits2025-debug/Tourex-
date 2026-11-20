/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        mountain: {
          dark: '#0f172a',
          charcoal: '#1e293b',
          accent: '#0284c7',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        'capsule': '9999px',
      }
    },
  },
  plugins: [],
}
