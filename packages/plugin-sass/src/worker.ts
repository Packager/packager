import { TRANSPILE_STATUS } from "packager";
import { path, stylePluginHelpers } from "packager-shared";

const { dirname, resolve } = path;

declare global {
    interface Window {
        Sass: any;
    }
}

const loadSass = () => {
    if (!self.Sass) {
        self.importScripts(
            "https://unpkg.com/sass.js@latest/dist/sass.sync.js"
        );
    }
};

loadSass();

self.addEventListener("message", async ({ data }: any) => {
    loadSass();

    const { file, type, context } = data;
    if (type === TRANSPILE_STATUS.PREPARE_FILES) {
        try {
            setupSass(context);

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

const setupSass = (context: any) => {
    const sassFiles = context.files.filter(
        (f: any) => f.path.endsWith(".sass") || f.path.endsWith(".scss")
    );

    self.Sass.writeFile(
        sassFiles.reduce(
            (acc: any, curr: any) => ({
                ...acc,
                [curr.path]: curr.code
            }),
            {}
        )
    );

    for (const file of sassFiles) {
        self.Sass.importer((request: any, done: Function) =>
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
    const potentialPaths = self.Sass.getPathVariations(path);
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
        self.Sass.options({
            indentedSyntax: file.path.endsWith(".sass") || file.lang === "sass"
        });

        self.Sass.compile(file.code, (result: any) => {
            if (result.formatted) {
                reject(result.formatted);
            } else {
                resolve({
                    ...file,
                    code: result.text,
                    // code: stylePluginHelpers.generateExport({
                    //     ...file,
                    //     code: result.text
                    // }),
                    map: result.map
                });
            }
        });
    });
};
