import { TransformationException } from "../../exceptions";
import { PluginAPI, PackagerContext } from "../../../types";

export default (plugin: PluginAPI, context: PackagerContext) => {
    const transpilerName = `${plugin.name}-transpiler`;
    const transformFunction = async (code: string, moduleId: string) => {
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
                map: completed.map || { mappings: "" },
                moduleId
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

            if (!handledTransformFunction) {
                return Promise.resolve();
            }

            if (!plugin.beforeBundle) {
                return handledTransformFunction;
            }

            const { code, map, moduleId } = handledTransformFunction;

            return {
                code: plugin.beforeBundle.bind(context)(code, moduleId) || code,
                map
            };
        }
    });
};
