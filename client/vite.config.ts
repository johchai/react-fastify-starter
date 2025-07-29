import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/unit/tests.ts"
  }
});
