import { cacheFactory, normalizeBundleOptions } from "packager-shared";

import setup from "../setup";
import { Queue } from "./utils";
import { baseResolver, baseLoader } from "./base-plugins";

import {
    BundleOptions,
    PackagerContext,
    File,
    PluginManager
} from "../../types";

const defaultBundleOptions: BundleOptions = {
    dependencies: {}
};

const cache = {
    dependencies: cacheFactory(),
    transpilers: cacheFactory(),
    esModulesWithoutDefaultExport: new Set(),
    esModulesWithDefaultExport: new Set()
};

export function createPluginFactory(
    files: File[],
    bundleOptions: BundleOptions = defaultBundleOptions,
    pluginManager: PluginManager
) {
    const context: PackagerContext = {
        cache,
        files,
        transpileQueue: new Queue({ timeout: 30000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };

    pluginManager.setContext(context);

    const registeredPlugins = pluginManager.prepareAndGetPlugins();
    const basePlugins = [baseResolver(context), baseLoader(context)];

    return [...setup(context), ...registeredPlugins, ...basePlugins];
}
