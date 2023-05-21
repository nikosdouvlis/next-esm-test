import type { Options } from "tsup";
import { defineConfig } from "tsup";

// @ts-ignore
import { name, version } from "./package.json";

export default defineConfig((overrideOptions) => {
  const isProd = overrideOptions.env?.NODE_ENV === "production";
  const common: Options = {
    entry: ["./src/**/*.{ts,tsx,js,jsx}"],
    bundle: false,
    clean: true,
    minify: false,
    sourcemap: true,
    legacyOutput: true,
  };

  const onSuccess = (format: string) =>
    `cp ./package.${format}.json ./dist/${format}/package.json && npm run build:declarations ${
      overrideOptions.watch ? "&& npm run yalc:push" : ""
    }`;

  const esm: Options = {
    ...common,
    format: "esm",
    onSuccess: onSuccess("esm"),
  };

  const cjs: Options = {
    ...common,
    format: "cjs",
    outDir: "./dist/cjs",
    onSuccess: onSuccess("cjs"),
  };

  return [esm, cjs];
});
