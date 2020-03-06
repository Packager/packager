import { verifyExtensions } from "packager-shared";
import { TransformationException } from "../../exceptions";
import {
    PluginAPI,
    PackagerContext,
    TranspilerFactoryResult
} from "../../../types";

export default (plugin: PluginAPI, context: PackagerContext) => {
    const transpilerName = `${plugin.name}-transpiler`;
    const transformFunction = async (code: string, moduleId: string) => {
        let transpiler: TranspilerFactoryResult;
        transpiler = context.cache.transpilers.get(transpilerName);
        if (!transpiler) {
            transpiler = plugin.transpiler && plugin.transpiler(context);
            context.cache.transpilers.set(transpilerName, transpiler);
        } else {
            transpiler.setContext(context);
        }

        if (!verifyExtensions(transpiler.extensions)(moduleId)) {
            return null;
        }

        const file = context.files.find(f => f.path === moduleId)!;
        await context.workerQueue.push(transpiler.transpile({ ...file, code }));

        const completed = context.workerQueue.complete.find(
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
            context = { ...context, acornParser: thisArg.parse };
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
