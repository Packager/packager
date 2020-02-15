import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import webWorkerLoader from "rollup-plugin-web-worker-loader";

const plugins = [resolve(), typescript(), webWorkerLoader(), cjs()];

if (process.env.NODE_ENV === "production") {
    plugins.push(terser());
}

const baseOutputSettings = {
    name: "Packager",
    format: "iife",
    compact: true
};

export default {
    input: "src/index.ts",
    inlineDynamicImports: true,
    output: [
        {
            ...baseOutputSettings,
            file: "dist/index.browser.js"
        },
        {
            ...baseOutputSettings,
            file: "examples/packager.js"
        },
        {
            file: "dist/index.js",
            format: "esm",
            sourcemap: true
        }
    ],
    plugins
};
