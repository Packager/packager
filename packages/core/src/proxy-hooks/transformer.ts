import { verifyExtensions } from "packager-pluginutils";
import { Plugin, File } from "../types";
import { createTranspiler } from "./utils";
import { packagerContext, isModuleExternal } from "../utils";

const transformerHook = (plugin: Plugin) =>
  new Proxy(
    async (code: string, moduleId: string) => {
      const isExternal = isModuleExternal(moduleId);
      if (isExternal && !verifyExtensions(plugin.extensions)(moduleId)) {
        return null;
      }

      if (!plugin.transpiler) {
        return { code, moduleId };
      }

      const transpilerName = `${plugin.name}-transpiler`;
      const allTranspilers = packagerContext.get("transpilers");

      let transpiler = allTranspilers[transpilerName];
      if (!transpiler) {
        transpiler = createTranspiler(plugin);

        packagerContext.set("transpilers", {
          ...packagerContext.get("transpilers"),
          [transpilerName]: transpiler,
        });
      }

      const file = packagerContext
        .get("files")
        .find((file) => file.path === moduleId);

      const transpiled = await transpiler.transpile({ ...file, code });

      if (transpiled) {
        return {
          code: transpiled.code,
          map: transpiled.map || { mappings: "" },
          moduleId,
        };
      }

      return null;
    },
    {
      async apply(target, thisArg, argumentsList) {
        const handledTransformFunction = await Reflect.apply(
          target,
          thisArg,
          argumentsList
        );

        if (!handledTransformFunction) {
          return Promise.resolve();
        }

        const { code, map, moduleId } = handledTransformFunction;

        if (!plugin.beforeBundle) {
          return handledTransformFunction;
        }

        return {
          code: plugin.beforeBundle.bind(thisArg)(code, moduleId) || code,
          map,
        };
      },
    }
  );

export default transformerHook;
