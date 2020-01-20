import { Plugin } from "rollup";
import VueTranspiler from "../transpilers/vue";
import { PackagerContext } from "./";

export default function transformVueFiles(context: PackagerContext): Plugin {
    let transpiler: VueTranspiler;

    return {
        name: "transform-vue-files",
        // @ts-ignore
        async transform(code: string, modulePath: string) {
            if (modulePath.endsWith(".vue")) {
                transpiler = context.cache.transpilers.get("vue-transpiler");
                if (!transpiler) {
                    transpiler = new VueTranspiler(context);
                    context.cache.transpilers.set("vue-transpiler", transpiler);
                }

                return transpiler.transpile(code);
            }
        },
        generateBundle(options: any, bundle: any) {
            console.log(bundle["app.js"].code);
        }
    };
}
