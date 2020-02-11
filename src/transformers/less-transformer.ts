import LessTranspiler from "../transpilers/less";
import {
    PackagerContext,
    TransformResult,
    Transformer
} from "../types/packager";
import verifyExtensions from "../utils/verify-extensions";
import { generateExport } from "../utils/style-plugin-helpers";
import TransformationException from "../exceptions/TransformationException";

export default function lessTransformer(context: PackagerContext): Transformer {
    const transformerName = "packager::transformer::less-transformer";
    const isLess = verifyExtensions([".less"]);

    let transpiler: LessTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
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

                throw new TransformationException(modulePath, transformerName);
            }
        }
    };
}
