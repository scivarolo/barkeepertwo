import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import checker from "vite-plugin-checker";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    mkcert(),
    checker({
      typescript: true,
      // eslint: {
      //   lintCommand: 'eslint "./src/**/*.{ts,tsx}" --max-warnings 0',
      //   // useFlatConfig: true,
      //   dev: {
      //     logLevel: ["error"],
      //   },
      // },
      overlay: { initialIsOpen: false, position: "tr" },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
