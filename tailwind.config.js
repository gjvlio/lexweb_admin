/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F4512C',
          'orange-light': '#FF7F4D',
          purple: '#5E1B89',
          'purple-soft': '#9D71BC',
          bg: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['"Roboto Slab"', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      maxWidth: {
        canvas: '1440px',
      },
      backgroundImage: {
        'lexmeet-gradient': 'linear-gradient(135deg, #F4512C 0%, #5E1B89 100%)',
      },
    },
  },
  plugins: [],
}
