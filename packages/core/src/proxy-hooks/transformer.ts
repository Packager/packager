import { Plugin } from "../types";
import { createTranspiler } from "./utils";
import { packagerContext, isModuleExternal } from "../utils";
import { TranspileContext } from "./utils";

const transformerHook = (plugin: Plugin) =>
  new Proxy(
    async (code: string, moduleId: string) => {
      /**
       * if gateway doesn't exist on the transpiler object,
       * we throw because it is a required field of a plugin.
       */
      if (!plugin.transpiler.gateway) {
        throw new Error(`'gateway' is required in ${plugin.name}`);
      }

      /**
       * if both worker and beforeBundle don't exist, we should ignore
       * because another plugin could be taking care of this.
       */
      if (!plugin.transpiler.worker && !plugin.transpiler.beforeBundle) {
        return null;
      }

      /**
       * if the provided gateway check fails, we don't need to worry about
       * this as this plugin is not interested in this particular file/code.
       */
      if (!plugin.transpiler.gateway(moduleId, code)) {
        return null;
      }

      /**
       * if worker doesn't exist but beforeBundle does, we can safely return
       * code and moduleId because we already check for any ignores.
       */
      if (!plugin.transpiler.worker && plugin.transpiler.beforeBundle) {
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

      const transpiled = await transpiler.transpile({
        isExternal: isModuleExternal(moduleId),
        moduleId,
        code,
      } as TranspileContext);

      if (transpiled) {
        return {
          ...(transpiled.meta || {}),
          code: transpiled.code,
          map: transpiled.map || { mappings: "" },
          moduleId,
        };
      }

      throw new Error(`Failed to transpile ${moduleId} in ${transpilerName}.`);
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

        const { code, map, moduleId, ...meta } = handledTransformFunction;

        if (!plugin.transpiler.beforeBundle) {
          return handledTransformFunction;
        }

        return {
          ...meta,
          code:
            plugin.transpiler.beforeBundle.bind(thisArg)(moduleId, code) ||
            code,
          map,
        };
      },
    }
  );

export default transformerHook;
