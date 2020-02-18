import {
    PluginAPI,
    PluginContext,
    PluginManager,
    pluginHooks,
    pluginHooksMap
} from "./shared";
import { PackagerContext } from "packager/types/packager";

const plugins = new Map();

// const reducePlugin = (context: PluginContext, pluginArgs: PluginAPI) =>
//     Object.keys(pluginArgs).reduce((acc: any, curr: string) => {
//         if (curr === "name") {
//             return { ...acc, name: pluginArgs["name"] };
//         }

//         if (curr === "transpiler") {
//             return { ...acc, transpiler: pluginArgs["transpiler"] };
//         }

//         // const hookId = pluginHooksMap[curr];
//         // const preBoundHook =
//         // const preBoundHook = (pluginArgs as any)[curr];
//         // const boundHook = bindContextToHook(
//         //     preBoundHook,
//         //     hookId,
//         //     context,
//         //     pluginArgs["transpiler"] || undefined
//         // );

//         return { ...acc, [curr]: pluginArgs[curr] };

//         // if (pluginHooks.includes(curr)) {
//         //     const hookId = pluginHooksMap[curr];
//         //     const preBoundHook = (pluginArgs as any)[curr];
//         //     const boundHook = bindContextToHook(
//         //         preBoundHook,
//         //         hookId,
//         //         context,
//         //         pluginArgs["transpiler"] || undefined
//         //     );

//         //     return { ...acc, [hookId]: boundHook };
//         // }

//         return acc;
//     }, {});

// const bindContextToHook = (
//     preBoundHook: any,
//     hookId: string,
//     context: PluginContext,
//     transpiler?: Worker
// ) => {
//     const updateProperties = (hook: any) =>
//         Object.defineProperties(hook, {
//             name: { value: hookId }
//         });

//     if (hookId === "transform") {
//         if (!transpiler)
//             throw new Error("Transformer hooks require a transpiler.");

//         return updateProperties(preBoundHook.bind({ transpiler, ...context }));
//     }

//     return updateProperties(preBoundHook.bind(context));
// };

const transformProxyFactory = (plugin: PluginAPI, context: PluginContext) => {
    if (!plugin.transpiler) return null;

    const transformFunction = async (code: string, moduleId: string) => {
        // const transpiler =
        //     typeof plugin.transpiler === "function"
        //         ? new plugin.transpiler(context)
        //         : plugin.transpiler;

        // const file = context.files.find(f => f.path === moduleId)!;

        // await context.transpileQueue.push("Vue-Transpiler", () =>
        //     transpiler.transpile({ ...file, code })
        // );
        // const completed = context.transpileQueue.completed.find(
        //     c => c.path === moduleId
        // );

        return "testing!!";
    };

    return new Proxy(transformFunction, {
        apply(target, thisArg, argumentsList) {
            const handledTransformFunction = Reflect.apply(
                target,
                context,
                argumentsList
            );

            if (!plugin.beforeRender) {
                return handledTransformFunction;
            }

            return plugin.beforeRender.bind(context)(handledTransformFunction);
        }
    });
};

const transformPluginAsProxy = (plugin: PluginAPI, context: PluginContext) => {
    let pluginProxy = {
        name: plugin.name,
        transform: transformProxyFactory(plugin, context)
    };

    return pluginProxy;
};

export function pluginManager(context: PluginContext): PluginManager {
    return {
        registerPlugin(plugin: PluginAPI) {
            // console.log(plugin);
            // const reducedPlugin = reducePlugin(context, plugin);
            const transformedPlugin = transformPluginAsProxy(plugin, context);
            plugins.set(plugin.name, transformedPlugin);
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
    };
}
