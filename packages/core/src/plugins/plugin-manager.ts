import {
    PackagerContext,
    PluginManagerPlugin,
    PluginAPI,
    PluginManager,
    PluginAPIasRollupPlugin,
    PluginContext
} from "../../types";
import { Plugin } from "rollup";
import {
    resolver as resolverProxyHook,
    loader as loaderProxyHook,
    transform as transformProxyHook,
    beforeBundle as beforeBundleProxyHook
} from "./proxy-hooks";

import { validatePlugin, normalizePlugin } from "./utils";

const pluginRegistry = new Map();
const rawPluginRegistry = new Map();

const transformPluginAsProxy = (
    plugin: PluginAPI,
    context: PackagerContext
): PluginAPIasRollupPlugin => {
    let propertiesAndHooks: Plugin = {
        name: plugin.name
    };

    let pluginContext: PluginContext = {
        name: plugin.name,
        packagerContext: context,
        transpiler: plugin.transpiler && {
            name: `${plugin.name}-transpiler`,
            extensions: plugin.extensions || []
        },
        rawPlugin: plugin
    };

    const pluginIndex = context.plugins.findIndex(p => p.name === plugin.name);

    pluginContext.packagerContext = context;

    if (!!~pluginIndex) {
        context.plugins[pluginIndex] = pluginContext;
    } else {
        context.plugins.push(pluginContext);
    }

    if (plugin.resolver) {
        propertiesAndHooks = {
            ...propertiesAndHooks,
            resolveId: resolverProxyHook(plugin, pluginContext)
        };
    }

    if (plugin.loader) {
        propertiesAndHooks = {
            ...propertiesAndHooks,
            load: loaderProxyHook(plugin, pluginContext)
        };
    }

    if (pluginContext.transpiler) {
        propertiesAndHooks = {
            ...propertiesAndHooks,
            transform: transformProxyHook(plugin, pluginContext)
        };
    }

    if (!pluginContext.transpiler && plugin.beforeBundle) {
        propertiesAndHooks = {
            ...propertiesAndHooks,
            transform: beforeBundleProxyHook(plugin, pluginContext)
        };
    }

    return propertiesAndHooks;
};

export const createPluginManager = (): PluginManager => ({
    packagerContext: <PackagerContext>{},
    setPackagerContext(context: PackagerContext): void {
        this.packagerContext = context;
    },
    registerPlugin(plugin: PluginAPI): void {
        validatePlugin(plugin);

        pluginRegistry.set(plugin.name || null, {
            ...normalizePlugin(plugin),
            transformed: false
        });

        rawPluginRegistry.set(plugin.name || null, normalizePlugin(plugin));
    },
    prepareAndGetPlugins() {
        return this.getRegisteredPlugins().map(
            (plugin: PluginManagerPlugin) => {
                if (plugin.transformed) {
                    const rawPlugin = rawPluginRegistry.get(plugin.name);
                    if (rawPlugin) {
                        return {
                            ...transformPluginAsProxy(
                                rawPlugin,
                                this.packagerContext
                            ),
                            transformed: true
                        };
                    }

                    throw Error(
                        `Plugin ${plugin.name} has been registered incorrectly.`
                    );
                }

                const transformedPlugin = transformPluginAsProxy(
                    plugin,
                    this.packagerContext
                );

                pluginRegistry.set(plugin.name, {
                    ...transformedPlugin,
                    transformed: true
                });

                return { ...transformedPlugin, transformed: true };
            }
        );
    },
    getRegisteredPlugins(): PluginManagerPlugin[] {
        return Array.from(pluginRegistry.entries()).map((p: any) => ({
            ...p[1]
        }));
    }
});
