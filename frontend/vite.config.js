import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // This forces all dependencies to use the one copy of React in your root
    dedupe: ['react', 'react-dom'],
  },
});
