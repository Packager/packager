import { WebWorkerEvent } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";
import transpileFile from "./utils/transpile-less-file";
import { WebWorker } from "./types";

declare const self: WebWorker;

self.window = self as any;
self.window.document = {
  currentScript: { async: true },
  createElement: () => ({ appendChild: () => {} } as any),
  createTextNode: () => ({}),
  getElementsByTagName: () => [],
  head: { appendChild: () => {}, removeChild: () => {} } as any,
};

const loadLess = () => {
  if (!self.less) {
    self.importScripts("https://cdn.jsdelivr.net/npm/less");
  }
};

const loadPostcss = () => {
  if (!self.postcss) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs@latest/libs/postcss.js"
    );
  }
};

loadLess();
loadPostcss();

self.addEventListener("message", async ({ data }: WebWorkerEvent) => {
  const { type, context } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiledFile = await transpileFile(
        context,
        self.less,
        self.postcss
      );

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
