import initialSetup from "./initial-setup";
import resolveDependencies from "./resolve-dependencies";
import loadDependencies from "./load-dependencies";
import transformExternalDependencies from "./transform-external-dependencies";
import transformVueFiles from "./transform-vue-files";
import transformSassFiles from "./transform-sass-files";
import transformStylusFiles from "./transform-stylus-files";
import cacheFactory, { ApplicationCache } from "../utils/application-cache";
import normalizeBundleOptions from "../utils/normalize-bundle-options";
import QueueSystem from "../transpilers/queue-system";

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
    transpileQueue: QueueSystem;
    files: File[];
    bundleOptions: BundleOptions;
};

export type BundleOptions = {
    externalModules?: { [moduleName: string]: string };
};

const defaultBundleOptions: BundleOptions = {
    externalModules: {}
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
        transpileQueue: new QueueSystem({ timeout: 3000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };

    return [
        initialSetup(context),
        resolveDependencies(context),
        loadDependencies(context),
        transformExternalDependencies(context),
        transformVueFiles(context),
        transformSassFiles(context),
        transformStylusFiles(context)
    ];
}
