import { File, WebWorkerEvent, WebWorkerContext } from "packager";
import { TRANSPILE_STATUS, path, styleHelpers } from "packager-pluginutils";
import { importPlugin, ImportPluginOptions } from "./postcss-plugins";

import { Postcss } from "./types";

declare global {
  interface Window {
    postcss: Postcss;
  }
}

const loadPostcss = () => {
  if (!self.postcss) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs@latest/libs/postcss.js"
    );
  }
};

loadPostcss();

self.addEventListener("message", async ({ data }: WebWorkerEvent) => {
  const { file, type, context } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiledFile = await transpileFile(file, context);

      // @ts-ignore
      self.postMessage({
        type: TRANSPILE_STATUS.END,
        file: transpiledFile,
      });
    } catch (error) {
      // @ts-ignore wrong scope
      self.postMessage({
        type: TRANSPILE_STATUS.ERROR,
        error,
      });
    }
  }
});

const transpileFile = async (file: File, context: WebWorkerContext) => {
  const importOptions: ImportPluginOptions = {
    postcss: self.postcss,
    resolve: async (moduleId: string, parentId: string) => {
      return path.resolve(path.dirname(parentId), moduleId);
    },
    load: async (moduleId: string) => {
      const module = context.files.find((f) => f.path === moduleId);

      if (module) {
        return module.code;
      }

      throw new Error(`Not able to load ${moduleId}`);
    },
  };

  const plugins = [importPlugin(importOptions)];
  const result = await self.postcss(plugins).process(file.code, {
    from: file.path,
    to: file.path,
    map: { inline: true },
  });

  return {
    ...file,
    code: result.css,
  };
};
