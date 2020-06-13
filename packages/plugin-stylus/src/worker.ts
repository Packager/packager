import { WebWorkerEvent, WebWorkerContext } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";

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

const transpileFile = async (context: WebWorkerContext) =>
  new Promise((resolve, reject) => {
    self
      .stylus(context.code)
      .set("filename", context.moduleId)
      .render((err: any, css: string) => {
        if (err) {
          reject(err);
        } else {
          resolve({ ...context, code: css });
        }
      });
  });
