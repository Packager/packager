import { Plugin } from "rollup";
import SassTranspiler from "../transpilers/sass";
import { PackagerContext } from "./";
import verifyExtensions from "../utils/verify-extensions";
import generateExport from "../utils/style-plugin-export-generator";

export default function transformSassFiles(context: PackagerContext): Plugin {
    const isSass = verifyExtensions([".sass", ".scss"]);
    let transpiler: SassTranspiler;

    return {
        name: "transform-sass-files",
        async transform(code: string, modulePath: string) {
            if (isSass(modulePath)) {
                transpiler = context.cache.transpilers.get("sass-transpiler");
                if (!transpiler) {
                    transpiler = new SassTranspiler(context);
                    context.cache.transpilers.set(
                        "sass-transpiler",
                        transpiler
                    );
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push("Sass-Transpiler", () =>
                    transpiler.transpile({ ...file, code })
                );
                const completed = context.transpileQueue.completed.find(
                    c => c.path === modulePath
                );

                if (completed) {
                    return {
                        code: generateExport(completed),
                        map: completed.map
                    };
                }

                throw new Error(
                    "Failed to transpile Sass/Scss file " + modulePath
                );
            }
        }
    };
}
