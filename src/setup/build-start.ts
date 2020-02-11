import { extname } from "../utils/path";
import transpilers from "../transpilers";
import findDependencies from "../loaders/utils/find-dependencies";
import babelCjsPlugin from "./utils/babel-cjs-plugin";
import { loadBabel, loadBabelTypes } from "./utils";

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

    const checkExternalLibs = (depsHaveExternal: boolean = false): boolean => {
        const langs = getAllLangsFromFiles();

        const forceExternal = langs.some(
            (lang: string) => transpilers[lang].forceExternal
        );

        return forceExternal || depsHaveExternal;
    };

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

            const entryFile = context.files.find(f => f.entry)!;
            const dependencies = findDependencies(entryFile, context, true);
            const hasExternalLibs = checkExternalLibs(
                dependencies._hasExternal
            );

            if (
                hasExternalLibs &&
                // @ts-ignore
                (!window.Babel || !window._babel_types)
            ) {
                try {
                    await loadBabel();
                    await loadBabelTypes();
                } catch (e) {
                    throw e;
                }

                // @ts-ignore
                if (!window.Babel.availablePlugins["transform-commonjs"]) {
                    // @ts-ignore
                    window.Babel.registerPlugin(
                        "transform-commonjs",
                        // @ts-ignore
                        babelCjsPlugin(window._babel_types)
                    );
                }
            }
        }
    };
}
