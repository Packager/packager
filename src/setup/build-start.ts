import { extname } from "../utils/path";
import transpilers from "../transpilers";
// import findDependencies from "../loaders/utils/find-dependencies";

import { PackagerContext, Setup } from "../types/packager";

export default function initialSetup(context: PackagerContext): Setup {
    const getAllLangsFromFiles = () =>
        context.files.reduce((acc: string[], curr: any) => {
            const extension: string = extname(curr.path).slice(1);
            if (!acc.includes(extension)) {
                acc.push(extension);
                return acc;
            }
            return acc;
        }, []);

    // const checkExternalLibs = (depsHaveExternal: boolean = false): boolean => {
    //     const langs = getAllLangsFromFiles();

    //     const forceExternal = langs.some(
    //         (lang: string) => transpilers[lang].forceExternal
    //     );

    //     return forceExternal || depsHaveExternal;
    // };

    const usingUnsupportedFiles = () => {
        const givenLangs = getAllLangsFromFiles();
        const unsupportedExtensions = givenLangs.reduce(
            (acc: string[], curr: string) => {
                if (!transpilers[curr]) {
                    acc.push(curr);
                    return acc;
                }
                return acc;
            },
            []
        );

        return {
            extensions: unsupportedExtensions,
            unsupportedFiles: !!unsupportedExtensions.length
        };
    };

    return {
        name: "packager::setup::build-start",
        async buildStart(): Promise<void> {
            const { unsupportedFiles, extensions } = usingUnsupportedFiles();

            if (unsupportedFiles) {
                throw Error(
                    `Files with the following extensions are not supported yet: ${extensions.join(
                        ", "
                    )}.`
                );
            }

            // const entryFile = context.files.find(f => f.entry)!;
            // const dependencies = findDependencies(entryFile, context, true);
            // const hasExternalLibs = checkExternalLibs(
            //     dependencies._hasExternal
            // );
        }
    };
}
