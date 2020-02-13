import CssTranspiler from "@transpilers/css";
import {
    PackagerContext,
    TransformResult,
    Transformer
} from "@typedefs/packager";
import verifyExtensions from "@shared/verify-extensions";
import { generateExport } from "@shared/style-plugin-helpers";

export default function cssTransformer(context: PackagerContext): Transformer {
    const transformerName = "packager::transformer::css-transformer";
    const isCss = verifyExtensions([".css"]);

    let transpiler: CssTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
            if (isCss(modulePath)) {
                transpiler = context.cache.transpilers.get("css-transpiler");
                if (!transpiler) {
                    transpiler = new CssTranspiler(context);
                    context.cache.transpilers.set("css-transpiler", transpiler);
                }

                const file = context.files.find(f => f.path === modulePath)!;
                await context.transpileQueue.push("Css-Transpiler", () =>
                    transpiler.transpile({ ...file, code })
                );

                const completed = context.transpileQueue.completed.find(
                    c => c.path === modulePath
                );

                if (completed) {
                    return {
                        code: generateExport({ ...file, code: completed.code })
                    };
                }
            }
        }
    };
}
