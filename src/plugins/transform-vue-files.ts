import { Plugin } from "rollup";
import VueTranspiler from "../transpilers/vue";
import { PackagerContext } from "./";
import verifyExtensions from "../utils/verify-extensions";

export default function transformVueFiles(context: PackagerContext): Plugin {
    const isVue = verifyExtensions([".vue"]);
    let transpiler: VueTranspiler;

    return {
        name: "transform-vue-files",
        async transform(code: string, modulePath: string) {
            if (isVue(modulePath)) {
                transpiler = context.cache.transpilers.get("vue-transpiler");
                if (!transpiler) {
                    transpiler = new VueTranspiler(context);
                    context.cache.transpilers.set("vue-transpiler", transpiler);
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push("Vue-Transpiler", () =>
                    transpiler.transpile({ ...file, code })
                );
                const completed = context.transpileQueue.completed.find(
                    c => c.path === modulePath
                );

                if (completed) {
                    return {
                        code: completed.code
                    };
                }

                throw new Error("Failed to transpile Vue file " + modulePath);
            }
        }
    };
}
