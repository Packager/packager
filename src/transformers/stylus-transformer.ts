import StylusTranspiler from "../transpilers/stylus";
import {
    PackagerContext,
    Transformer,
    TransformResult
} from "../types/packager";
import verifyExtensions from "../utils/verify-extensions";
import { generateExport } from "../utils/style-plugin-helpers";
import TransformationException from "../exceptions/TransformationException";

export default function stylusTransformer(
    context: PackagerContext
): Transformer {
    const transformerName = "packager::transformer::stylus-transformer";
    const isStylus = verifyExtensions([".styl", ".stylus"]);

    let transpiler: StylusTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
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

                throw new TransformationException(modulePath, transformerName);
            }
        }
    };
}
