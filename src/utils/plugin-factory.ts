import cacheFactory from "../utils/application-cache";
import normalizeBundleOptions from "../utils/normalize-bundle-options";
import QueueSystem from "../utils/queue-system";
import { BundleOptions, PackagerContext, File } from "../types/packager";
import resolvers from "../resolvers";
import transformers from "../transformers";
import loaders from "../loaders";
import setup from "../setup";

const defaultBundleOptions: BundleOptions = {
    dependencies: {}
};

const cache = {
    dependencies: cacheFactory(),
    transpilers: cacheFactory()
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
