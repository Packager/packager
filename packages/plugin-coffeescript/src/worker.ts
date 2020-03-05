import { TRANSPILE_STATUS } from "packager";
declare global {
    interface Window {
        CoffeeScript: any;
    }
}

const loadCoffeescript = () => {
    if (!self.CoffeeScript) {
        self.importScripts(
            "https://unpkg.com/coffeescript/lib/coffeescript-browser-compiler-legacy/coffeescript.js"
        );
    }
};

self.addEventListener("message", async ({ data }: any) => {
    loadCoffeescript();

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

const transpileFile = (file: any) => {
    return new Promise((resolve, reject) => {
        try {
            const transpiled = self.CoffeeScript.compile(file.code, {
                filename: file.path,
                sourceMap: true
            });

            resolve({
                ...file,
                code: transpiled.js,
                map: JSON.parse(transpiled.v3SourceMap || "{}")
            });
        } catch (e) {
            reject(e);
        }
    });
};
