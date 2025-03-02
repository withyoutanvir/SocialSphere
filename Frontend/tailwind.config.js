/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Ensure React components are included
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Ensure DaisyUI is required correctly
};
