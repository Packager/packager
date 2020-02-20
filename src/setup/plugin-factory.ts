import cacheFactory from "packager/shared/application-cache";
import normalizeBundleOptions from "packager/shared/normalize-bundle-options";
import QueueSystem from "packager/shared/queue-system";
import resolvers from "packager/resolvers";
import transformers from "packager/transformers";
import loaders from "packager/loaders";
import setup from "./";

import {
    BundleOptions,
    PackagerContext,
    File,
    PluginManager
} from "packager/types";

const defaultBundleOptions: BundleOptions = {
    dependencies: {}
};

const cache = {
    dependencies: cacheFactory(),
    transpilers: cacheFactory(),
    esModulesWithoutDefaultExport: new Set(),
    esModulesWithDefaultExport: new Set()
};

export default function(
    // this: Packager,
    files: File[],
    bundleOptions: BundleOptions = defaultBundleOptions,
    pluginManager: PluginManager
) {
    const context: PackagerContext = {
        cache,
        files,
        transpileQueue: new QueueSystem({ timeout: 30000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };

    pluginManager.setContext(context);

    const registeredPlugins = pluginManager.prepareAndGetPlugins();

    return [
        ...registeredPlugins,
        ...setup(context),
        ...resolvers(context),
        ...loaders(context),
        ...transformers(context)
    ];
}
