import { PluginAPI, PluginContext } from "packager/types";

export default (plugin: PluginAPI, context: PluginContext) => {
    const loaderFunction = async (moduleId: string) => {
        return moduleId;
    };

    return new Proxy(loaderFunction, {
        async apply(target, thisArg, argumentsList) {
            const handledLoaderFunction = await Reflect.apply(
                target,
                context,
                argumentsList
            );

            if (!handledLoaderFunction) {
                return Promise.resolve();
            }

            return (
                (await plugin.loader!.bind(context)(argumentsList[0])) || null
            );
        }
    });
};
