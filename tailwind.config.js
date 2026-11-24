/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: '#6E2752',
          plumDark: '#521A3C',
          rose: '#E87A9A',
          roseSoft: '#F9E6EC',
          teal: '#14827D',
          tealSoft: '#E3F3F2',
          cream: '#FDF9FA',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Cairo"', '"IBM Plex Sans Arabic"', 'Tajawal', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
