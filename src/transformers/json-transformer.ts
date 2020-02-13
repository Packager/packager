import JsonTranspiler from "@transpilers/json";
import {
    PackagerContext,
    TransformResult,
    Transformer
} from "@typedefs/packager";
import verifyExtensions from "@shared/verify-extensions";

export default function jsonTransformer(context: PackagerContext): Transformer {
    const transformerName = "packager::transformer::json-transformer";
    const isJson = verifyExtensions([".json"]);

    let transpiler: JsonTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
            if (isJson(modulePath)) {
                transpiler = context.cache.transpilers.get("json-transpiler");
                if (!transpiler) {
                    transpiler = new JsonTranspiler(context);
                    context.cache.transpilers.set(
                        "json-transpiler",
                        transpiler
                    );
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push("Json-Transpiler", () =>
                    transpiler.transpile({ ...file, code })
                );
                const completed = context.transpileQueue.completed.find(
                    c => c.path === modulePath
                );

                if (completed) {
                    return {
                        code: `export default ${completed.code}`
                    };
                }
            }
        }
    };
}
