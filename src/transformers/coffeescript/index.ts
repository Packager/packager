import CoffeescriptTranspiler from "packager/transpilers/coffeescript";
import { PackagerContext, Transformer, TransformResult } from "packager/types";
import verifyExtensions from "packager/shared/verify-extensions";
import { TransformationException } from "packager/exceptions";

export default function coffeescriptTransformer(
    context: PackagerContext
): Transformer {
    const transformerName = "packager::transformer::coffeescript-transformer";
    const isCoffeescript = verifyExtensions([".coffee"]);

    let transpiler: CoffeescriptTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
            if (isCoffeescript(modulePath)) {
                transpiler = context.cache.transpilers.get(
                    "coffeescript-transpiler"
                );
                if (!transpiler) {
                    transpiler = new CoffeescriptTranspiler(context);
                    context.cache.transpilers.set(
                        "coffeescript-transpiler",
                        transpiler
                    );
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push(
                    "Coffeescript-Transpiler",
                    () => transpiler.transpile({ ...file, code })
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
