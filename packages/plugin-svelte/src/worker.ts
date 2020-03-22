import { TRANSPILE_STATUS } from "packager";
import { stylePluginHelpers } from "packager-shared";

declare global {
  interface Window {
    svelte: any;
  }
}

const loadSvelte = () => {
  if (!self.svelte) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/svelte@latest/compiler.min.js"
    );
  }
};

loadSvelte();

self.addEventListener("message", async ({ data }: any) => {
  loadSvelte();

  const { file, type, context, additional } = data;
  if (type === TRANSPILE_STATUS.PREPARE_FILES) {
    try {
      const { styles, rest } = await extractFromFile(file);
      const transpiledFile = await transpileFile({ ...file, code: rest });

      if (styles && styles.length) {
        const additional = { styles };

        // @ts-ignore wrong scope
        self.postMessage({
          type: TRANSPILE_STATUS.PREPARE_ADDITIONAL,
          file: transpiledFile,
          additional
        });
      } else {
        // @ts-ignore
        self.postMessage({
          type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
          file: transpiledFile
        });
      }
    } catch (error) {
      // @ts-ignore wrong scope
      self.postMessage({
        type: TRANSPILE_STATUS.ERROR_COMPILE,
        error
      });
    }
  }

  if (type === TRANSPILE_STATUS.ADDITIONAL_TRANSPILED) {
    let code = file.code;
    if (additional) {
      try {
        code += stylePluginHelpers.generateExportsForAllStyles(
          additional.styles.map((s: any) => s.code),
          file.path
        );

        // @ts-ignore wrong scope
        self.postMessage({
          type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
          file: { ...file, code }
        });
      } catch (error) {
        // @ts-ignore wrong scope
        self.postMessage({
          type: TRANSPILE_STATUS.ERROR_ADDITIONAL,
          error
        });
      }
    }
  }
});

const extractFromFile = async (file: any) => {
  const extracted: { [type: string]: any[] } = {
    styles: []
  };

  const { code } = await self.svelte.preprocess(
    file.code,
    {
      style: ({ content: code, attributes }: any) => {
        const extension = `.${attributes.lang || "css"}`;

        extracted.styles.push({
          name: `${file.name}${extension}_`,
          path: `${file.path}${extension}_`,
          code,
          extension
        });

        return { code: "" };
      }
    },
    { filename: file.path }
  );

  return {
    styles: extracted.styles,
    rest: code
  };
};

const transpileFile = (file: any): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      const transpiled = self.svelte.compile(file.code, {
        filename: file.path
      });

      resolve({
        ...file,
        code: transpiled.js.code
      });
    } catch (error) {
      reject(error);
    }
  });
