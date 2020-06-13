import { WebWorkerEvent, WebWorkerContext } from "packager";
import { TRANSPILE_STATUS, path } from "packager-pluginutils";
import { importPlugin, ImportPluginOptions } from "./postcss-plugins";

import { Postcss } from "./types";

interface WebWorker extends Worker {
  postcss: Postcss;
  importScripts: (...urls: Array<string>) => void;
}
declare const self: WebWorker;

const loadPostcss = () => {
  if (!self.postcss) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs@latest/libs/postcss.js"
    );
  }
};

loadPostcss();

self.addEventListener("message", async ({ data }: WebWorkerEvent) => {
  const { type, context } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiledFile = await transpileFile(context);

      self.postMessage({
        type: TRANSPILE_STATUS.END,
        context: transpiledFile,
      });
    } catch (error) {
      self.postMessage({
        type: TRANSPILE_STATUS.ERROR,
        error,
      });
    }
  }
});

const resolveDependency = (moduleId: string): Promise<WebWorkerContext> =>
  new Promise((resolve) => {
    self.postMessage({
      type: TRANSPILE_STATUS.ADD_DEPENDENCY,
      context: { moduleId, isExternal: false },
    });

    const handleEvent = ({ data }: WebWorkerEvent) => {
      const { context, type } = data;

      if (type === TRANSPILE_STATUS.ADD_DEPENDENCY) {
        resolve(context);

        self.removeEventListener("message", handleEvent);
      }
    };

    self.addEventListener("message", handleEvent);
  });

const transpileFile = async (context: WebWorkerContext) => {
  const importOptions: ImportPluginOptions = {
    postcss: self.postcss,
    resolver: async (moduleId: string, parentId: string) => {
      return path.resolve(path.dirname(parentId), moduleId);
    },
    loader: async (moduleId: string) => {
      const module = await resolveDependency(moduleId);

      if (module) {
        return module.code;
      }

      throw new Error(`Not able to load ${moduleId}`);
    },
  };

  const result = await self
    .postcss([importPlugin(importOptions)])
    .process(context.code, {
      from: context.moduleId,
      to: context.moduleId,
      map: { inline: true },
    });

  return { ...context, code: result.css };
};
