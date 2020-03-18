import { verifyExtensions } from "packager-shared";
import { TransformationException } from "../../exceptions";
import { PluginAPI, PluginContext, TranspilerContext } from "../../../types";
import { createTranspiler } from "../utils";

export default (plugin: PluginAPI, context: PluginContext) => {
  const transpilerName = `${plugin.name}-transpiler`;
  const transformFunction = async (code: string, moduleId: string) => {
    if (!plugin.transpiler) return null;

    let transpiler: TranspilerContext = context.packagerContext.transpilers.get(
      transpilerName
    );

    if (!transpiler) {
      transpiler = createTranspiler(plugin.transpiler, context);
    } else {
      transpiler.setContext(context);
    }

    context.packagerContext.transpilers.set(transpilerName, transpiler);

    if (!verifyExtensions(transpiler.extensions)(moduleId)) {
      return null;
    }

    const file = context.packagerContext.files.find(f => f.path === moduleId)!;
    await context.packagerContext.workerQueue.push(
      transpiler.transpile({ ...file, code })
    );

    const completed = context.packagerContext.workerQueue.complete.find(
      c => c.path === moduleId
    );

    if (completed) {
      return {
        code: completed.code,
        map: completed.map || { mappings: "" },
        moduleId
      };
    }

    throw new TransformationException(moduleId, transpilerName);
  };

  return new Proxy(transformFunction, {
    async apply(target, thisArg, argumentsList) {
      context.packagerContext = {
        ...context.packagerContext,
        acornParser: thisArg.parse
      };
      const handledTransformFunction = await Reflect.apply(
        target,
        context,
        argumentsList
      );

      if (!handledTransformFunction) {
        return Promise.resolve();
      }

      if (!plugin.beforeBundle) {
        return handledTransformFunction;
      }

      const { code, map, moduleId } = handledTransformFunction;

      return {
        code: plugin.beforeBundle.bind(context)(code, moduleId) || code,
        map
      };
    }
  });
};
