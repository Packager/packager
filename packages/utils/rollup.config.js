import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

const plugins = [resolve(), typescript(), cjs()];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    terser({
      output: {
        comments: (n, c) => /@license/i.test(c.value),
      },
    })
  );
}

export default [
  {
    input: "src/index.ts",
    inlineDynamicImports: true,
    plugins,
    output: [
      {
        dir: "dist",
        format: "esm",
      },
    ],
  },
  {
    input: "src/types.ts",
    output: [{ dir: "dist", format: "es" }],
    plugins: [dts()],
  },
];
