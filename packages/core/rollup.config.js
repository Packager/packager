import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-node-polyfills";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

const plugins = [resolve(), nodePolyfills(), typescript(), cjs()];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    terser({
      output: {
        comments: (n, c) => /@license/i.test(c.value),
      },
    })
  );
}

const banner = `/*
    @license

    Packager v${pkg.version}
    @author baryla (Adrian Barylski)
    @github https://github.com/Packager/packager

    Released under the MIT License.
*/`;

export default [
  {
    input: "src/index.ts",
    inlineDynamicImports: true,
    plugins,
    output: [
      {
        dir: "dist",
        format: "esm",
        banner,
      },
    ],
  },
  {
    input: "src/index.browser.ts",
    plugins,
    output: [
      {
        name: "Packager",
        format: "iife",
        compact: true,
        file: "dist/index.browser.js",
        banner,
      },
    ],
  },
  {
    input: "src/types.ts",
    output: [{ dir: "dist", format: "es" }],
    plugins: [dts()],
  },
];
