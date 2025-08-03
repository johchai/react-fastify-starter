import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],

  resolve: {
    alias: {
      "@client": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public")
    }
  }
});
