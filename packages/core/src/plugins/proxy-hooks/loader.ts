import { PluginAPI, PackagerContext } from "packager/types";
import { verifyExtensions } from "packager-shared";

export default (plugin: PluginAPI, context: PackagerContext) => {
    const canBeLoaded = verifyExtensions(plugin.extensions);

    const loaderFunction = async (moduleId: string) => {
        if (!canBeLoaded(moduleId)) return null;

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
