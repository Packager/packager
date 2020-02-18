import cacheFactory from "packager/shared/application-cache";
import normalizeBundleOptions from "packager/shared/normalize-bundle-options";
import QueueSystem from "packager/shared/queue-system";
import { BundleOptions, PackagerContext, File } from "packager/types/packager";
import resolvers from "packager/resolvers";
import transformers from "packager/transformers";
import loaders from "packager/loaders";
import { PluginManager } from "packager/core/plugins";
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
    pluginManager: PluginManager,
    bundleOptions: BundleOptions = defaultBundleOptions
) => {
    const context: PackagerContext = {
        cache,
        files,
        transpileQueue: new QueueSystem({ timeout: 30000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };

    const registeredPlugins = pluginManager.getRegisteredPlugins(true);

    return [
        ...registeredPlugins,
        ...setup(context),
        ...resolvers(context),
        ...loaders(context),
        ...transformers(context)
    ];
};
