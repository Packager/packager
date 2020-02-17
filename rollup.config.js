import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import webWorkerLoader from "rollup-plugin-web-worker-loader";
import pkg from "./package.json";

const plugins = [resolve(), typescript(), webWorkerLoader(), cjs()];

if (process.env.NODE_ENV === "production") {
    plugins.push(
        terser({
            output: {
                comments: (n, c) => /@license/i.test(c.value)
            }
        })
    );
}

const baseOutputSettings = {
    name: "Packager",
    format: "iife",
    compact: true
};

const banner = `/*
    @license

    Packager v${pkg.version}
    @author baryla (Adrian Barylski)
    @github https://github.com/baryla/pacakger

    Released under the MIT License.
*/`;

export default {
    input: "src/index.ts",
    inlineDynamicImports: true,
    output: [
        {
            ...baseOutputSettings,
            file: "dist/index.browser.js",
            banner
        },
        {
            ...baseOutputSettings,
            file: "examples/packager.js",
            banner
        },
        {
            file: "dist/index.js",
            format: "esm",
            banner,
            sourcemap: true
        }
    ],
    plugins
};
