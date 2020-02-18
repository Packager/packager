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

        if (curr === "transpiler") {
            return { ...acc, worker: pluginArgs["transpiler"] };
        }

        if (pluginHooks.includes(curr)) {
            const hookId = pluginHooksMap[curr];
            const preBoundHook = (pluginArgs as any)[curr];
            const boundHook = bindContextToHook(
                preBoundHook,
                hookId,
                context,
                pluginArgs["transpiler"] || undefined
            );

            return { ...acc, [hookId]: boundHook };
        }

        return acc;
    }, {});

const bindContextToHook = (
    preBoundHook: any,
    hookId: string,
    context: PluginContext,
    transpiler?: Worker
) => {
    const updateProperties = (hook: any) =>
        Object.defineProperties(hook, {
            name: { value: hookId }
        });

    if (hookId === "transform") {
        if (!transpiler)
            throw new Error("Transformer hooks require a transpiler.");

        return updateProperties(preBoundHook.bind({ transpiler, ...context }));
    }

    return updateProperties(preBoundHook.bind(context));
};

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
