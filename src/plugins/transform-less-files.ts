import { Plugin } from "rollup";
import LessTranspiler from "../transpilers/less";
import { PackagerContext } from "./";
import verifyExtensions from "../utils/verify-extensions";
import generateExport from "../utils/style-plugin-export-generator";

export default function transformLessFiles(context: PackagerContext): Plugin {
    const isLess = verifyExtensions([".less"]);
    let transpiler: LessTranspiler;

    return {
        name: "transform-less-files",
        async transform(code: string, modulePath: string) {
            if (isLess(modulePath)) {
                transpiler = context.cache.transpilers.get("less-transpiler");
                if (!transpiler) {
                    transpiler = new LessTranspiler(context);
                    context.cache.transpilers.set(
                        "less-transpiler",
                        transpiler
                    );
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push("Less-Transpiler", () =>
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

                throw new Error("Failed to transpile Less file " + modulePath);
            }
        }
    };
}
