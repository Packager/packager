import { TRANSPILE_STATUS } from "../transpiler";
import { resolveRelative } from "packager/resolvers/dependency-resolver";
import { File } from "packager/types";
import parseCssImport from "./utils/parse-css-import";

declare var css: any;

self.importScripts("https://unpkg.com/@bloxy/iife-libs@latest/libs/css.js");

self.addEventListener("message", async ({ data }: any) => {
    const { file, type, context } = data;

    if (type === TRANSPILE_STATUS.PREPARE_FILES) {
        try {
            const transpiledFile = prepareAndTranspileFile(file, context);

            // @ts-ignore wrong scope
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

const prepareAndTranspileFile = (file: any, context: any) => {
    const originalAst = getAstFromFile(file);
    const rules = appendImportedFilesWithAst(file.path, originalAst, context);
    originalAst.stylesheet.rules = rules;

    const compiledCode = css.stringify(originalAst);

    return { ...file, code: compiledCode };
};

const getAstFromFile = (file: File) =>
    css.parse(file.code, { source: file.path });

const appendImportedFilesWithAst = (
    currentPath: any,
    currentAst: any,
    context: any,
    loopedRules: any = []
) => {
    let currenetLoop = [];
    const rules = currentAst.stylesheet.rules || [];
    for (let rule of rules) {
        if (rule.type != "import") {
            currenetLoop.push(rule);
            loopedRules.push(rule);
        }

        if (rule.import) {
            const importRule = `@import ${rule.import};`;
            const parsedImport = parseCssImport(importRule);

            if (parsedImport.path) {
                const foundFile = <File | null>(
                    resolveRelative(
                        parsedImport.path,
                        currentPath,
                        context,
                        false
                    )
                );

                if (foundFile) {
                    if (!foundFile.path.endsWith(".css")) {
                        throw new Error(
                            `You can't import ${foundFile.path} in ${currentPath} because it's not a CSS file.`
                        );
                    }

                    const parsedAdditionalFile = css.parse(foundFile.code, {
                        source: foundFile.path
                    });

                    if (
                        !parsedImport.condition ||
                        !parsedImport.condition.length
                    ) {
                        appendImportedFilesWithAst(
                            foundFile.path,
                            parsedAdditionalFile,
                            context,
                            loopedRules
                        );
                    } else {
                        const importRules = parsedAdditionalFile.stylesheet.rules.filter(
                            (r: any) => r.type === "import"
                        );

                        loopedRules.push({
                            media: parsedImport.condition,
                            rules: parsedAdditionalFile.stylesheet.rules.filter(
                                (r: any) => r.type !== "import"
                            ),
                            type: "media"
                        });

                        if (importRules.length) {
                            let appendAdditionalImports = {
                                ...parsedAdditionalFile
                            };

                            appendAdditionalImports.stylesheet.rules = importRules;

                            appendImportedFilesWithAst(
                                foundFile.path,
                                appendAdditionalImports,
                                context,
                                loopedRules
                            );
                        }
                    }
                }
            }
        }
    }

    return loopedRules;
};
