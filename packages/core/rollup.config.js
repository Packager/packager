import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import webWorkerLoader from "rollup-plugin-web-worker-loader";
import dts from "rollup-plugin-dts";
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
    @github https://github.com/baryla/packager

    Released under the MIT License.
*/`;

export default [
    {
        input: "src/index.ts",
        inlineDynamicImports: true,
        plugins,
        output: [
            {
                file: ".dist/index.js",
                format: "esm",
                banner,
                sourcemap: true
            }
        ]
    },
    {
        input: "src/index.browser.ts",
        plugins,
        output: [
            {
                ...baseOutputSettings,
                file: ".dist/index.browser.js",
                banner
            }
        ]
    },
    {
        input: "types/index.d.ts",
        output: [{ file: ".dist/index.d.ts", format: "es" }],
        plugins: [dts()]
    }
];
