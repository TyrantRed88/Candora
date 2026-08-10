import { build } from "esbuild"

await build({
  entryPoints: ["src/components.ts"],
  outfile: "dist/components.js",
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node22",
  jsx: "automatic",
  jsxImportSource: "preact",

  loader: {
    ".scss": "text",
  },

external: [
  "preact",
  "preact/*",
],
})