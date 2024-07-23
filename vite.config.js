import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ico: resolve(__dirname, "./pages/ico/ico.html"),
        footer: resolve(__dirname, "./components/footer/footer.html"),
        navbar: resolve(__dirname, "./components/navbar/navbar.html"),
      },
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
});
