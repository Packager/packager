import SvelteTranspiler from "@transpilers/svelte";
import {
    PackagerContext,
    Transformer,
    TransformResult
} from "@typedefs/packager";
import verifyExtensions from "@shared/verify-extensions";
import { TransformationException } from "@exceptions";

export default function svelteTransformer(
    context: PackagerContext
): Transformer {
    const transformerName = "packager::transformer::svelte-transformer";
    const isSvelte = verifyExtensions([".svelte"]);

    let transpiler: SvelteTranspiler;

    return {
        name: transformerName,
        async transform(
            code: string,
            modulePath: string
        ): Promise<TransformResult> {
            if (isSvelte(modulePath)) {
                transpiler = context.cache.transpilers.get("svelte-transpiler");
                if (!transpiler) {
                    transpiler = new SvelteTranspiler(context);
                    context.cache.transpilers.set(
                        "svelte-transpiler",
                        transpiler
                    );
                }

                const file = context.files.find(f => f.path === modulePath)!;

                await context.transpileQueue.push("Svelte-Transpiler", () =>
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
