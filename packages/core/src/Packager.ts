import { InputOptions, OutputOptions, RollupCache } from "rollup";
import merge from "deepmerge";

import { PackagerOptions, BundleOptions, File, PluginAPI } from "../types";
import {
    loadRollup,
    loadMagicString,
    findEntryFile,
    extractPackageJsonOptions,
    handleBuildWarnings
} from "./setup/utils";

import { createPluginManager } from "./plugins/plugin-manager";
import { createPluginFactory } from "./plugins/plugin-factory";

const pluginManager = createPluginManager();

export default class Packager {
    public rollup: any;
    public files = <File[]>[];
    public packagerOptions = <PackagerOptions>{
        cache: true,
        sourcemaps: false
    };
    public bundleOptions = <BundleOptions>{
        dependencies: {}
    };
    public inputOptions: InputOptions;
    public outputOptions: OutputOptions;
    public cachedBundle = <RollupCache>{ modules: [] };

    constructor(
        options: PackagerOptions,
        inputOptions: InputOptions = {},
        outputOptions: OutputOptions = {}
    ) {
        this.packagerOptions = { ...this.packagerOptions, ...options };
        this.inputOptions = {
            ...inputOptions,
            inlineDynamicImports: true,
            cache: this.packagerOptions.cache && this.cachedBundle
        };

        this.outputOptions = {
            ...outputOptions,
            format: "iife",
            sourcemap: this.packagerOptions.sourcemaps ? "inline" : false,
            freeze: false
        };
    }

    registerPlugin(plugin: PluginAPI) {
        pluginManager.registerPlugin(plugin);
    }

    async bundle(files: File[], bundleOptions: BundleOptions) {
        this.files = files;
        this.bundleOptions = { ...this.bundleOptions, ...bundleOptions };

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
                this.bundleOptions = merge(
                    pkgBundleOptions,
                    this.bundleOptions || {}
                );

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
                plugins: createPluginFactory(
                    this.files,
                    this.bundleOptions,
                    pluginManager
                )
            };

            const bundle = await this.rollup.rollup(this.inputOptions);

            this.cachedBundle = this.packagerOptions.cache && bundle.cache;

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
