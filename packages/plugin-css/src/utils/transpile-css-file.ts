import { WebWorkerContext } from "packager";
import { path, resolveWorkerDependency } from "packager-pluginutils";
import { importPlugin } from "../postcss-plugins";
import { Postcss, ImportPluginOptions } from "../types";

export default async function (context: WebWorkerContext, postcss: Postcss) {
  const importOptions: ImportPluginOptions = {
    postcss,
    resolver: async (moduleId: string, parentId: string) => {
      return path.resolve(path.dirname(parentId), moduleId);
    },
    loader: async (moduleId: string) => {
      const module = await resolveWorkerDependency(moduleId);

      if (module) {
        return module.code;
      }

      throw new Error(`Not able to load ${moduleId}`);
    },
  };

  const result = await postcss([importPlugin(importOptions)]).process(
    context.code,
    {
      from: context.moduleId,
      to: context.moduleId,
      map: { inline: true },
    }
  );

  return { ...context, code: result.css };
}
