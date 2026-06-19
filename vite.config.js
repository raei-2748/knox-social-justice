import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://<user>.github.io/knox-social-justice/ on GitHub Pages,
// so assets must resolve under that sub-path. Local dev/preview honour it too.
export default defineConfig({
  base: "/knox-social-justice/",
  plugins: [react()],
});
