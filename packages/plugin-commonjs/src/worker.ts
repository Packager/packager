import { WebWorkerContext, WebWorkerEvent, File } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";

self.addEventListener("message", async ({ data }: WebWorkerEvent) => {
  const { file, type } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiledFile = await transpileFile(file);

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

const transpileFile = async (file: File) => {};
