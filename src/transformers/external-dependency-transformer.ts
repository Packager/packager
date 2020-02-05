import {
    PackagerContext,
    Transformer,
    TransformResult
} from "../types/packager";

export default function externalDependencyTransformer(
    context: PackagerContext
): Transformer {
    return {
        name: "external-dependency-transformer",
        transform(code: string, modulePath: string): TransformResult {
            // @ts-ignore
            if (!modulePath.startsWith("/") && window.Babel) {
                let tempCode = code;

                if (
                    // @ts-ignore
                    !window.__dependencies ||
                    // @ts-ignore
                    !window.__dependencies[modulePath]
                ) {
                    // @ts-ignore
                    const { code: _code } = window.Babel.transform(tempCode, {
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
