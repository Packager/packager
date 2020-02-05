import TypescriptTranspiler from "../transpilers/typescript";
import {
    PackagerContext,
    Transformer,
    TransformResult
} from "../types/packager";
import verifyExtensions from "../utils/verify-extensions";
import TransformationException from "../exceptions/TransformationException";

export default function typescriptTransformer(
    context: PackagerContext
): Transformer {
    const transformerName = "typescript-transformer";
    const isTypescriptOrJavascript = verifyExtensions([
        ".js",
        ".jsx",
        ".ts",
        ".tsx"
    ]);

    let transpiler: TypescriptTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
            if (isTypescriptOrJavascript(modulePath)) {
                transpiler = context.cache.transpilers.get(
                    "typescript-transpiler"
                );
                if (!transpiler) {
                    transpiler = new TypescriptTranspiler(context);
                    context.cache.transpilers.set(
                        "typescript-transpiler",
                        transpiler
                    );
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push("Typescript-Transpiler", () =>
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
