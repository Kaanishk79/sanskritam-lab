import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
var stdin_default = defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true
  }
});
export {
  stdin_default as default
};
