import { Plugin } from "../types";

const loaderHook = (plugin: Plugin) =>
  new Proxy(async (moduleId: string) => moduleId, {
    async apply(target, thisArg, argumentsList) {
      const handledLoaderFunction = await Reflect.apply(
        target,
        thisArg,
        argumentsList
      );

      if (!handledLoaderFunction) {
        return Promise.resolve();
      }

      return (await plugin.loader.bind(thisArg)(argumentsList[0])) || null;
    },
  });

export default loaderHook;
