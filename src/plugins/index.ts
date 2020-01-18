import initialSetup from "./initial-setup";
import resolveDependencies from "./resolve-dependencies";
import loadDependencies from "./load-dependencies";
import cache, { DependencyCache } from "../utils/dependency-cache";

export type File = {
    name: string;
    path: string;
    entry: boolean;
    code: string;
};

export type PluginContext = {
    cache: DependencyCache;
    files: File[];
    bundleOptions: BundleOptions;
};

export type BundleOptions = {
    externalModules: { [moduleName: string]: string };
};

const defaultBundleOptions: BundleOptions = {
    externalModules: {}
};

const normalizeBundleOptions = (
    bundleOptions: BundleOptions
): BundleOptions => {
    const externalModules = Object.keys(
        bundleOptions.externalModules || {}
    ).reduce(
        (acc, curr) => ({
            ...acc,
            [curr.toLowerCase()]: bundleOptions.externalModules[curr]
        }),
        {}
    );

    return {
        externalModules
    };
};

export default function setup(
    files: File[],
    bundleOptions: BundleOptions = defaultBundleOptions
) {
    const context: PluginContext = {
        cache,
        files,
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };

    return [
        initialSetup(context),
        resolveDependencies(context),
        loadDependencies(context)
    ];
}
