import { File } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";
import { Service } from "esbuild";

interface ServiceOptions {
  wasmURL: string;
  worker: boolean;
}

declare global {
  interface Window {
    esbuildService: Service;
    esbuild: {
      startService: (options: ServiceOptions) => Service;
    };
  }
}

self.esbuildService = {} as Service;

const loadEsbuildService = async () => {
  if (!self.esbuild) {
    self.importScripts("https://unpkg.com/esbuild-wasm@0.5.1/lib/browser.js");

    self.esbuildService = await self.esbuild.startService({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.5.1/esbuild.wasm",
      worker: false,
    });
  }
};

const loaderByFile = (file: File) =>
  file.path.endsWith(".js") || file.path.endsWith(".jsx") ? "jsx" : "tsx";

self.addEventListener("message", async ({ data }: any) => {
  await loadEsbuildService();

  const { type, file } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiledCode = await self.esbuildService.transform(file.code, {
        sourcemap: true,
        target: "esnext",
        loader: loaderByFile(file),
        sourcefile: file.path,
      });

      // @ts-ignore
      self.postMessage({
        type: TRANSPILE_STATUS.END,
        file: { ...file, code: transpiledCode.js },
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
