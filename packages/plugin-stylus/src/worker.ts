import { WebWorkerEvent } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";

import transpileFile from "./utils/transpile-stylus-file";

interface WebWorker extends Worker {
  stylus: (code: string) => any;
  importScripts: (...urls: Array<string>) => void;
}
declare const self: WebWorker;

const loadStylus = () => {
  if (!self.stylus) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs/libs/stylus.js"
    );
  }
};

loadStylus();

self.addEventListener("message", async ({ data }: WebWorkerEvent) => {
  const { type, context } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiledFile = await transpileFile(context, self.stylus);

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
