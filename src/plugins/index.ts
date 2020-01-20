import initialSetup from "./initial-setup";
import resolveDependencies from "./resolve-dependencies";
import loadDependencies from "./load-dependencies";
import transformExternalDependencies from "./transform-external-dependencies";
import transformVueFiles from "./transform-vue-files";
import cacheFactory, { ApplicationCache } from "../utils/application-cache";

export type File = {
    name: string;
    path: string;
    entry: boolean;
    code: string;
};

export type PackagerContext = {
    cache: {
        dependencies: ApplicationCache;
        transpilers: ApplicationCache;
    };
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

const cache = {
    dependencies: cacheFactory(),
    transpilers: cacheFactory()
};

export default function setup(
    files: File[],
    bundleOptions: BundleOptions = defaultBundleOptions
) {
    const context: PackagerContext = {
        cache,
        files,
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };

    return [
        initialSetup(context),
        resolveDependencies(context),
        loadDependencies(context),
        transformExternalDependencies(context),
        transformVueFiles(context)
    ];
}
