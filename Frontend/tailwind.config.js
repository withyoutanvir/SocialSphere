/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure React components are included
  ],
  theme: {
    extend: {
      keyframes: {
        jumpin: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "80%": { transform: "translateY(-5px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rainbow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        jumpin: "jumpin 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        fadeIn: "fadeIn 0.8s ease-out forwards",
        rainbow: "rainbow 6s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-rainbow":
          "linear-gradient(90deg, #ff0000, #ff7300, #ffeb00, #47ff00, #00ffee, #2a56ff, #7b00ff, #ff00aa)", // Rainbow colors
      },
    },
  },
  plugins: [require("daisyui")], // Ensures DaisyUI is applied correctly
};
