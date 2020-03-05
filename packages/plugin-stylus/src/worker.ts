import { TRANSPILE_STATUS } from "packager";
import { stylePluginHelpers } from "packager-shared";

declare global {
    interface Window {
        stylus: any;
    }
}

const loadStylus = () => {
    if (!self.stylus) {
        self.importScripts(
            "https://unpkg.com/@bloxy/iife-libs@latest/libs/stylus.js"
        );
    }
};

loadStylus();

self.addEventListener("message", async ({ data }: any) => {
    loadStylus();
    const { file, type, context } = data;
    if (type === TRANSPILE_STATUS.PREPARE_FILES) {
        try {
            const transpiledFile = await transpileFile(file);

            self.postMessage({
                type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
                file: transpiledFile
            });
        } catch (error) {
            self.postMessage({
                type: TRANSPILE_STATUS.ERROR_COMPILE,
                error
            });
        }
    }
});

const transpileFile = (file: any) =>
    new Promise((resolve, reject) => {
        self.stylus(file.code)
            .set("filename", file.path)
            .render((err: any, css: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        ...file,
                        code: stylePluginHelpers.generateExport({
                            ...file,
                            code: css
                        })
                    });
                }
            });
    });
