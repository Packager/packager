import { File } from "packager";
import { TRANSPILE_STATUS } from "packager-pluginutils";
import { TransformOptions, BabelFileResult } from "@babel/core";

import commonjsPlugin from "./plugins/commonjs-to-es6";

declare global {
  interface Window {
    Babel: {
      transform: (
        code: string,
        options?: TransformOptions
      ) => BabelFileResult | null;
      availablePlugins: Record<string, any>;
    };
  }
}

const loadBabel = () => {
  if (!self.Babel) {
    self.importScripts(
      "https://unpkg.com/@babel/standalone@7.10.2/babel.min.js"
    );
  }
};

loadBabel();

self.addEventListener("message", async ({ data }: any) => {
  const { type, file } = data;

  if (type === TRANSPILE_STATUS.START) {
    try {
      const transpiled = self.Babel.transform(file.code, {
        filename: file.path,
        plugins: [commonjsPlugin],
      });

      const transpiledFile =
        transpiled.code === file.code
          ? null
          : { ...file, code: transpiled.code };

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
