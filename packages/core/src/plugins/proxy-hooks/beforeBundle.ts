import { PluginAPI, PackagerContext } from "../../../types";
import { verifyExtensions } from "packager-shared";

export default (plugin: PluginAPI, context: PackagerContext) => {
    const canBeBeforeBundled = verifyExtensions(plugin.extensions);
    const checkIfFileIsAlreadyTranspiler = (path: string) =>
        context.transpileQueue.completed.find(f => f.path === path);

    const beforeBundleFunction = async (code: string, moduleId: string) => {
        console.log("before bundling...", {
            code,
            moduleId
        });

        if (!canBeBeforeBundled(moduleId) && !plugin.allowExternal) return null;

        const file = checkIfFileIsAlreadyTranspiler(moduleId);

        if (file) {
            console.log("fileExists beforeBundleFunction", {
                code: file.code,
                map: file.map || { mappings: "" },
                moduleId
            });

            return {
                code: file.code,
                map: file.map || { mappings: "" },
                moduleId
            };
        }

        console.log("fileDoesnt beforeBundleFunction", {
            code,
            map: { mappings: "" },
            moduleId
        });

        return { code, map: { mappings: "" }, moduleId };
    };

    return new Proxy(beforeBundleFunction, {
        async apply(target, thisArg, argumentsList) {
            context = { ...context, parser: thisArg.parse } as any;

            console.log("beforeBundle hook context", context);

            const handledTransformFunction = await Reflect.apply(
                target,
                context,
                argumentsList
            );

            console.log("handledTransformFunction", {
                handledTransformFunction
            });

            if (!handledTransformFunction) {
                return Promise.resolve();
            }

            const { code, map, moduleId } = handledTransformFunction;

            console.log("beforeBundleProxy", {
                code,
                map,
                moduleId
            });

            return {
                code:
                    (await plugin.beforeBundle!.bind(context)(
                        code,
                        moduleId
                    )) || code,
                map
            };
        }
    });
};
