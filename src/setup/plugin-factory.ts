import cacheFactory from "@shared/application-cache";
import normalizeBundleOptions from "@shared/normalize-bundle-options";
import QueueSystem from "@shared/queue-system";
import { BundleOptions, PackagerContext, File } from "@typedefs/packager";
import resolvers from "@resolvers";
import transformers from "@transformers";
import loaders from "@loaders";
import setup from "./";

const defaultBundleOptions: BundleOptions = {
    dependencies: {}
};

const cache = {
    dependencies: cacheFactory(),
    transpilers: cacheFactory(),
    esModulesWithoutDefaultExport: new Set(),
    esModulesWithDefaultExport: new Set()
};

export default (
    files: File[],
    bundleOptions: BundleOptions = defaultBundleOptions
) => {
    const context: PackagerContext = {
        cache,
        files,
        transpileQueue: new QueueSystem({ timeout: 30000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };

    return [
        ...setup(context),
        ...resolvers(context),
        ...loaders(context),
        ...transformers(context)
    ];
};
