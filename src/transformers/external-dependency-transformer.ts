import {
    PackagerContext,
    Transformer,
    TransformResult
} from "../types/packager";

export default function externalDependencyTransformer(
    context: PackagerContext
): Transformer {
    const transformerName = "external-dependency-transformer";

    return {
        name: transformerName,
        transform(code: string, modulePath: string): TransformResult {
            // @ts-ignore
            if (!modulePath.startsWith("/") && window.Babel) {
                if (
                    // @ts-ignore
                    !window.__dependencies ||
                    // @ts-ignore
                    !window.__dependencies[modulePath]
                ) {
                    // @ts-ignore
                    const { code: _code } = window.Babel.transform(code, {
                        plugins: ["transform-commonjs"],
                        compact: false,
                        moduleId: modulePath
                    });

                    code = _code;
                }

                return {
                    code: `${code} export default window.__dependencies['${modulePath}'];`,
                    map: { mappings: "" }
                };
            }
        }
    };
}
