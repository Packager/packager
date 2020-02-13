import VueTranspiler from "@transpilers/vue";
import {
    PackagerContext,
    Transformer,
    TransformResult
} from "@typedefs/packager";
import verifyExtensions from "@shared/verify-extensions";
import { TransformationException } from "@exceptions";

export default function vueTransformer(context: PackagerContext): Transformer {
    const transformerName = "packager::transformer::vue-transformer";
    const isVue = verifyExtensions([".vue"]);

    let transpiler: VueTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
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
                        code: completed.code,
                        map: completed.map || { mappings: "" }
                    };
                }

                throw new TransformationException(modulePath, transformerName);
            }
        }
    };
}
