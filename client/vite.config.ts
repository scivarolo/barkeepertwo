import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import codegen from "vite-plugin-graphql-codegen";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    codegen(),
    checker({
      typescript: {},
      eslint: {
        lintCommand:
          "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        dev: {
          logLevel: ["error"],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
