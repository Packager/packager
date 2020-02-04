import { Plugin } from "rollup";
import StylusTranspiler from "../transpilers/stylus";
import { PackagerContext } from "./";
import verifyExtensions from "../utils/verify-extensions";
import generateExport from "../utils/style-plugin-export-generator";

export default function transformStylusFiles(context: PackagerContext): Plugin {
    const isStylus = verifyExtensions([".styl", ".stylus"]);
    let transpiler: StylusTranspiler;

    return {
        name: "transform-stylus-files",
        async transform(code: string, modulePath: string) {
            if (isStylus(modulePath)) {
                transpiler = context.cache.transpilers.get("stylus-transpiler");
                if (!transpiler) {
                    transpiler = new StylusTranspiler(context);
                    context.cache.transpilers.set(
                        "stylus-transpiler",
                        transpiler
                    );
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push("Stylus-Transpiler", () =>
                    transpiler.transpile({ ...file, code })
                );
                const completed = context.transpileQueue.completed.find(
                    c => c.path === modulePath
                );

                if (completed) {
                    return {
                        code: generateExport(completed),
                        map: completed.map || { mappings: "" }
                    };
                }

                throw new Error(
                    "Failed to transpile Stylus file " + modulePath
                );
            }
        }
    };
}
