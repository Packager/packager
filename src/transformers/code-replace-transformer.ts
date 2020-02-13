import {
    PackagerContext,
    TransformResult,
    Transformer
} from "@typedefs/packager";
import verifyExtensions from "@shared/verify-extensions";
import replaceCodeWith from "@shared/replace-code-with";

export default function codeReplaceTransformer(
    context: PackagerContext
): Transformer {
    const transformerName = "packager::transformer::code-replace-transformer";
    const isReplaceable = verifyExtensions([".js", ".ts"]);

    return {
        name: transformerName,
        renderChunk(code: string, chunk: any) {
            return null;
        }
    };
}
