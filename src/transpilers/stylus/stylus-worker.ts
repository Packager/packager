import { TRANSPILE_STATUS } from "../transpiler";

declare var stylus: any;

self.importScripts("https://unpkg.com/@bloxy/iife-libs@latest/libs/stylus.js");

self.addEventListener("message", async ({ data }: any) => {
    const { file, type, context } = data;
    if (type === TRANSPILE_STATUS.PREPARE_FILES) {
        try {
            const transpiledFile = await transpileFile(file);

            // @ts-ignore
            self.postMessage({
                type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
                file: transpiledFile
            });
        } catch (error) {
            // @ts-ignore wrong scope
            self.postMessage({
                type: TRANSPILE_STATUS.ERROR_PREPARING_AND_COMPILING,
                error
            });
        }
    }
});

const transpileFile = (file: any) =>
    new Promise((resolve, reject) => {
        stylus(file.code)
            .set("filename", file.path)
            .render((err: any, css: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        ...file,
                        code: css
                    });
                }
            });
    });
