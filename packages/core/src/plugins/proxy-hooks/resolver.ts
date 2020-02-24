import { PluginAPI, PackagerContext } from "packager/types";
import { verifyExtensions } from "packager-shared";

export default (plugin: PluginAPI, context: PackagerContext) => {
    const canBeResolved = verifyExtensions(plugin.extensions);

    const resolverFunction = async (moduleId: string, parentId?: string) => {
        if (!canBeResolved(moduleId)) return null;

        return moduleId;
    };

    return new Proxy(resolverFunction, {
        async apply(target, thisArg, argumentsList) {
            const handledResolverFunction = await Reflect.apply(
                target,
                context,
                argumentsList
            );

            if (!handledResolverFunction) {
                return Promise.resolve();
            }

            return (
                (await plugin.resolver!.bind(context)(
                    argumentsList[0],
                    argumentsList[1]
                )) || null
            );
        }
    });
};
