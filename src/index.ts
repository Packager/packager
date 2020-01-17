import { InputOptions, OutputOptions, RollupCache } from "rollup";
import rollup from "rollup/dist/rollup.browser";

import setupPlugins, { File } from "./plugins";

type PackagerOptions = {};

export default class Packager {
    public files: File[] = [];
    public inputOptions: InputOptions;
    public outputOptions: OutputOptions;
    public cachedBundle: RollupCache = { modules: [] };

    constructor(
        options: PackagerOptions,
        inputOptions: InputOptions = {},
        outputOptions: OutputOptions = {}
    ) {
        this.inputOptions = {
            ...inputOptions,
            inlineDynamicImports: true,
            cache: this.cachedBundle
        };

        this.outputOptions = {
            ...outputOptions,
            format: "iife"
        };
    }

    async bundle(files: File[]) {
        this.files = files;

        const entryFile = this.files.find(f => f.entry);

        this.inputOptions = {
            ...this.inputOptions,
            input: entryFile?.path,
            plugins: setupPlugins(this.files)
        };

        try {
            const bundle = await rollup.rollup(this.inputOptions);

            this.cachedBundle = bundle.cache;

            const { output } = await bundle.generate(this.outputOptions);

            return {
                code: output[0].code
            };
        } catch (e) {
            console.error(e);
        }
    }
}
