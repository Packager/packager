import { PluginAPI, PluginContext } from "packager/types";

export default (plugin: PluginAPI, context: PluginContext) => {
  const resolverFunction = async (moduleId: string, parentId?: string) => {
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

      try {
        return (
          (await plugin.resolver!.bind(context)(
            argumentsList[0],
            argumentsList[1]
          )) || null
        );
      } catch (e) {
        throw Error(e);
      }
    }
  });
};
