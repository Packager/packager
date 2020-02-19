import { PluginAPI, PackagerContext } from "packager/types";
import { TransformationException } from "packager/exceptions";
import verifyExtensions from "packager/shared/verify-extensions";

export default (plugin: PluginAPI, context: PackagerContext) => {
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
