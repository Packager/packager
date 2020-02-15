import {
    PackagerContext,
    TransformResult,
    Transformer
} from "packager/types/packager";
import verifyExtensions from "packager/shared/verify-extensions";
import replaceCodeWith from "packager/shared/replace-code-with";

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
