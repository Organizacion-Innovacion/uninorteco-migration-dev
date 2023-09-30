import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
  format: ["cjs", "esm"],
});
