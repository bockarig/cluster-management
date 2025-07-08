import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  entrypointsDir: "pages",
  publicDir: "static",

  webExt: {
    disabled: true,
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    permissions: ["storage"],
  },
})
