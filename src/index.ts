import { InputOptions, OutputOptions, RollupBuild, RollupCache } from "rollup";
import merge from "deepmerge";

import pluginFactory from "packager/setup/plugin-factory";
import {
    PackagerOptions,
    BundleOptions,
    File,
    PluginAPI
} from "packager/types";
import {
    loadRollup,
    loadMagicString,
    findEntryFile,
    extractPackageJsonOptions,
    handleBuildWarnings
} from "packager/setup/utils";
import { createPluginManager } from "packager/core/plugins";

const pluginManager = createPluginManager();

export default class Packager {
    public rollup: any;
    public files = <File[]>[];
    public bundleOptions = <PackagerOptions>{
        cache: true,
        sourcemaps: false
    };
    public inputOptions: InputOptions;
    public outputOptions: OutputOptions;
    public cachedBundle = <RollupCache>{ modules: [] };

    constructor(
        options: PackagerOptions,
        inputOptions: InputOptions = {},
        outputOptions: OutputOptions = {}
    ) {
        this.bundleOptions = { ...this.bundleOptions, ...options };
        this.inputOptions = {
            ...inputOptions,
            inlineDynamicImports: true,
            cache: this.bundleOptions.cache && this.cachedBundle
        };

        this.outputOptions = {
            ...outputOptions,
            format: "iife",
            sourcemap: this.bundleOptions.sourcemaps ? "inline" : false,
            freeze: false
        };
    }

    registerPlugin(plugin: PluginAPI) {
        pluginManager.registerPlugin(plugin);
    }

    async bundle(files: File[], bundleOptions: BundleOptions = {}) {
        this.files = files;

        try {
            // @ts-ignore
            if (!this.rollup || !window.rollup) {
                await loadRollup();
                await loadMagicString();
                //@ts-ignore
                this.rollup = window.rollup;
            }

            let entryFile;
            const packageJson = this.files.find(
                f => f.path === "/package.json"
            );

            if (packageJson && packageJson.code != "") {
                const parsed =
                    typeof packageJson.code === "string"
                        ? JSON.parse(packageJson.code)
                        : packageJson.code;

                const pkgBundleOptions = extractPackageJsonOptions(parsed);
                bundleOptions = merge(pkgBundleOptions, bundleOptions || {});

                if (parsed.main) {
                    entryFile = findEntryFile(
                        this.files,
                        parsed.main.startsWith("/")
                            ? parsed.main
                            : `/${parsed.main}`
                    );
                }
            }

            entryFile = entryFile || findEntryFile(this.files);

            this.inputOptions = {
                ...this.inputOptions,
                input: entryFile?.path,
                onwarn: handleBuildWarnings,
                plugins: pluginFactory(this.files, bundleOptions, pluginManager)
            };

            const bundle = await this.rollup.rollup(this.inputOptions);

            this.cachedBundle = this.bundleOptions.cache && bundle.cache;

            const { output } = await bundle.generate(this.outputOptions);

            return {
                code: `${output[0].code} ${
                    this.outputOptions.sourcemap && output[0].map
                        ? ` \n //# sourceMappingURL=${output[0].map.toUrl()}`
                        : ""
                }`
            };
        } catch (e) {
            console.error(e);
        }
    }
}
