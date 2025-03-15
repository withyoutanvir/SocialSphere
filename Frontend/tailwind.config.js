/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans all component files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Enable DaisyUI
};
