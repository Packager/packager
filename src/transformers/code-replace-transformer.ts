import {
    PackagerContext,
    TransformResult,
    Transformer
} from "../types/packager";
import verifyExtensions from "../utils/verify-extensions";
import replaceModuleCodeWith from "../utils/replace-module-code-with";

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
