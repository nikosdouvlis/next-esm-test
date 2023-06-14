import type { Options } from "tsup";
import { defineConfig } from "tsup";

// @ts-ignore
import { name, version } from "./package.json";

export default defineConfig((overrideOptions) => {
  const copyPackageJson = !!overrideOptions.env?.copyPackageJson;

  const common: Options = {
    entry: ["./src/**/*.{ts,tsx,js,jsx}"],
    bundle: false,
    clean: true,
    minify: false,
    sourcemap: true,
    legacyOutput: true,
  };

  const onSuccess = (format: string) => {
    return [
      copyPackageJson &&
        `cp ./package.${format}.json ./dist/${format}/package.json`,
      `npm run build:declarations`,
    ]
      .filter(Boolean)
      .join(" && ");
  };

  const esm: Options = {
    ...common,
    format: "esm",
    onSuccess: onSuccess("esm"),
    define: {
      __BUILD__: "'esm'",
    },
  };

  const cjs: Options = {
    ...common,
    format: "cjs",
    outDir: "./dist/cjs",
    onSuccess: onSuccess("cjs"),
    define: {
      __BUILD__: "'cjs'",
    },
  };

  return [esm, cjs];
});
