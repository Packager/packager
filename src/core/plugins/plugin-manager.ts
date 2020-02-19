import {
    PackagerContext,
    PluginManagerPlugin,
    PluginAPI,
    PluginManager
} from "packager/types";
import {
    transform as transformProxyHook,
    beforeBundle as beforeBundleProxyHook
} from "./proxy-hooks";

import { validatePlugin, normalizePlugin } from "./utils";

const pluginRegistry = new Map();
const transformPluginAsProxy = (
    plugin: PluginAPI,
    context: PackagerContext
) => ({
    ...plugin,
    transform: plugin.transpiler
        ? transformProxyHook(plugin, context)
        : beforeBundleProxyHook(plugin, context)
});

export const createPluginManager = (): PluginManager => ({
    context: <PackagerContext>{},
    setContext(context: PackagerContext): void {
        this.context = context;
    },
    registerPlugin(plugin: PluginAPI): void {
        validatePlugin(plugin);

        pluginRegistry.set(plugin.name || null, {
            ...normalizePlugin(plugin),
            transformed: false
        });
    },
    prepareAndGetPlugins() {
        for (const plugin of this.getRegisteredPlugins(false)) {
            pluginRegistry.set(plugin.name, {
                ...transformPluginAsProxy(plugin, this.context),
                transformed: true
            });
        }

        return this.getRegisteredPlugins(true) as PluginManagerPlugin[];
    },
    getRegisteredPlugins(
        onlyTransformed: boolean = true
    ): PluginManagerPlugin[] | PluginAPI[] {
        const plugins = Array.from(pluginRegistry.entries()).map(
            (p: any) =>
                ({
                    ...p[1]
                } as PluginManagerPlugin)
        );

        return onlyTransformed ? plugins.filter(p => p.transformed) : plugins;
    }
});
