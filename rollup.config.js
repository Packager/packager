import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import webWorkerLoader from "rollup-plugin-web-worker-loader";

const baseOutputSettings = {
    name: "Packager",
    format: "iife",
    compact: true
};

export default {
    input: "src/index.ts",
    output: [
        {
            ...baseOutputSettings,
            file: "dist/index.js"
        },
        {
            ...baseOutputSettings,
            file: "demo/packager.js"
        }
    ],
    plugins: [resolve(), typescript(), webWorkerLoader(), cjs()]
};
