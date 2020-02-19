import SassTranspiler from "packager/transpilers/sass";
import { PackagerContext, Transformer, TransformResult } from "packager/types";
import verifyExtensions from "packager/shared/verify-extensions";
import { generateExport } from "packager/shared/style-plugin-helpers";
import { TransformationException } from "packager/exceptions";

export default function sassTransformer(context: PackagerContext): Transformer {
    const transformerName = "packager::transformer::sass-transformer";
    const isSass = verifyExtensions([".sass", ".scss"]);

    let transpiler: SassTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
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
                        map: completed.map || { mappings: "" }
                    };
                }

                throw new TransformationException(modulePath, transformerName);
            }
        }
    };
}
