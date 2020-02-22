import { generateExportsForAllStyles } from "packager/shared/style-plugin-helpers";
import { TRANSPILE_STATUS } from "../transpiler";

declare var svelte: any;

self.importScripts(
    "https://cdn.jsdelivr.net/npm/svelte@latest/compiler.min.js"
);

self.addEventListener("message", async ({ data }: any) => {
    const { file, type, additional } = data;
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
                code += generateExportsForAllStyles(
                    additional.styles.map((s: any) => s.code),
                    file.path
                );

                // @ts-ignore wrong scope
                self.postMessage({
                    type: TRANSPILE_STATUS.TRANSPILE_COMPLETE,
                    file: {
                        ...file,
                        code
                    }
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

    const { code } = await svelte.preprocess(
        file.code,
        {
            style: ({ content: code, attributes }: any) => {
                extracted.styles.push({
                    code,
                    lang: attributes.lang || "css",
                    path: file.path
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
            const transpiled = svelte.compile(file.code, {
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
