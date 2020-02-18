import {
    PluginAPI,
    PluginContext,
    PluginHook,
    PluginManager,
    pluginHooks,
    pluginHooksMap
} from "./shared";

const plugins = new Map();

const reducePlugin = (context: PluginContext, pluginArgs: PluginAPI) =>
    Object.keys(pluginArgs).reduce((acc: any, curr: string) => {
        if (curr === "name") {
            return { ...acc, name: pluginArgs["name"] };
        }

        if (curr === "worker") {
            return { ...acc, worker: pluginArgs["worker"] };
        }

        if (pluginHooks.includes(curr)) {
            const hookId = pluginHooksMap[curr];
            const boundHook: PluginHook = Object.defineProperty(
                (pluginArgs as any)[curr].bind(context),
                "name",
                { value: hookId }
            );

            return { ...acc, [hookId]: boundHook };
        }

        return acc;
    }, {});

export const pluginManager = (context: PluginContext): PluginManager => ({
    registerPlugin(plugin: PluginAPI) {
        const reducedPlugin = reducePlugin(context, plugin);
        plugins.set(plugin.name, reducedPlugin);
    },
    getRegisteredPlugins(asArray: boolean = false) {
        if (!asArray)
            return Array.from(plugins.entries()).reduce(
                (acc, val) => ({
                    ...acc,
                    [val[0]]: val[1] || null
                }),
                {}
            );
        return Array.from(plugins.values());
    }
});
