import { WebWorkerEvent } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";
import { Service } from "esbuild";

interface ServiceOptions {
  wasmURL: string;
  worker: boolean;
}

interface WebWorker extends Worker {
  esbuildService: Service;
  esbuild: {
    startService: (options: ServiceOptions) => Service;
  };
  importScripts: (...urls: Array<string>) => void;
}
declare const self: WebWorker;

const loadEsbuildService = async () => {
  if (!self.esbuild) {
    self.importScripts("https://unpkg.com/esbuild-wasm@0.5.1/lib/browser.js");

    self.esbuildService = await self.esbuild.startService({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.5.1/esbuild.wasm",
      worker: false,
    });
  }
};

const loaderByFile = (moduleId: string) =>
  moduleId.endsWith(".js") || moduleId.endsWith(".jsx") ? "jsx" : "tsx";

self.addEventListener("message", async ({ data }: WebWorkerEvent) => {
  await loadEsbuildService();

  const { type, context } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiledCode = await self.esbuildService.transform(context.code, {
        sourcemap: true,
        target: "esnext",
        loader: loaderByFile(context.moduleId),
        sourcefile: context.moduleId,
      });

      self.postMessage({
        type: TRANSPILE_STATUS.END,
        context: { ...context, code: transpiledCode.js },
      });
    } catch (error) {
      self.postMessage({
        type: TRANSPILE_STATUS.ERROR,
        error,
      });
    }
  }
});
