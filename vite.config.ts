import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8088,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap", "lenis"],
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
