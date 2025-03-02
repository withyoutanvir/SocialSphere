import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Change this to your backend server's port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
