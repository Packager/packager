import { Plugin } from "../types";

const resolverHook = (plugin: Plugin) =>
  new Proxy(async (moduleId: string, parentId?: string) => moduleId, {
    async apply(target, thisArg, argumentsList) {
      const handledResolverFunction = await Reflect.apply(
        target,
        thisArg,
        argumentsList
      );

      if (!handledResolverFunction) {
        return Promise.resolve();
      }

      return (
        (await plugin.resolver.bind(thisArg)(
          argumentsList[0],
          argumentsList[1]
        )) || null
      );
    },
  });

export default resolverHook;
