import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ico: resolve(__dirname, "ico.html"),
        transaction: resolve(__dirname, "transactions.html"),
        terms: resolve(__dirname, "terms.html"),
      },
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
});
