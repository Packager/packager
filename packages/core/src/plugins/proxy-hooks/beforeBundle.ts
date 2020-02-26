import { PluginAPI, PackagerContext } from "../../../types";

export default (plugin: PluginAPI, context: PackagerContext) => {
    const checkIfFileIsAlreadyTranspiler = (path: string) =>
        context.transpileQueue.completed.find(f => f.path === path);

    const beforeBundleFunction = async (code: string, moduleId: string) => {
        const file = checkIfFileIsAlreadyTranspiler(moduleId);

        if (file) {
            return {
                code: file.code,
                map: file.map || { mappings: "" },
                moduleId
            };
        }

        return { code, map: { mappings: "" }, moduleId };
    };

    return new Proxy(beforeBundleFunction, {
        async apply(target, thisArg, argumentsList) {
            const handledTransformFunction = await Reflect.apply(
                target,
                context,
                argumentsList
            );

            if (!handledTransformFunction) {
                return Promise.resolve();
            }

            const { code, map, moduleId } = handledTransformFunction;

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
