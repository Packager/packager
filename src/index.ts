import { InputOptions, OutputOptions, RollupCache } from "rollup";
// @ts-ignore
// import rollup from "rollup/dist/rollup.browser";

import plugin from "./plugin";
import { PackagerOptions, BundleOptions, File } from "./types/packager";
import {
    applyPreCode,
    findEntryFile,
    handleWarnings,
    loadRollup
} from "./utils/setup";

export default class Packager {
    public rollup: any;
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
            format: "iife",
            sourcemap: options && options.sourcemaps ? "inline" : false,
            freeze: false
        };
    }

    async bundle(files: File[], bundleOptions?: BundleOptions) {
        this.files = files;

        try {
            const entryFile = findEntryFile(this.files);
            // @ts-ignore
            if (!this.rollup || !window.rollup) {
                await loadRollup();
                //@ts-ignore
                this.rollup = window.rollup;
            }

            this.inputOptions = {
                ...this.inputOptions,
                input: entryFile?.path,
                onwarn: handleWarnings,
                plugins: plugin(this.files, bundleOptions)
            };

            const bundle = await this.rollup.rollup(this.inputOptions);

            this.cachedBundle = bundle.cache;

            const { output } = await bundle.generate(this.outputOptions);

            return {
                code: `${applyPreCode()} ${output[0].code}${
                    this.outputOptions.sourcemap && output[0].map
                        ? `\n//# sourceMappingURL=` + output[0].map.toUrl()
                        : ""
                }`
            };
        } catch (e) {
            console.error(e);
        }
    }
}
