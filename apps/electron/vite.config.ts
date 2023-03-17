import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

export default defineConfig({
  mode: "development",
  plugins: [
    react(),
    electron([
      {
        entry: "src/main-layer/index.ts",
      },
      // {
      //   entry: "src/preload/preload.ts",
      //   onstart(options) {
      //     options.reload();
      //   },
      // },
    ]),
  ],
});
