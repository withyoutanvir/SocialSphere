/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        cycle1: {
          '0%': { backgroundColor: '#FF5722' },
          '50%': { backgroundColor: '#F44336' },
          '100%': { backgroundColor: '#FF5722' },
        },
        cycle2: {
          '0%': { backgroundColor: '#4CAF50' },
          '50%': { backgroundColor: '#2196F3' },
          '100%': { backgroundColor: '#4CAF50' },
        },
        cycle3: {
          '0%': { backgroundColor: '#9E9E9E' },
          '50%': { backgroundColor: '#795548' },
          '100%': { backgroundColor: '#9E9E9E' },
        },
        cycle4: {
          '0%': { backgroundColor: '#E91E63' },
          '50%': { backgroundColor: '#3F51B5' },
          '100%': { backgroundColor: '#E91E63' },
        },
        cycle5: {
          '0%': { backgroundColor: '#00BCD4' },
          '50%': { backgroundColor: '#8BC34A' },
          '100%': { backgroundColor: '#00BCD4' },
        },
      },
      animation: {
        cycle1: 'cycle1 6s ease-in-out infinite',
        cycle2: 'cycle2 6s ease-in-out infinite',
        cycle3: 'cycle3 6s ease-in-out infinite',
        cycle4: 'cycle4 6s ease-in-out infinite',
        cycle5: 'cycle5 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require("daisyui")],
};
