import { File, WebWorkerEvent, WebWorkerContext } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";

declare global {
  interface Window {
    stylus: any;
  }
}

const loadStylus = () => {
  if (!self.stylus) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/@bloxy/iife-libs/libs/stylus.js"
    );
  }
};

loadStylus();

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

const transpileFile = async (file: File, context: WebWorkerContext) =>
  new Promise((resolve, reject) => {
    self
      .stylus(file.code)
      .set("filename", file.path)
      .render((err: any, css: string) => {
        if (err) {
          reject(err);
        } else {
          resolve({ ...file, code: css });
        }
      });
  });
