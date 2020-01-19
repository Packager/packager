import { InputOptions, OutputOptions, RollupCache } from "rollup";
// @ts-ignore
import rollup from "rollup/dist/rollup.browser";

import setupPlugins, { File, BundleOptions } from "./plugins";

type PackagerOptions = {
    sourcemaps: boolean;
};

const findEntryFile = (files: File[]) => {
    const foundFile = files.find(f => f.entry);

    if (!foundFile) {
        throw Error(
            "You haven't specific an entry file. You can do so by adding 'entry: true' to one of your files."
        );
    }

    return foundFile;
};

const applyPreCode = () => {
    const windowProcess = `window.process = {}; window.process.env = {}; window.process.env.NODE_ENV = 'development'; `;

    return windowProcess;
};

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
            format: "iife",
            sourcemap: options && options.sourcemaps ? "inline" : false
        };
    }

    async bundle(files: File[], bundleOptions?: BundleOptions) {
        this.files = files;

        try {
            const entryFile = findEntryFile(this.files);

            this.inputOptions = {
                ...this.inputOptions,
                input: entryFile?.path,
                plugins: setupPlugins(this.files, bundleOptions)
            };

            const bundle = await rollup.rollup(this.inputOptions);

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
