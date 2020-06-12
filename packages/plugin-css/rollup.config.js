import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import webWorkerLoader from "rollup-plugin-web-worker-loader";
import pkg from "./package.json";

const plugins = [
  resolve(),
  typescript(),
  webWorkerLoader({ extensions: [".ts"] }),
  cjs(),
];

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

    Packager CSS Plugin v${pkg.version}
    @author baryla (Adrian Barylski)
    @github https://github.com/packager/packager

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
        name: "cssPlugin",
        format: "iife",
        compact: true,
        file: "dist/index.browser.js",
        banner,
      },
    ],
  },
];
