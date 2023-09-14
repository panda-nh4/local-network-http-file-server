import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/dir": {
        target: "http://localhost:5000/",
        changeOrigin: true,
      },
      "/media": {
        target: "http://localhost:5000/",
        changeOrigin: true,
      },
      "/file": {
        target: "http://localhost:5000/",
        changeOrigin: true,
      },
    },
  },
});
