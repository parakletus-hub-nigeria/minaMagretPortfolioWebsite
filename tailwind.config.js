/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        academic: {
          navy: '#0A0F1D',
          dark: '#070B14',
          slate: '#0F172A',
          card: '#111827',
          gold: '#F59E0B',
          amber: '#D97706',
          accent: '#2563EB',
          emerald: '#10B981',
        },
      },
    },
  },
  plugins: [],
}

