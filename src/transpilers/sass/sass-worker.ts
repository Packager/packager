import { dirname, resolve } from "../../utils/path";
import { TRANSPILE_STATUS } from "../transpiler";

declare var Sass: any;

self.importScripts("https://unpkg.com/sass.js@latest/dist/sass.sync.js");

self.addEventListener("message", async ({ data }: any) => {
    const { file, type, context } = data;
    if (type === TRANSPILE_STATUS.PREPARE_FILES) {
        try {
            setupSass(context);

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

const setupSass = (context: any) => {
    const sassFiles = context.files.filter(
        (f: any) => f.path.endsWith(".sass") || f.path.endsWith(".scss")
    );

    Sass.writeFile(
        sassFiles.reduce(
            (acc: any, curr: any) => ({
                ...acc,
                [curr.path]: curr.code
            }),
            {}
        )
    );

    for (const file of sassFiles) {
        Sass.importer((request: any, done: Function) =>
            importer(file, sassFiles, request, done)
        );
    }
};

const importer = (
    file: any,
    sassFiles: any[],
    request: any,
    done: Function
) => {
    const path = resolve(dirname(file.path), request.current);
    const potentialPaths = Sass.getPathVariations(path);
    const actualFile = sassFiles.find(
        (file: any) => ~potentialPaths.indexOf(file.path)
    );

    if (actualFile && actualFile.path) {
        return done({
            path: actualFile.path,
            contents: actualFile.code
        });
    } else {
        throw new Error(`The file ${request.current} does not exist`);
    }
};

const transpileFile = (file: any) => {
    return new Promise((resolve, reject) => {
        Sass.options({
            indentedSyntax: file.path.endsWith(".sass") || file.lang === "sass"
        });

        Sass.compile(file.code, (result: any) => {
            if (result.formatted) {
                reject(result.formatted);
            } else {
                resolve({
                    ...file,
                    code: result.text,
                    map: result.map
                });
            }
        });
    });
};
