import {
    PluginAPI,
    PluginContext,
    PluginManager,
    pluginHooks,
    pluginHooksMap
} from "./shared";
import { PackagerContext } from "packager/types/packager";
import { TransformationException } from "packager/exceptions";
import verifyExtensions from "packager/shared/verify-extensions";

const pluginRegistry = new Map();

const transformProxyFactory = (plugin: PluginAPI, context: PackagerContext) => {
    if (!plugin.transpiler) return null;

    const transpilerName = `${plugin.name}-transpiler`;
    const canBeTransformed = verifyExtensions(plugin.extensions);
    const transformFunction = async (code: string, moduleId: string) => {
        if (!canBeTransformed(moduleId)) return null;

        let transpiler: any;
        transpiler = context.cache.transpilers.get(transpilerName);
        if (!transpiler) {
            transpiler =
                typeof plugin.transpiler === "function"
                    ? new plugin.transpiler(context)
                    : plugin.transpiler;
            context.cache.transpilers.set(transpilerName, transpiler);
        }

        const file = context.files.find(f => f.path === moduleId)!;

        await context.transpileQueue.push(transpilerName, () =>
            transpiler.transpile({ ...file, code })
        );
        const completed = context.transpileQueue.completed.find(
            c => c.path === moduleId
        );

        if (completed) {
            return {
                code: completed.code,
                map: completed.map || { mappings: "" }
            };
        }

        throw new TransformationException(moduleId, transpilerName);
    };

    return new Proxy(transformFunction, {
        async apply(target, thisArg, argumentsList) {
            const handledTransformFunction = await Reflect.apply(
                target,
                context,
                argumentsList
            );

            if (handledTransformFunction) {
                if (!plugin.beforeRender) {
                    return handledTransformFunction;
                }

                const { code, map } = handledTransformFunction;

                return {
                    code: plugin.beforeRender.bind(context)(code) || code,
                    map
                };
            }

            return Promise.resolve();
        }
    });
};

const transformPluginAsProxy = (
    plugin: PluginAPI,
    context: PackagerContext
) => {
    let pluginProxy = {
        ...plugin,
        transform: transformProxyFactory(plugin, context)
    };

    return pluginProxy;
};

type PluginManagerPlugin = PluginAPI & { transformed: boolean };

const validatePlugin = (plugin: PluginAPI): void | never => {
    if (!plugin.name) {
        throw new Error(`'name' is a required field on a plugin.`);
    }

    if (!plugin.extensions) {
        throw new Error(`${plugin.name} is missing 'extensions'.`);
    }
};

const normalizePlugin = (plugin: PluginAPI): PluginAPI => ({
    // Meta
    name: plugin.name,
    extensions: plugin.extensions,
    transpiler: plugin.transpiler,
    // Hooks
    resolver: plugin.resolver,
    loader: plugin.loader,
    beforeRender: plugin.beforeRender
});

export const createPluginManager = () => ({
    context: <PackagerContext>{},
    setContext(context: PackagerContext) {
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

        return this.getRegisteredPlugins(true);
    },
    getRegisteredPlugins(
        onlyTransformed: boolean = true
    ): PluginManagerPlugin[] {
        const plugins = Array.from(pluginRegistry.entries()).map(
            (p: any) =>
                ({
                    ...p[1]
                } as PluginManagerPlugin)
        );

        return onlyTransformed ? plugins.filter(p => p.transformed) : plugins;
    }
});
