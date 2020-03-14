import { TRANSPILE_STATUS } from "packager";

declare global {
    interface Window {
        sucrase: any;
    }
}

const loadSucrase = () => {
    if (!self.sucrase) {
        self.importScripts(
            "https://unpkg.com/@bloxy/iife-libs@latest/libs/sucrase.js"
        );
    }
};

loadSucrase();
self.addEventListener("message", async ({ data }: any) => {
    loadSucrase();
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
                type: TRANSPILE_STATUS.ERROR_COMPILE,
                error
            });
        }
    }
});

const transpileFile = (file: any) =>
    new Promise((resolve, reject) => {
        const transpiled = self.sucrase.transform(file.code, {
            transforms: ["typescript", "jsx"],
            filePath: file.path,
            enableLegacyTypeScriptModuleInterop: true,
            sourceMapOptions: {
                compiledFilename: file.path
            }
        });

        if (transpiled && transpiled.code) {
            resolve({
                ...file,
                code: transpiled.code,
                map: transpiled.sourceMap || {}
            });
        } else {
            reject(`Failed to transpile ${file.path}`);
        }
    });
